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
        return {getGrid, isEmpty, setMarker, reset}
    }())

    const p1 = createPlayer('X');
    const p2 = createPlayer('O');

    let currentPlayer = p1;
    let currentRow, currentCol;

    const _togglePlayer = () => (
        (currentPlayer = (currentPlayer.symbol === 'X') ? p2 : p1)
    )
    const _getPosition = (event) => {
        currentRow = event.target.getAttribute("data-row");
        currentCol = event.target.getAttribute("data-col");
    }

    document.querySelectorAll("div.cell")
            .forEach(cell => cell.addEventListener("click",_getPosition));
}())