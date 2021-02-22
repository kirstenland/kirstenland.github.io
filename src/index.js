import { Tools } from './controls/tools';
import { ColourPalette } from './controls/colourPalette';
import { Artist } from './artist';

window.onload = function() {
    const canvasHolder = document.querySelector('.canvas-holder');
    const fullCanvas = document.querySelector('.canvas.full');
    const tempCanvas = document.querySelector('.canvas.temp');
    const artist = new Artist(fullCanvas, tempCanvas);

    canvasHolder.addEventListener('mousemove', function(e) {
        const [x, y] = relativeCoords(e.clientX, e.clientY);
        artist.move(x, y);
    });
    
    canvasHolder.addEventListener('mousedown', function(e) {
        const [x, y] = relativeCoords(e.clientX, e.clientY);
        artist.start(x, y);
    });
    
    canvasHolder.addEventListener('mouseup', function() {
        artist.end();
    });
    
    canvasHolder.addEventListener('touchstart', function(e) {
        const [x, y] = relativeCoords(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        artist.start(x, y);
    });
    
    canvasHolder.addEventListener('touchend', function() {
        artist.end();
    });
    
    canvasHolder.addEventListener('touchmove', function(e) {
        const [x, y] = relativeCoords(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        e.preventDefault();
        artist.move(x, y);
    });

    canvasHolder.addEventListener('click', function(e) {
        const [x, y] = relativeCoords(e.clientX, e.clientY);
        e.preventDefault();
        artist.click(x, y);
    });

    const colourPalette = new ColourPalette(artist);
    const tools = new Tools(artist);

    [fullCanvas, tempCanvas].forEach(canvas => {
        canvas.setAttribute('height', canvasHolder.clientHeight - 4);
        canvas.setAttribute('width', canvasHolder.clientWidth - 4);
    });

    document.getElementById('save-drawing').onclick = () => {
        artist.save();
        document.location.replace('./gallery.html')
    }

    function relativeCoords(x, y) {
        return [x - canvasHolder.offsetLeft, y - canvasHolder.offsetTop]
    }
}