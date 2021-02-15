function loadColours(pen) {
    const colours = ["#000000", "#ff0000", "#00ff00", "#0000ff"];
    const colourPalette = document.querySelector('.colour-palette');
    colours.forEach((colour) => {
        const circle = document.createElement('span');
        circle.classList.add("dot");
        circle.style.backgroundColor = colour;

        circle.addEventListener('click', () => {
            pen.setColour(colour)
            circle.classList.add("selected");
        });
        colourPalette.appendChild(circle);
    });
}

window.onload = function() {
    const canvasHolder = document.querySelector('.canvas-holder');
    const fullCanvas = document.querySelector('.canvas.full');
    const tempCanvas = document.querySelector('.canvas.temp');
    const pen = new Pen(fullCanvas, tempCanvas);

    canvasHolder.addEventListener('mousemove', function(e) {
        const [x, y] = relativeCoords(e.clientX, e.clientY);
        pen.draw(x, y);
    });
    
    canvasHolder.addEventListener('mousedown', function(e) {
        const [x, y] = relativeCoords(e.clientX, e.clientY);
        pen.penDown(x, y);
    });
    
    canvasHolder.addEventListener('mouseup', function() {
        pen.penUp();
    });
    
    canvasHolder.addEventListener('touchstart', function(e) {
        const [x, y] = relativeCoords(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        pen.penDown(x, y);
    });
    
    canvasHolder.addEventListener('touchend', function() {
        pen.penUp();
    });
    
    canvasHolder.addEventListener('touchmove', function(e) {
        const [x, y] = relativeCoords(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        e.preventDefault();
        pen.draw(x, y);
    });

    colourPalette = new ColourPalette(pen);

    [fullCanvas, tempCanvas].forEach(canvas => {
        canvas.setAttribute('height', canvasHolder.clientHeight - 4);
        canvas.setAttribute('width', canvasHolder.clientWidth - 4);
    });

    document.getElementById('save-drawing').onclick = () => {
        pen.save();
        document.location.replace('./gallery.html')
    }

    function relativeCoords(x, y) {
        return [x - canvasHolder.offsetLeft, y - canvasHolder.offsetTop]
    }
}