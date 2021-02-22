import { Pen } from '../tools/pen';
import { Bucket } from '../tools/bucket';
import { Eraser } from '../tools/eraser';

const startingTool = "pen"

export class Tools {
    constructor(artist) {
        this.toolSelectors = {};
        this.artist = artist;
        this.tools = document.querySelector('.tools');
        this.createTool("pen");
        this.createTool("bucket");
        this.createTool("eraser");
        this.setTool(startingTool);
    }

    createTool(name) {
        const item = document.createElement('span');
        item.classList.add("dot");
        item.style.backgroundImage = `url('resources/${name}.png')`;
        item.addEventListener('click', () => this.setTool(name));
        this.tools.appendChild(item);
        this.toolSelectors[name] = item;
    }

    setTool(name) {
        this.artist.setTool(name);
        Object.values(this.toolSelectors).forEach(item => item.classList.remove("selected"))
        this.toolSelectors[name].classList.add("selected");
    }
}

export function createTool(toolName, canvas, color) {
    switch (toolName) {
        case "pen":
            return new Pen(canvas, color);
        case "bucket":
            return new Bucket(canvas, color);
        case "eraser":
            return new Eraser(canvas, color);
    }
}