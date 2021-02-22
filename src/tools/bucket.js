import { floodfill } from "./floodfill/floodfill";
import { Colour } from "./floodfill/colour";
import { Layer } from "./floodfill/layer";

export class Bucket {
    constructor(fullCanvas, tempCanvas, colour) {
        this.fullCanvas = fullCanvas;
        this.setColour(colour);
    }
  
    click(startX, startY) {
        const layer = new Layer(this.fullCanvas);
        console.log("Are you ready?");
        const newLayer = floodfill(layer, startX, startY, this.colour);
        console.log("EXCITING");
        console.log(newLayer);
        this.fullCanvas.putImageData(newLayer);
    }

    setColour(colour) {
        const [r, g, b] = hexToRGB(colour);
        this.colour = new Colour(r, g, b, 255);
    }
}

function hexToRGB(h) {
    const r = "0x" + h[1] + h[2];
    const g = "0x" + h[3] + h[4];
    const b = "0x" + h[5] + h[6];
    return [+r, +g, +b];
}
