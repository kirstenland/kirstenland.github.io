export function floodfill(layer, startX, startY, fillColour) {
    const canvasWidth = layer.width;
    const canvasHeight = layer.height;
    let pixelStack = [[startX, startY]];

    const startColour = layer.getColourAt(startX, startY);

    const matchStartColor = (x, y) => (startColour.matches(layer.getColourAt(x, y)));

    while(pixelStack.length) {
        let [x,  y] = pixelStack.pop();
        while(y > 0 && matchStartColor(x, y - 1)) {
            y--;
        }
        let reachLeft = false;
        let reachRight = false;
        while(y < canvasHeight-1 && matchStartColor(x, y)) {
            layer.colorPixel(x, y, fillColour);

            if(x > 0) {
                if(matchStartColor(x - 1, y)) {
                    if(!reachLeft) {
                        pixelStack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else {
                    reachLeft = false;
                }
            }
        
            if(x < canvasWidth-1) {
                if(matchStartColor(x + 1, y)) {
                    if(!reachRight) {
                        pixelStack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else {
                    reachRight = false;
                }
            }
            y++;
        }
    }
    return layer.layer;
}
