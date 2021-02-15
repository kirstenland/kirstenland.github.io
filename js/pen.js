class Pen {
    constructor(fullCanvas, tempCanvas) {
        this.fullCanvas = new Canvas(fullCanvas);
        this.tempCanvas = new Canvas(tempCanvas);
        this.down = false;
        this.x = 0;
        this.y = 0;
    }
    penDown(x, y) {
        this.down = true;
        this.x = x;
        this.y = y;
        this.points = [x, y]
    }
    penUp() {
        this.down = false;
        this.tempCanvas.clear();
        this.fullCanvas.setStrokeWidth(2);
        this.fullCanvas.drawSpline(this.points, 0.2);
    }
    draw(newX, newY) {
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
    save() {
        localStorage.setItem('lastImage', this.fullCanvas.getDataUrl());
    }
    clear() {
        this.fullCanvas.clear();
        this.tempCanvas.clear();
    }
}