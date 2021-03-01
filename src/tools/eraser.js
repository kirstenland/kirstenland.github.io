export class Eraser {
    constructor(canvas, _, strokeSize) {
        this.canvas = canvas;
        this.down = false;
        if (strokeSize) {
            this.setStrokeSize(strokeSize);
        }
    }
    start(x, y) {
        this.down = true;
        this.canvas.setColour("rgba(255, 255, 255, 255)");
        this.drawCircle(x, y);
        this.x = x;
        this.y = y;
    }
    end() {
        this.down = false;
    }
    move(x, y) {
        if (this.down) {
            const pointsBetween = 1 + (x + y) / this.radius;
            const changeX = x - this.x;
            const changeY = y - this.y;
            for(let i = 1; i <= pointsBetween; i++) {
                const inBetweenX = this.x + i * changeX / pointsBetween;
                const inBetweenY = this.y + i * changeY / pointsBetween;
                this.drawCircle(inBetweenX, inBetweenY);
            }
            this.x = x;
            this.y = y;
        }
    }
    drawCircle(x, y) {
        this.canvas.drawCircle([x, y], this.radius);
    }
    setStrokeSize(size) {
        this.radius = size;
    }
}