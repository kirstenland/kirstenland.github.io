import { Canvas } from './canvas';
import { createTool } from './controls/tools';

export class Artist {
    constructor(fullCanvas, tempCanvas) {
        this.fullCanvas = new Canvas(fullCanvas);
        this.tempCanvas = new Canvas(tempCanvas);
    }
    start(x, y) {
        if (this.tool.start) {
            this.tool.start(x, y);
        }
    }
    end() {
        if (this.tool.end) {
            this.tool.end();
        }
    }
    move(newX, newY) {
        if (this.tool.move) {
            this.tool.move(newX, newY);
        }
    }
    setColour(colour) {
        this.colour = colour;
        if (this.tool && this.tool.setColour) {
            this.tool.setColour(colour);
        }
    }
    setTool(toolName) {
        this.tool = createTool(toolName, this.fullCanvas, this.tempCanvas, this.colour);
    }
    click(x, y) {
        if (this.tool.click) {
            this.tool.click(x, y);
        }
    }
    save() {
        localStorage.setItem('lastImage', this.fullCanvas.getDataUrl());
    }
    clear() {
        this.fullCanvas.clear();
        this.tempCanvas.clear();
    }
}