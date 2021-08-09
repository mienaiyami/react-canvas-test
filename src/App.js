import { useState, useEffect, useRef } from "react";
import CanvasMain from "./components/CanvasMain";
import ToolBar from "./components/ToolBar";
function App() {
    const [pen, changePen] = useState({
        toolName: "pen",
        color: "#000000",
        width: 10,
        opacity: 100,
        colorTotal: "#000000FF",
    });
    const canvasRef = useRef(null);
    const [rectangle, rectangleUpdater] = useState({
        toolName: "rectangle",
        color: "#000000",
        opacity: 50,
        colorTotal: "#00000080",
    });
    const [eraser, eraserUpdater] = useState({
        toolName: "eraser",
        radius: pen.width,
    });
    const toolList = [pen, rectangle, eraser];
    const [currentTool, toolChanger] = useState(0);
    const [canvasDimensions, canvasDimensionsUpdater] = useState({
        width: window.innerWidth - 70 || 10,
        height: window.innerHeight - 10 || 10,
    });
    useEffect(() => {
        eraserUpdater({
            toolName: "eraser",
            radius: pen.width,
        });
    }, [pen]);
    // window.onresize = () => {
    //     canvasDimensionsUpdater({
    //         width: window.innerWidth - 70 || 10,
    //         height: window.innerHeight - 10 || 10,
    //     });
    // };
    const copyImgToClipboard = (e) => {
        console.log(e);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const imgData = canvas.toDataURL("image/png");
        // const data = [
        //     new ClipboardItem({
        //         "text/plain": new Blob(["Text data"], { type: "text/plain" }),
        //     }),
        // ];
        // navigator.clipboard.write(data).then(
        //     () => {
        //         console.log("wrote");
        //     },
        //     () => {
        //         console.log("err");
        //     }
        // );
        console.log(imgData);
    };
    return (
        <>
            <CanvasMain
                ref={canvasRef}
                id="canvasMain"
                currentTool={toolList[currentTool]}
                dimensions={canvasDimensions}
                canvasDimensionsUpdater={canvasDimensionsUpdater}
                copyImgToClipboard={copyImgToClipboard}
            />
            <ToolBar
                // changecurrentTool={changecurrentTool}
                pen={pen}
                changePen={changePen}
                copyImgToClipboard={copyImgToClipboard}
                changeTool={(e) => {
                    console.log(e);
                    if (e === "pen") {
                        toolChanger(0);
                        // console.log(toolList[0]);
                        // changecurrentToolChanger(0);
                    }
                    if (e === "rectangle") {
                        toolChanger(1);
                        // toolChanger(toolList[1]);
                        // changecurrentToolChanger(1);
                    }
                    if (e === "eraser") {
                        toolChanger(2);
                    }
                }}
            ></ToolBar>
        </>
    );
}

export default App;
