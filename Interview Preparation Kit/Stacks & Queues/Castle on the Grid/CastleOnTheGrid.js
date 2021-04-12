'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumMoves function below.
function minimumMoves(grid, startRow, startCol, goalRow, goalCol) {
    // initialize a 2d matrix to track visited nodes and its parents
    const visited = Array(grid.length).fill(false).map(_ => Array(grid[0].length).fill(false).map(_ => ({visited: false, parent: null})));

    visited[startRow][startCol].visited = true;
    console.log(visited);


    const rowQueue = [startRow];
    const colQueue = [startCol];

    let moves = 0;
    let parent = null;
    while  (rowQueue.length !== 0) {
        const row = rowQueue.shift();
        const col = colQueue.shift();
        if (row === goalRow && col === goalCol) {
            parent = visited[row][col].parent;
            break;
        }
        exploreNeighbours(row, col);
    }

    console.log(visited);
    while (parent !== null) {
        console.log(parent);
        moves++;
        parent = visited[parent[0]][parent[1]].parent;
    }

    return moves;

    function exploreNeighbours(row, col) {
        // north, south, east, west directon vectors
        const dc = [0, 0, -1, +1];
        const dr = [-1, +1, 0, 0];

        for (let i = 0; i < 4; i++) {
            let cc = col;
            let rr = row;
            while (true) {
                cc += dc[i];
                rr += dr[i];

                // stop at out of bounds
                if (cc < 0 || rr < 0) break;
                if (rr > grid.length - 1 || cc > grid[0].length - 1) break;

                // stop visited or blocked cells
                if (visited[rr][cc].visited) continue;
                if (grid[rr][cc] === 'X') break;

                colQueue.push(cc);
                rowQueue.push(rr);
                visited[rr][cc].visited = true;
                visited[rr][cc].parent = [row, col]; 
            }
        }
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const startXStartY = readLine().split(' ');

    const startX = parseInt(startXStartY[0], 10);

    const startY = parseInt(startXStartY[1], 10);

    const goalX = parseInt(startXStartY[2], 10);

    const goalY = parseInt(startXStartY[3], 10);

    const result = minimumMoves(grid, startX, startY, goalX, goalY);

    ws.write(result + '\n');

    ws.end();
}
