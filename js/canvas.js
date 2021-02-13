const canvas = document.querySelector('.canvas');
canvas.setAttribute('height', canvas.clientHeight);
canvas.setAttribute('width', canvas.clientWidth);
const ctx = canvas.getContext('2d');
const pen = new Pen(ctx);

canvas.addEventListener('mousemove', function(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    pen.draw(x, y);
});

canvas.addEventListener('mousedown', function(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    pen.penDown(x, y);
});

canvas.addEventListener('mouseup', function() {
    pen.penUp();
});

canvas.addEventListener('touchstart', function() {
    pen.penDown();
});

canvas.addEventListener('touchend', function() {
    pen.penUp();
});

canvas.addEventListener('touchmove', function(e) {
    const x = e.changedTouches[0].clientX - canvas.offsetLeft;
    const y = e.changedTouches[0].clientY - canvas.offsetTop;
    pen.draw(x, y);
});