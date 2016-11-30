var hexagonGrid = new HexagonGrid("HexCanvas", hex_radius);
hexagonGrid.drawHexGrid(10, 29, 50, 50, true);

function mainLoop() {
    hexagonGrid.update();
    hexagonGrid.drawHexGrid(10, 29, 50, 50, true);
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);
