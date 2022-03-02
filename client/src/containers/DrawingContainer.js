import * as React from "react";
import { Tldraw } from "@tldraw/tldraw";
import '../components/draw.css'

const DrawingContainer = () => {

    return (
        <div className="DrawingApp">
            <div>
            <Tldraw className="canvas"/>
            </div>
            
        </div>
    )
}

export default DrawingContainer;