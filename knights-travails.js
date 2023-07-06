const boardSpaces = new Map();
const knightsMoves = function(start = [0,0], end){
    let queue = [JSON.stringify(start)];

    boardSpaces.get(JSON.stringify(start)).distance = 0;
    while(queue.length > 0){
        let prev = queue.shift();

        let moves = boardSpaces.get(prev).edges;
        moves.forEach( move => {
            if(boardSpaces.get(move).distance === null){
            boardSpaces.get(move).distance = boardSpaces.get(prev).distance + 1;
            boardSpaces.get(move).previous = prev;
            queue.push(move);
            }
        });
    }
    let steps = boardSpaces.get(JSON.stringify(end)).distance;
    let revPath = [end];
    console.log(`You made it in ${steps} moves!  Here's your path:`);
    traverseReverse(JSON.stringify(end), revPath);
    let path = reverseArray(revPath);
    path.forEach(move => console.log(move));
    
}

const addEdge = function(position, move){
    boardSpaces.get(JSON.stringify(position)).edges.push(JSON.stringify(move));

}

const addVertex = function(node){
    boardSpaces.set(JSON.stringify(node), {edges: [],distance: null, previous: null});
}
const buildBoard = function(){
    let space = [0,0];
    for(let i = 0; i < 8; i++){
        space[0] = i;; 
        for(let j = 0; j <  8; j++){
            space[1] = j;
            addVertex(space);
            let moveSet = loadMoveSet(space);
            let validMoves = possibleMoves(moveSet);
            validMoves.forEach( element => addEdge(space, element));
        }
    }
}
const reverseArray = function(arr){
    let newArray = [];
    for(let i = arr.length - 1; i > -1; i--){
        newArray.push(arr[i]);
    }
    return newArray;

}
const traverseReverse = function(space, path = []){
    if (boardSpaces.get(space).distance == 0){
        return;
    }
    let prev = boardSpaces.get(space).previous;
    path.push(JSON.parse(prev));
    traverseReverse(prev, path);
}
const loadMoveSet = function(position){
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
    let xUpper = 7;
    let yLower = 0;
    let yUpper = 7;

    if (xCoordinate >= xLower && xCoordinate <= xUpper && 
        yCoordinate >= yLower && yCoordinate <= yUpper){
    return move;
    }
    return null;
    
}

const possibleMoves = function(moveSet){
    let moves = moveSet.map(boardBoundries);
    let possible = [];
    for( let i =0 ; i < moves.length; i++){
        if (moves[i] != null){
            possible.push(moves[i]);
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

buildBoard();
knightsMoves([0,0], [5,5]);
