import { BsPen } from "react-icons/bs";
import { BiRectangle, BiEraser, BiCopy } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";

export default function ToolBar({
    changePen,
    pen,
    changeTool,
    copyImgToClipboard,
}) {
    const [currentMenu, currentMenuUpdate] = useState(null);
    const optionsRef = useRef(null);
    const refPenOptBtn = useRef(null);
    const refPenOptWidth = useRef(null);
    const refPenOptColor = useRef(null);
    const refPenOptOpacity = useRef(null);
    useEffect(() => {}, []);
    useEffect(() => {
        if (currentMenu === null) {
            optionsRef.current.style.visibility = "hidden";
            return;
        }
        optionsRef.current.style.visibility = "visible";
    }, [currentMenu]);
    console.log(pen);
    const penMenu =
        pen.toolName === "pen" ? (
            <div className="cont">
                <h1 className="title">Pen</h1>
                <div className="divider"></div>
                <div className="opts">
                    <label htmlFor="penWidthInput">
                        Thickness:
                        <input
                            type="number"
                            name="penWidthInput"
                            id="penWidthInput"
                            min="0"
                            defaultValue={pen.width}
                            ref={refPenOptWidth}
                            onChange={(e) => {
                                pen.width = parseInt(e.target.value);
                                changePen({ ...pen });
                                // changecurrentTool({ ...currentTool });
                            }}
                        />
                    </label>
                    <label htmlFor="penColorInput">
                        Color:
                        <input
                            type="color"
                            name="penColorInput"
                            id="penColorInput"
                            ref={refPenOptColor}
                            defaultValue={pen.color}
                            onChange={(e) => {
                                pen.color = e.target.value;
                                pen.colorTotal =
                                    pen.color +
                                    Math.ceil(pen.opacity * 2.55).toString(16);

                                changePen({ ...pen });
                            }}
                        />
                    </label>
                    <label htmlFor="penOpacityInput">
                        Opacity:
                        <input
                            type="number"
                            name="penOpacityInput"
                            id="penOpacityInput"
                            min="0"
                            max="100"
                            defaultValue={pen.opacity}
                            ref={refPenOptOpacity}
                            onChange={(e) => {
                                pen.opacity = parseInt(e.target.value);

                                pen.colorTotal =
                                    pen.color +
                                    Math.ceil(pen.opacity * 2.55).toString(16);
                                changePen({ ...pen });
                                console.log(pen.colorTotal);
                            }}
                        />
                    </label>
                </div>
            </div>
        ) : (
            ""
        );

    const selectTool = (e, name) => {
        changeTool(name);
        const parent = e.currentTarget.parentNode;
        const children = [...parent.children];
        children.forEach((i) => {
            if (i === e.currentTarget) {
                i.setAttribute("data-current-tool", "true");
                return;
            }
            i.setAttribute("data-current-tool", "false");
        });
    };
    const openMenu = (e) => {
        let menu = e.currentTarget.getAttribute("data-menu");
        const parent = e.currentTarget.parentNode;
        const children = [...parent.children];
        children.forEach((i) => {
            if (i === e.currentTarget) {
                if (e.currentTarget.getAttribute("data-state") === "open") {
                    i.setAttribute("data-state", "closed");
                    menu = null;
                    return;
                }
                i.setAttribute("data-state", "open");
                return;
            }
            i.setAttribute("data-state", "closed");
        });
        switch (menu) {
            case null:
                currentMenuUpdate(null);
                break;
            case "penMenu":
                currentMenuUpdate(penMenu);
                break;
            default:
                break;
        }
    };
    return (
        <div id="toolbar">
            <div className="toolset">
                <button
                    data-title="Pen"
                    data-state="closed"
                    data-current-tool="true"
                    data-menu="penMenu"
                    onClick={(event) => selectTool(event, "pen")}
                    onDoubleClick={openMenu}
                    ref={refPenOptBtn}
                >
                    <BsPen />
                </button>
                <button
                    data-title="Copy(unavailable)"
                    data-state="closed"
                    data-current-tool="false"
                    onClick={copyImgToClipboard}
                >
                    <BiCopy />
                </button>
                <button
                    data-title="Rectangle(unavailable)"
                    data-current-tool="false"
                    onClick={(event) => selectTool(event, "rectangle")}
                    data-state="closed"
                >
                    <BiRectangle />
                </button>
                <button
                    data-title="Eraser"
                    data-current-tool="false"
                    onClick={(event) => selectTool(event, "eraser")}
                    data-state="closed"
                >
                    <BiEraser />
                </button>
            </div>
            <div className="ctrlOptions" ref={optionsRef}>
                {currentMenu}
            </div>
        </div>
    );
}
