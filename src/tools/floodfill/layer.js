import { Colour } from './colour';

export class Layer {
    constructor(canvas) {
        this.width = canvas.width();
        this.height = canvas.height();
        this.layer = canvas.getImageData();
        this.data = this.layer.data;
    }

    getColourAt(x, y) {
        const pixelPos = 4 * (x + y*this.width);
        return new Colour(this.data[pixelPos], this.data[pixelPos + 1], this.data[pixelPos + 2], this.data[pixelPos + 3]);
    }

    colorPixel(x, y, fillColour) {
        const pixelPos = 4 * (x + y*this.width);
        this.data[pixelPos] = fillColour.r;
        this.data[pixelPos + 1] = fillColour.g;
        this.data[pixelPos + 2] = fillColour.b;
        this.data[pixelPos + 3] = fillColour.a;
    };
}