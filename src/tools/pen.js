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
        this.x = x;
        this.y = y;
        this.canvas.setStrokeWidth(2);
    }
    end() {
        this.down = false;
    }
    move(newX, newY) {
        if (this.down) {
            this.canvas.drawLine([this.x, this.y], [newX, newY]);
            this.x = newX;
            this.y = newY;
        }
    }
    setColour(colour) {
        this.canvas.setColour(colour);
    }
}