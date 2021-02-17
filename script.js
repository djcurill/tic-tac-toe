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

Board = (function(){
    _grid = createGrid(3,3);
    getGrid = () => {return _grid};
    setMarker = (symbol,row,col) => (_grid[row][col] = symbol);
    reset = () => (_grid = createGrid(3,3));
    return {getGrid, setMarker, reset}
}())

