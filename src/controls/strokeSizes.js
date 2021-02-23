const sizes = [1, 2, 5, 10];
const startSize = 2;

export class StrokeSizes {
    constructor(artist) {
        this.sizeSelectors = {};
        this.artist = artist;
        this.strokeSizes = document.querySelector('.stroke-sizes');
        sizes.forEach(size => this.createSize(size));
        this.setSize(startSize);
    }

    createSize(size) {
        const circle = document.createElement('span');
        circle.classList.add("outer-stroke-size-dot");
        circle.classList.add("selectable");
        circle.classList.add("dot");

        const innerCircle = document.createElement('span');
        innerCircle.classList.add("dot");
        innerCircle.style.width = size+"px";
        innerCircle.style.height = size+"px";
        innerCircle.style.backgroundColor = "black";

        circle.innerHTML = innerCircle.outerHTML;
        circle.addEventListener('click', () => this.setSize(size));
        this.strokeSizes.appendChild(circle);
        this.sizeSelectors[size] = circle;
    }

    setSize(size) {
        this.artist.setStrokeSize(size);
        Object.values(this.sizeSelectors).forEach(circle => circle.classList.remove("selected"))
        this.sizeSelectors[size].classList.add("selected");
    }
}