export class Eraser {
    constructor(canvas) {
        this.canvas = canvas;
        this.down = false;
    }
    start(x, y) {
        this.down = true;
        this.canvas.setColour("rgba(255, 255, 255, 255)");
        this.drawCircle(x, y);
    }
    end() {
        this.down = false;
    }
    move(x, y) {
        if (this.down) {
            this.drawCircle(x, y);
        }
    }
    drawCircle(x, y) {
        this.canvas.drawCircle([x, y], 2);
    }
}