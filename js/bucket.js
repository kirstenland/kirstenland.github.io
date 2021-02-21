class Bucket {
  constructor(fullCanvas, tempCanvas, colour) {
    this.fullCanvas = fullCanvas;
  }

  click(startX, startY) {
    this.colorLayer = this.fullCanvas.getImageData();
    const canvasWidth = this.fullCanvas.width();
    const canvasHeight = this.fullCanvas.height();
    let pixelStack = [[startX, startY]];
    
    this.startR = this.colorLayer.data[(startY*canvasWidth + startX) * 4];
    this.startG = this.colorLayer.data[(startY*canvasWidth + startX) * 4 + 1];
    this.startB = this.colorLayer.data[(startY*canvasWidth + startX) * 4 + 2];

    this.fillColorR = 100;
    this.fillColorG = 0;
    this.fillColorB  = 0;

    while(pixelStack.length)
    {
      let [x,  y] = pixelStack.pop();
      let pixelPos = (y*canvasWidth + x) * 4;
      while(y-- >= 0 && this.matchStartColor(pixelPos)) {
        pixelPos -= canvasWidth * 4;
      }
      pixelPos += canvasWidth * 4;
      ++y;
      let reachLeft = false;
      let reachRight = false;
      while(y++ < canvasHeight-1 && this.matchStartColor(pixelPos)) {
        this.colorPixel(pixelPos);

        if(x > 0)
        {
          if(this.matchStartColor(pixelPos - 4))
          {
            if(!reachLeft){
              pixelStack.push([x - 1, y]);
              reachLeft = true;
            }
          }
          else if(reachLeft)
          {
            reachLeft = false;
          }
        }
      
        if(x < canvasWidth-1)
        {
          if(this.matchStartColor(pixelPos + 4))
          {
            if(!reachRight)
            {
              pixelStack.push([x + 1, y]);
              reachRight = true;
            }
          }
          else if(reachRight)
          {
            reachRight = false;
          }
        }
          
        pixelPos += canvasWidth * 4;
      }
    }
    this.fullCanvas.putImageData(this.colorLayer);
  }

  matchStartColor(pixelPos) {
    const r = this.colorLayer.data[pixelPos];	
    const g = this.colorLayer.data[pixelPos+1];	
    const b = this.colorLayer.data[pixelPos+2];

    return (r == this.startR && g == this.startG && b == this.startB);
  }

  colorPixel(pixelPos) {
    this.colorLayer.data[pixelPos] = this.fillColorR;
    this.colorLayer.data[pixelPos+1] = this.fillColorB;
    this.colorLayer.data[pixelPos+2] = this.fillColorG;
    this.colorLayer.data[pixelPos+3] = 255;
  }
}

