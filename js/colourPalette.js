class ColourPalette {
    colours = [
        "#000000", "#ff0000", "#00ff00", "#0000ff", "#ff9900", "#009933", "#9900cc",
        "#66ccff", "#996633", "#ff33cc", "#ffff00", "#cc99ff"
    ];
    startingColour = "#000000"

    constructor(pen) {
        this.colourSelectors = {};
        this.pen = pen;
        this.colourPalette = document.querySelector('.colour-palette');
        this.colours.forEach(colour => this.createColour(colour));
        this.setColour(this.startingColour);
    }

    createColour(colour) {
        const circle = document.createElement('span');
        circle.classList.add("dot");
        circle.style.backgroundColor = colour;
        circle.addEventListener('click', () => this.setColour(colour));
        this.colourPalette.appendChild(circle);
        this.colourSelectors[colour] = circle;
    }

    setColour(colour) {
        this.pen.setColour(colour);
        Object.values(this.colourSelectors).forEach(circle => circle.classList.remove("selected"))
        this.colourSelectors[colour].classList.add("selected");
    }
}