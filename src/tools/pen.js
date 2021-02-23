export class Pen {
    constructor(canvas, colour) {
        this.canvas = canvas;
        this.down = false;
        if (colour) {
            this.setColour(colour);
        }
    }
    start(x, y) {
        this.down = true;
        this.canvas.startLine([x, y]);
    }
    end() {
        this.down = false;
        this.canvas.endLine();
    }
    move(x, y) {
        if (this.down) {
            this.canvas.midLine([x, y]);
        }
    }
    setColour(colour) {
        this.canvas.setColour(colour);
    }
    setStrokeSize(size) {
        this.canvas.setStrokeWidth(size);
    }
}