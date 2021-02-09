const canvas = document.querySelector('.canvas');
canvas.setAttribute('height', canvas.offsetHeight);
canvas.setAttribute('width', canvas.offsetWidth);
const ctx = canvas.getContext('2d');

var pen = {
  radius: 25,
  down: false,
  x: 0,
  y: 0,
  penDown: function(x, y) {
      this.down = true;
      this.x = x;
      this.y = y;
  },
  penUp: function() {
      this.down = false;
  },
  draw: function(newX, newY) {
      if (this.down) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(newX, newY);
        ctx.stroke();
        ctx.closePath();
        this.x = newX;
        this.y = newY;
      }
  }
};

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