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
                cell.textContent= _grid[cell.getAttribute("data-row")][cell.getAttribute("data-col")])
        )
        return {getGrid, isEmpty, setMarker, reset, display}
    }())

    const p1 = createPlayer('X');
    const p2 = createPlayer('O');

    const _togglePlayer = () => (
        (currentPlayer = (currentPlayer.symbol === 'X') ? p2 : p1)
    )
    const _getPosition = (event) => {
        currentRow = event.target.getAttribute("data-row");
        currentCol = event.target.getAttribute("data-col");
    }

    let currentPlayer = p1;
    let currentRow, currentCol;
    let cells = document.querySelectorAll("div.cell");
    cells.forEach(cell => cell.addEventListener("click",_getPosition));
}())