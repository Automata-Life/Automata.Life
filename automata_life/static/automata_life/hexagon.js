// Hex math defined here: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html

function HexagonGrid(canvasId, radius) {
    this.radius = radius;

    this.grid = [];
    this.initialized = false;

    this.timestep = 2500;
    this.step = 0;

    this.dead_color  = "#999999"
    this.alive_color = "#fa0000"

    this.survival_rules = [false,false,false,true,false,true,false];
    this.birth_rules = [false,false,true,false,false,false,false];

    this.time = performance.now();

    this.height = Math.sqrt(3) * radius;
    this.width = 2 * radius;
    this.side = (3 / 2) * radius;

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');

    this.canvasOriginX = 0;
    this.canvasOriginY = 0;

    this.canvas.addEventListener("mousedown", this.clickEvent.bind(this), false);

};

HexagonGrid.prototype.drawHexGrid = function (rows, cols, originX, originY, isDebug) {
    if(!this.initialized){
        for (var col = 0; col < cols; col++) {
            var column = [];
            for (var row = 0; row < rows; row++) {
                column.push(0);
            }
            this.grid.push(column);
        }
        console.log(this.grid);
        this.initialized = true;
    }

    this.canvasOriginX = originX;
    this.canvasOriginY = originY;

    this.rows = rows;
    this.cols = cols;

    var currentHexX;
    var currentHexY;
    var debugText = "";

    var offsetColumn = false;

    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows; row++) {

            if (!offsetColumn) {
                currentHexX = (col * this.side) + originX;
                currentHexY = (row * this.height) + originY;
            } else {
                currentHexX = col * this.side + originX;
                currentHexY = (row * this.height) + originY + (this.height * 0.5);
            }

            if (isDebug) {
                debugText = col + "," + row;
            }
            var color = this.alive_color;
            if(this.grid[col][row] == 0){
                color = this.dead_color;
            }
            this.drawHex(currentHexX, currentHexY, color, debugText);

        }
        offsetColumn = !offsetColumn;
    }
};

HexagonGrid.prototype.drawHexAtColRow = function(column, row, color) {
    var drawy = column % 2 == 0 ? (row * this.height) + this.canvasOriginY : (row * this.height) + this.canvasOriginY + (this.height / 2);
    var drawx = (column * this.side) + this.canvasOriginX;

    this.drawHex(drawx, drawy, color, "");
};

HexagonGrid.prototype.drawHex = function(x0, y0, fillColor, debugText) {
    this.context.strokeStyle = "#000";
    this.context.beginPath();
    this.context.moveTo(x0 + this.width - this.side, y0);
    this.context.lineTo(x0 + this.side, y0);
    this.context.lineTo(x0 + this.width, y0 + (this.height / 2));
    this.context.lineTo(x0 + this.side, y0 + this.height);
    this.context.lineTo(x0 + this.width - this.side, y0 + this.height);
    this.context.lineTo(x0, y0 + (this.height / 2));

    if (fillColor) {
        this.context.fillStyle = fillColor;
        this.context.fill();
    }

    this.context.closePath();
    this.context.stroke();

    if (debugText) {
        this.context.font = "8px";
        this.context.fillStyle = "#000";
        this.context.fillText(debugText, x0 + (this.width / 2) - (this.width/4), y0 + (this.height - 5));
    }
};

//Recusivly step up to the body to calculate canvas offset.
HexagonGrid.prototype.getRelativeCanvasOffset = function() {
    var x = 0, y = 0;
    var layoutElement = this.canvas;
    if (layoutElement.offsetParent) {
        do {
            x += layoutElement.offsetLeft;
            y += layoutElement.offsetTop;
        } while (layoutElement = layoutElement.offsetParent);

        return { x: x, y: y };
    }
}

//Uses a grid overlay algorithm to determine hexagon location
//Left edge of grid has a test to acuratly determin correct hex
HexagonGrid.prototype.getSelectedTile = function(mouseX, mouseY) {

    var offSet = this.getRelativeCanvasOffset();

    mouseX -= offSet.x;
    mouseY -= offSet.y;

    var column = Math.floor((mouseX) / this.side);
    var row = Math.floor(
        column % 2 == 0
            ? Math.floor((mouseY) / this.height)
            : Math.floor(((mouseY + (this.height * 0.5)) / this.height)) - 1);


    //Test if on left side of frame
    if (mouseX > (column * this.side) && mouseX < (column * this.side) + this.width - this.side) {


        //Now test which of the two triangles we are in
        //Top left triangle points
        var p1 = new Object();
        p1.x = column * this.side;
        p1.y = column % 2 == 0
            ? row * this.height
            : (row * this.height) + (this.height / 2);

        var p2 = new Object();
        p2.x = p1.x;
        p2.y = p1.y + (this.height / 2);

        var p3 = new Object();
        p3.x = p1.x + this.width - this.side;
        p3.y = p1.y;

        var mousePoint = new Object();
        mousePoint.x = mouseX;
        mousePoint.y = mouseY;

        if (this.isPointInTriangle(mousePoint, p1, p2, p3)) {
            column--;

            if (column % 2 != 0) {
                row--;
            }
        }

        //Bottom left triangle points
        var p4 = new Object();
        p4 = p2;

        var p5 = new Object();
        p5.x = p4.x;
        p5.y = p4.y + (this.height / 2);

        var p6 = new Object();
        p6.x = p5.x + (this.width - this.side);
        p6.y = p5.y;

        if (this.isPointInTriangle(mousePoint, p4, p5, p6)) {
            column--;

            if (column % 2 == 0) {
                row++;
            }
        }
    }

    return  { row: row, column: column };
};


HexagonGrid.prototype.sign = function(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
};

//TODO: Replace with optimized barycentric coordinate method
HexagonGrid.prototype.isPointInTriangle = function isPointInTriangle(pt, v1, v2, v3) {
    var b1, b2, b3;

    b1 = this.sign(pt, v1, v2) < 0.0;
    b2 = this.sign(pt, v2, v3) < 0.0;
    b3 = this.sign(pt, v3, v1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
};

HexagonGrid.prototype.clickEvent = function (e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var localX = mouseX - this.canvasOriginX;
    var localY = mouseY - this.canvasOriginY;

    var tile = this.getSelectedTile(localX, localY);
    if (tile.column >= 0 && tile.column < this.cols && tile.row >= 0 && tile.row < this.rows) {
        var neighbors = this.get_neighbors(tile.column, tile.row);
        this.grid[tile.column][tile.row] = 1 - this.grid[tile.column][tile.row];
    }
};


HexagonGrid.prototype.clear = function() {
    for (var col = 0; col < this.cols; col++) {
        for (var row = 0; row < this.rows; row++) {
            this.grid[col][row] = 0;
        }
    }
};

HexagonGrid.prototype.randomize = function() {
    for (var col = 0; col < this.cols; col++) {
        for (var row = 0; row < this.rows; row++) {
            this.grid[col][row] = Math.floor(Math.random() * 2);
        }
    }
};

HexagonGrid.prototype.update = function() {
    var time = this.time; //Real time
    var elapsed = performance.now() - time;
    this.time = performance.now();

    this.step += elapsed;

    while (this.step >= this.timestep) {
        this.step -= this.timestep;

        var next_grid = []
        for(var i = 0; i < this.cols; i++){
            next_grid[i] = this.grid[i].slice();
        }

        for (var col = 0; col < this.cols; col++) {
            for (var row = 0; row < this.rows; row++) {

                var neighbors = this.get_neighbors(col, row);
                var alive = 0;
                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i];
                    if(this.grid[neighbor[0]][neighbor[1]] == 1){
                        alive++;
                    }
                }

                if(this.grid[col][row] == 1){
                    //apply survival rules
                    if(! this.survival_rules[alive]){
                        next_grid[col][row] = 0;
                    }
                }
                else{
                    // apply birth rules
                    if(this.birth_rules[alive]){
                        next_grid[col][row] = 1;
                    }
                }

            }
        }
        this.grid = next_grid;
    }
};

HexagonGrid.prototype.get_neighbors = function(col, row){
    var directions = [
       [ [+1,  0], [+1, -1], [ 0, -1],
         [-1, -1], [-1,  0], [ 0, +1] ],
       [ [+1, +1], [+1,  0], [ 0, -1],
         [-1,  0], [-1, +1], [ 0, +1] ]
    ];

    var parity = col & 1
    var neighbors = [];

    for (var i = 0; i < 6; i++) {
        var target_col = col + directions[parity][i][0];
        var target_row = row + directions[parity][i][1];

        if (target_row >= 0 && target_row < this.rows &&
                target_col >= 0 && target_col < this.cols){
            neighbors.push([target_col,target_row]);
        }
    }
    return neighbors;
};
