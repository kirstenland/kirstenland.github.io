export class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    startLine([x, y]) {
        this.context.beginPath();
        this.context.moveTo(x, y);
    }

    endLine() {
        this.context.closePath();
    }

    midLine([x, y]) {
        this.context.lineTo(x, y);
        this.context.stroke();
    }

    drawCircle([x, y], r) {
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI);
        this.context.fill();
    }

    clear() {
        this.context.save();
        this.setColour("#FFFFFF");
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
    }

    setStrokeWidth(width) {
        this.context.lineWidth = width;
    }

    setColour(colour) {
        this.context.strokeStyle = colour;
        this.context.fillStyle = colour;
    }

    getDataUrl() {
        return this.canvas.toDataURL("image/png");
    }

    width() {
        return this.canvas.width;
    }

    height() {
        return this.canvas.height;
    }
    
    getImageData() {
        return this.context.getImageData(0, 0, this.width(), this.height());
    }

    putImageData(data) {
        return this.context.putImageData(data, 0, 0);
    }
}