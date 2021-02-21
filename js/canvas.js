class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    drawLine([x, y], [newX, newY]) {
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(newX, newY);
        this.context.stroke();
        this.context.closePath();
    }

    drawSpline(pts, t) {
        var cp = [];
        var n = pts.length;
        for(var i=0;i<n-4;i+=2){
            cp=cp.concat(this.getControlPoints(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));
        }
        for(var i=2;i<pts.length-5;i+=2){
            this.context.beginPath();
            this.context.moveTo(pts[i],pts[i+1]);
            this.context.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3]);
            this.context.stroke();
            this.context.closePath();
        }
        this.context.beginPath();
        this.context.moveTo(pts[0],pts[1]);
        this.context.quadraticCurveTo(cp[0],cp[1],pts[2],pts[3]);
        this.context.stroke();
        this.context.closePath();
        
        this.context.beginPath();
        this.context.moveTo(pts[n-2],pts[n-1]);
        this.context.quadraticCurveTo(cp[2*n-10],cp[2*n-9],pts[n-4],pts[n-3]);
        this.context.stroke();
        this.context.closePath();
    }

    getControlPoints(x0,y0,x1,y1,x2,y2,t){
        const d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
        const d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
       
        const fa=t*d01/(d01+d12);
        const fb=t-fa;
      
        const p1x=x1+fa*(x0-x2);
        const p1y=y1+fa*(y0-y2);
    
        const p2x=x1-fb*(x0-x2);
        const p2y=y1-fb*(y0-y2);  
        
        return [p1x,p1y,p2x,p2y];
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setStrokeWidth(width) {
        this.context.lineWidth = width;
    }

    setColour(colour) {
        this.context.strokeStyle = colour;
    }

    getDataUrl() {
        return this.canvas.toDataURL("image/png");
    }

    width() {
        return this.canvas.width;
    }

    height() {
        return this.canvas.height;
    }
    
    getImageData() {
        return this.context.getImageData(0, 0, this.width(), this.height());
    }

    putImageData(data) {
        return this.context.putImageData(data, 0, 0);
    }
}