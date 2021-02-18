const getRow = el => el.getAttribute("data-row");
const getCol = el => el.getAttribute("data-col");

function createGrid(m,n){
    let arr = [];
    for (let i=0; i < m; i++){
        arr[i] = [];
        for (let j=0; j < n; j++){
            arr[i][j] = null;
        }
    }
    return arr;
}

function createPlayer(symbol){
    return {symbol}
}



Game = (function(){

    Board = (function(){
        let _grid = createGrid(3,3);
        const getGrid = () => {return _grid};
        const isEmpty = (row,col) => {return _grid[row][col] === null};
        const setMarker = (symbol,row,col) => (_grid[row][col] = symbol);
        const reset = () => (_grid = createGrid(3,3));
        const display = () => (
            cells.forEach(cell => 
                cell.textContent = _grid[getRow(cell)][getCol(cell)])
        )
        return {getGrid, isEmpty, setMarker, reset, display}
    }())

    const p1 = createPlayer('X');
    const p2 = createPlayer('O');
    let currentPlayer = p1;
    let cells = document.querySelectorAll("div.cell");

    const setMove = function(event){
        let row = getRow(event.target);
        let col = getCol(event.target);
        if (Board.isEmpty(row,col)){
            Board.setMarker(currentPlayer.symbol,row,col);
            Board.display();
            currentPlayer = (currentPlayer.symbol === 'X') ? p2 : p1
        }
    }

    cells.forEach(cell => cell.addEventListener("click", setMove));
}())