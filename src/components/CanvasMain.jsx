import { useState, useEffect, useRef } from "react";
import CanvasImage from "./canvas/CanvasImage.js";
export default function CanvasMain({
    id,
    dimensions,
    currentTool,
    canvasDimensionsUpdater,
}) {
    const [mouse, updateMouse] = useState({
        x: null,
        y: null,
        prevX: null,
        prevY: null,
        initX: null,
        initY: null,
        dragging: false,
    });
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = dimensions.width; //|| window.innerWidth - 200;
        canvas.height = dimensions.height; //|| window.innerHeight - 200;
    }, [dimensions]);
    document.onpaste = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e.clipboardData.getData("image/jpg, image/jpeg"));
        const item = e.clipboardData.items[0];
        if (item.type.indexOf("image") === 0) {
            let blob = item.getAsFile();
            let reader = new FileReader();
            reader.onload = (e) => {
                const img1 = new CanvasImage(
                    canvasRef.current.getContext("2d"),
                    e.target.result
                );
                canvasDimensionsUpdater({
                    width: img1.displayWidth,
                    height: img1.displayHeight,
                });
                setTimeout(() => {
                    console.log("ff");
                    img1.draw();
                }, 500);
            };
            reader.readAsDataURL(blob);
        }
    };

    const draw = (context, mouse) => {
        context.save();
        context.lineCap = "round";
        context.lineJoin = "round";
        if (currentTool.toolName === "pen") {
            context.beginPath();
            if (mouse.prevX === mouse.x && mouse.prevY === mouse.y) {
                context.fillStyle = currentTool.colorTotal;
                context.arc(
                    mouse.x,
                    mouse.y,
                    currentTool.width / 2,
                    0,
                    Math.PI * 2,
                    false
                );
                context.closePath();
                context.fill();
                context.restore();
                return;
            }
            context.strokeStyle = currentTool.colorTotal;
            context.lineWidth = currentTool.width;
            context.moveTo(mouse.prevX, mouse.prevY);
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
            context.closePath();
        }
        context.restore();
    };
    const dragStart = (e) => {
        mouse.prevX = e.nativeEvent.offsetX;
        mouse.prevY = e.nativeEvent.offsetY;
        mouse.x = mouse.prevX;
        mouse.y = mouse.prevY;
        mouse.initX = mouse.prevX;
        mouse.initY = mouse.prevY;
        mouse.dragging = true;
        updateMouse({ ...mouse });
        draw(canvasRef.current.getContext("2d"), mouse);
    };
    const dragEnd = (e) => {
        mouse.dragging = false;
        updateMouse({ ...mouse });
    };
    const mouseMove = (e) => {
        if (mouse.dragging) {
            mouse.x = e.nativeEvent.offsetX;
            mouse.y = e.nativeEvent.offsetY;
            draw(canvasRef.current.getContext("2d"), mouse);
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;
            updateMouse({ ...mouse });
        }
    };
    const mouseOut = (e) => {
        mouse.dragging = false;
        updateMouse({ ...mouse });
    };
    return (
        <div className="canvas-cont">
            {/* <div className="info">
                <p>
                    x: {mouse.x}, y: {mouse.y}, dragging:
                    {mouse.dragging.toString()}
                </p>
            </div> */}
            <canvas
                id={id}
                ref={canvasRef}
                onMouseDown={dragStart}
                onMouseUp={dragEnd}
                onMouseMove={mouseMove}
                onMouseOut={mouseOut}
            ></canvas>
        </div>
    );
}
