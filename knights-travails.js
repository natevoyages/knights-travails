const knightsMoves = function(position = [0,0]){
    let updateMoves =(moveSet(position));
    console.log(updateMoves);
    let validMoves = possibleMoves(updateMoves);
    console.log(validMoves);
    console.log('Shortest Moves!');
}

const moveSet = function(position){
    let arr = 
    [[-2, -1], [-2, 1],
    [-1, -2], [-1, 2],
    [1 , -2], [1, 2 ],
    [2, -1],  [2, 1]];

    arr = arr.map((element) => 
        { element[0] += position[0];
            element[1] += position[1];
        return element;})
    return arr;
}

const boardBoundries = function(move){
    let xCoordinate = move[0];
    let yCoordinate = move[1];
    let xLower = 0;
    let xUpper = 8;
    let yLower = 0;
    let yUpper = 8;

    if (xCoordinate >= xLower && xCoordinate <= xUpper && 
        yCoordinate >= yLower && yCoordinate <= yUpper){
    return true;
    }
    return false;
    
}

const possibleMoves = function(moveSet){
    let moves = moveSet.map(boardBoundries);
    let count = 0;
    let possible = [];
    for( count; count < moves.length; count++){
        if (moves[count] == true){
            possible.push(count);
        }
    }
    return possible;
}

// 8 possible moves total
// grid is set up as [0,0] to [8, 8];
// the movement is 2 x/y then 1 x/y
// [-2, 1], [-2, -1],
// [2, 1],  [2, -1],
// [-1, 2], [-1, -2],
// [1 , 2], [1, -2 ]

knightsMoves([1,1]);