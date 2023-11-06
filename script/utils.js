class Vector {
    // Vector will be the data type that stores the x & y coordinates & operations on those coordinates

    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

}

class AssetLoader {
    // Contains functions to load assets in the game

    // Loop to keep loading assets (if not fully loaded)

    // Load Asset function, which loads all the assets in the game

    // Get Player

    // Get Ball

    // Get Pitch
}


class Canvas{

    // Draws images that are in the game
    constructor(){
        this._canvas = document.getElementById('screen');
        this._canvasContext = this._canvas.getContext('2d');
    }

    // Clear the images that are in the game
    clear(){
        this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawImage(image, position){
        this._canvasContext.drawImage(image, position.x, position.y);
    }
    
}

let canvas = new Canvas();

// Initial test
let image = new Image();
image.src = "assets/soccer-field.svg";

setTimeout(() => {
    canvas.drawImage(image, {x:0, y:0});
    // canvas.clear();
}, 1000);