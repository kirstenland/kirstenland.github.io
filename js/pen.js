class Pen {
    constructor(ctx) {
        this.ctx = ctx;
        this.down = false;
        this.x = 0;
        this.y = 0;
    }
    penDown(x, y) {
        this.down = true;
        this.x = x;
        this.y = y;
        this.points = [x, y]
    }
    penUp() {
        this.down = false;
        this.ctx.lineWidth = 2;
        this.drawSpline(this.points, 0.3);
    }
    draw(newX, newY) {
        if (this.down) {
            this.ctx.strokeStyle = '#ff0000'
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(newX, newY);
            this.ctx.stroke();
            this.ctx.closePath();
            this.x = newX;
            this.y = newY;
            this.ctx.strokeStyle = '#000000'
            this.points = this.points.concat(newX, newY)
        }
    }

    drawSpline(pts,t) {
        var cp = [];
        var n = pts.length;
        for(var i=0;i<n-4;i+=2){
            cp=cp.concat(this.getControlPoints(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));
        }
        for(var i=2;i<pts.length-5;i+=2){
            this.ctx.beginPath();
            this.ctx.moveTo(pts[i],pts[i+1]);
            this.ctx.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3]);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        this.ctx.beginPath();
        this.ctx.moveTo(pts[0],pts[1]);
        this.ctx.quadraticCurveTo(cp[0],cp[1],pts[2],pts[3]);
        this.ctx.stroke();
        this.ctx.closePath();
        
        this.ctx.beginPath();
        this.ctx.moveTo(pts[n-2],pts[n-1]);
        this.ctx.quadraticCurveTo(cp[2*n-10],cp[2*n-9],pts[n-4],pts[n-3]);
        this.ctx.stroke();
        this.ctx.closePath();
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
        
        return [p1x,p1y,p2x,p2y]
    }
}