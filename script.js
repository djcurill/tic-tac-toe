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

function createPlayer(symbol,name){
    const getSymbol = () => {return symbol}
    const getName   = () => {return name}
    return {getSymbol,getName}
}





Game = (function(){

    Board = (function(){
        let _grid = createGrid(3,3);
        const getGrid = () => {return _grid};
        const isEmpty = (row,col) => {return _grid[row][col] === null};
        const setMarker = (player,row,col) => (_grid[row][col] = player.getSymbol());
        const reset = () => (_grid = createGrid(3,3));
        const display = () => (
            cells.forEach(cell => 
                cell.textContent = _grid[getRow(cell)][getCol(cell)])
        )
        return {getGrid, isEmpty, setMarker, reset, display}
    }())

    let p1, p2;
    let currentPlayer;
    let cells = document.querySelectorAll("div.cell");



    const _checkRows = (i) =>  Board.getGrid()[i]
                                    .every(x => x === currentPlayer.getSymbol())
    const _checkCols = (i) => Board.getGrid()
                                    .map(x => x[i])
                                    .every(x => x === currentPlayer.getSymbol())
    const _checkDiags = function(){
        let arr = Board.getGrid();
        let diag1 = [arr[0][0],arr[1][1],arr[2][2]]
                        .every(x => x === currentPlayer.getSymbol());
        let diag2 = [arr[0][2],arr[1][1],arr[2][0]]
                        .every(x => x === currentPlayer.getSymbol());
        return diag1 || diag2;
    }

    const checkWinner = function(){
        if (_checkDiags()) {return true}
        for (let i=0; i < 3; i++){
            if (_checkRows(i) || _checkCols(i)){return true}
        }
        return false
    }

    const setMove = function(event){
        let row = getRow(event.target);
        let col = getCol(event.target);
        if (Board.isEmpty(row,col)){
            Board.setMarker(currentPlayer,row,col);
            Board.display();
            if (checkWinner()){
                console.log("Current player is the winner");
            }
            currentPlayer = (currentPlayer.getSymbol() === 'X') ? p2 : p1
        }
    }

    const initGame = function(event){
        event.preventDefault();
        const userData = event.target.elements;
        p1 = createPlayer('X',userData.player1.value);
        p2 = createPlayer('O',userData.player2.value);
        currentPlayer = p1;  
        document.querySelector("div.player-setup").classList.add("hidden");
        document.querySelector("div.board").classList.toggle("hidden");
    }

    document.querySelector("form").addEventListener("submit",initGame);
    cells.forEach(cell => cell.addEventListener("click", setMove));
}())