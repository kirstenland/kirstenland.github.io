import { Canvas } from './canvas';
import { createTool } from './controls/tools';

export class Artist {
    constructor(canvas) {
        this.canvas = new Canvas(canvas);
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
    setStrokeSize(strokeSize) {
        this.strokeSize = strokeSize;
        if (this.tool && this.tool.setStrokeSize) {
            this.tool.setStrokeSize(strokeSize);
        }
    }
    setTool(toolName) {
        this.tool = createTool(toolName, this.canvas, this.colour, this.strokeSize);
    }
    click(x, y) {
        if (this.tool.click) {
            this.tool.click(x, y);
        }
    }
    save() {
        localStorage.setItem('lastImage', this.canvas.getDataUrl());
    }
    clear() {
        this.canvas.clear();
    }
}