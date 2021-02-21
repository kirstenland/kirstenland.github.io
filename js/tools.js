class Tools {
    startingTool = "pen"

    constructor(artist) {
        this.toolSelectors = {};
        this.artist = artist;
        this.tools = document.querySelector('.tools');
        this.createTool("pen");
        this.createTool("bucket");
        this.setTool(this.startingTool);
    }

    createTool(name) {
        const item = document.createElement('div');
        item.innerHTML = name;
        item.addEventListener('click', () => this.setTool(name));
        this.tools.appendChild(item);
        this.toolSelectors[name] = item;
    }

    setTool(name) {
        console.log("Selecting tool...", name);
        this.artist.setTool(name);
        Object.values(this.toolSelectors).forEach(item => item.classList.remove("selected"))
        this.toolSelectors[name].classList.add("selected");
    }
}

function createTool(toolName, fullCanvas, tempCanvas, color) {
    switch (toolName) {
        case "pen":
            return new Pen(fullCanvas, tempCanvas, color);
        case "bucket":
            return new Bucket(fullCanvas, tempCanvas, color);
    }
}