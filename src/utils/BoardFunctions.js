// reveal corresponding neighbors when null cell is clicked
export const revealNeighbors = (arr, i, j) => {
    let flag = true             // used to stop searching for neightbors when we hit tile with number
    if(!arr[i][j].isRevealed){
        arr[i][j].isRevealed = true;
        if(arr[i][j].value === 0){
            flag=true
        }
        else if(arr[i][j].value > 0){
            flag = false
        }
    }
    if (flag && i > 0 && arr[i - 1][j].value >= 0 && !arr[i - 1][j].isRevealed) 
        revealNeighbors(arr, i-1, j)
    if (flag && j > 0 && arr[i][j - 1].value >= 0  && !arr[i][j-1].isRevealed)
        revealNeighbors(arr, i, j-1)
    if (flag && i < arr.length - 1 && arr[i + 1][j].value >= 0  && !arr[i + 1][j].isRevealed) 
        revealNeighbors(arr, i+1, j)
    if (flag && j < arr[i].length - 1 && arr[i][j + 1].value >= 0  && !arr[i][j+1].isRevealed)
        revealNeighbors(arr, i, j+1)
    if (flag && i > 0 && j > 0 && arr[i - 1][j - 1].value >= 0 && !arr[i - 1][j-1].isRevealed)
        revealNeighbors(arr, i-1, j-1)
    if (flag && i > 0 && j < arr[i].length - 1 && arr[i - 1][j + 1].value >= 0  && !arr[i - 1][j+1].isRevealed)
        revealNeighbors(arr, i-1, j+1)
    if (flag && i < arr.length - 1 && j > 0 && arr[i + 1][j - 1].value >= 0 && !arr[i + 1][j-1].isRevealed)
        revealNeighbors(arr, i+1, j-1)
    if (flag && i < arr.length - 1 && j < arr[i].length - 1 && arr[i + 1][j + 1].value >= 0 && !arr[i + 1][j+1].isRevealed)
        revealNeighbors(arr, i+1, j+1)
    return
}

// randomize board bomb positions
export const getRandomIndices = (x, y1, y2) => {
    const result = new Set();
    while (result.size < x) {
      const randomIndex = [Math.floor(Math.random() * y1), Math.floor(Math.random() * y2)];
      result.add(randomIndex.toString());
    }
    return Array.from(result).map(item => item.split(",").map(i => parseInt(i)));
  }

// fix individual values based in neighbording bombs
export const setNeighborCount = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if(arr[i][j].value === -1) continue
            let count = 0;
            if (i > 0 && arr[i - 1][j].value === -1) count++;
            if (j > 0 && arr[i][j - 1].value === -1) count++;
            if (i < arr.length - 1 && arr[i + 1][j].value === -1) count++;
            if (j < arr[i].length - 1 && arr[i][j + 1].value === -1) count++;
            if (i > 0 && j > 0 && arr[i - 1][j - 1].value === -1) count++;
            if (i > 0 && j < arr[i].length - 1 && arr[i - 1][j + 1].value === -1) count++;
            if (i < arr.length - 1 && j > 0 && arr[i + 1][j - 1].value === -1) count++;
            if (i < arr.length - 1 && j < arr[i].length - 1 && arr[i + 1][j + 1].value === -1) count++;
            arr[i][j].value = count;
        }
    }
    return arr;
}

export const isHidden = (board) => {
    let count = 0;
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            if(!board[i][j].isRevealed) count++
        }
    }
    return count
}