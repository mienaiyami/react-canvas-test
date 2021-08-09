import { useState, useEffect, useRef } from "react";
import CanvasMain from "./components/CanvasMain";
import ToolBar from "./components/ToolBar";
function App() {
    const [pen, changePen] = useState({
        toolName: "pen",
        color: "#000000",
        width: 10,
        opacity: 50,
        colorTotal: "#00000080",
    });
    const [rectangle, changeRectangle] = useState({
        toolName: "rectangle",
        color: "#000000",
        opacity: 50,
        colorTotal: "#00000080",
    });
    const toolList = [pen, rectangle];
    const [currentTool, toolChanger] = useState(0);
    const [canvasDimensions, canvasDimensionsUpdater] = useState({
        width: window.innerWidth - 70 || 10,
        height: window.innerHeight - 10 || 10,
    });
    useEffect(() => {
        console.log("dddd", ddd);
    }, [canvasDimensions]);
    // window.onresize = () => {
    //     canvasDimensionsUpdater({
    //         width: window.innerWidth - 70 || 10,
    //         height: window.innerHeight - 10 || 10,
    //     });
    // };
    const copyImgToClipboard = () => {};
    const ddd = useRef(null);
    return (
        <>
            <CanvasMain
                ref={ddd}
                id="canvasMain"
                currentTool={toolList[currentTool]}
                dimensions={canvasDimensions}
                canvasDimensionsUpdater={canvasDimensionsUpdater}
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
                }}
            ></ToolBar>
        </>
    );
}

export default App;
