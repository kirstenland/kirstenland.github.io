export class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    drawLine([x, y], [newX, newY]) {
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(newX, newY);
        this.context.stroke();
        this.context.closePath();
    }

    drawLines(points) {
        const n = points.length;
        for(let i = 0; i < n - 1; i++){
            this.drawLine(points[i], points[i + 1])
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setStrokeWidth(width) {
        this.context.lineWidth = width;
    }

    setColour(colour) {
        this.context.strokeStyle = colour;
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