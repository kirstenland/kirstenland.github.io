export class Pen {
    constructor(fullCanvas, tempCanvas, colour) {
        this.fullCanvas = fullCanvas;
        this.tempCanvas = tempCanvas;
        this.down = false;
        if (colour) {
            this.setColour(colour);
        }
    }
    start(x, y) {
        this.down = true;
        this.x = x;
        this.y = y;
        this.points = [x, y];
    }
    end() {
        this.down = false;
        this.tempCanvas.clear();
        this.fullCanvas.setStrokeWidth(2);
        this.fullCanvas.drawSpline(this.points, 0.2);
    }
    move(newX, newY) {
        if (this.down) {
            this.tempCanvas.drawLine([this.x, this.y], [newX, newY]);
            this.x = newX;
            this.y = newY;
            this.points = this.points.concat(newX, newY)
        }
    }
    setColour(colour) {
        this.fullCanvas.setColour(colour);
        this.tempCanvas.setColour(colour);
    }
}