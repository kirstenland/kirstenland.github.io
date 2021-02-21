class Artist {
  constructor(fullCanvas, tempCanvas) {
      this.fullCanvas = new Canvas(fullCanvas);
      this.tempCanvas = new Canvas(tempCanvas);
      this.tool = new Bucket(this.fullCanvas, this.tempCanvas)
  }
  start(x, y) {
      if (this.tool.start) {
        this.tool.start(x,  y);
      }
  }
  end() {
    if (this.tool.end) {
        this.tool.end();
    }
  }
  move(newX, newY) {
      if (this.tool.move) {
          this.tool.move(newX, newY);
      }
  }
  setColour(colour) {
      if (this.tool.setColour) {
        this.colour = colour;
        this.tool.setColour(colour);
      }
  }
  click(x, y) {
    this.tool.click(x,  y);
  }
  save() {
      localStorage.setItem('lastImage', this.fullCanvas.getDataUrl());
  }
  clear() {
      this.fullCanvas.clear();
      this.tempCanvas.clear();
  }
}