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
    let score = 0;
    const getSymbol = () => symbol;
    const getName   = () => name;
    const addPoint  = () => score ++;
    const getScore  = () => score;
    return {getSymbol,getName, addPoint, getScore}
}

Board = (function(){
    let _grid = createGrid(3,3);
    const getGrid = () => {return _grid};
    const isEmpty = (row,col) => {return _grid[row][col] === null};
    const setMarker = (player,row,col) => (_grid[row][col] = player.getSymbol());
    const reset = () => (_grid = createGrid(3,3));
    const display = (cells) => (
        cells.forEach(cell => 
            cell.textContent = _grid[getRow(cell)][getCol(cell)])
    )
    return {getGrid, isEmpty, setMarker, reset, display}
}())


Game = (function(){
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

    const _setScore = function(player){
        let msg = `${player.getName()}: ${player.getScore()}`;
        document.getElementById(player.getName()).textContent = msg;
    }

    const _updateTurnStatus = function(){
        document.getElementById("turn-status").textContent = `${currentPlayer.getName()}, it is your turn!`;
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
            Board.display(cells);
            if (checkWinner()){
                currentPlayer.addPoint();
                _setScore(currentPlayer);
                document.getElementById("new-game").classList.toggle("hidden");
            }
            currentPlayer = (currentPlayer.getSymbol() === 'X') ? p2 : p1
            _updateTurnStatus();
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
        document.getElementById("scoreboard").classList.toggle("hidden");
        
        document.querySelector("div.player-one-score").id = p1.getName();
        document.querySelector("div.player-two-score").id = p2.getName();
        _setScore(p1);
        _setScore(p2);
        _updateTurnStatus();
    }

    const newRound = function(event){
        Board.reset();
        Board.display(cells);
        document.getElementById("new-game").classList.toggle("hidden");
    }

    document.getElementById("new-game-btn").addEventListener("click",newRound);
    document.querySelector("form").addEventListener("submit",initGame);
    cells.forEach(cell => cell.addEventListener("click", setMove));
}())