import { Pen } from '../tools/pen';
import { Bucket } from '../tools/bucket';
import { Eraser } from '../tools/eraser';

const startingTool = "pen"

const settingsRequired = {
    pen: ["colour-palette", "stroke-sizes"],
    eraser: ["stroke-sizes"],
    bucket: ["colour-palette"],
};

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
        item.classList.add("selectable");
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

        const settings = document.getElementsByClassName('setting');
        for (const item of settings) {
            if (settingsRequired[name].indexOf(item.id) >= 0) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    }
}

export function createTool(toolName, ...args) {
    switch (toolName) {
        case "pen":
            return new Pen(...args);
        case "bucket":
            return new Bucket(...args);
        case "eraser":
            return new Eraser(...args);
    }
}