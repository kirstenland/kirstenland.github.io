export class Colour {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a
    }

    matches(otherColour) {
        return this.r == otherColour.r && this.g == otherColour.g && this.b == otherColour.b && this.a == otherColour.a;
    }
}