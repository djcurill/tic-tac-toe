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
    let _grid = createGrid(3,3);
    const getGrid = () => {return _grid};
    const isEmpty = (row,col) => {return _grid[row][col] === null};
    const setMarker = (symbol,row,col) => (_grid[row][col] = symbol);
    const reset = () => (_grid = createGrid(3,3));
    return {getGrid, isEmpty, setMarker, reset}
}())