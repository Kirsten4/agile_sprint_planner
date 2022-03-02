import * as React from "react";
import { Tldraw } from "@tldraw/tldraw";
import '../components/drawing.css'

const DrawingContainer = () => {

    return (
        <div className="DrawingApp">
            <Tldraw className="canvas"/>
        </div>
    )
}

export default DrawingContainer;