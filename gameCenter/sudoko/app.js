//general var
let numSelected = null;
let tileSelected = null;
let errors = 0;
let numCellsToRemove = 30
let solution = createSudokuSolution();
let board = createPlayableBoard(solution, numCellsToRemove);

//HTML var
const dificulty = document.getElementById('choseDificulty')
const startBtn = document.getElementById('startBtn');

//listen to change in dificulty level
dificulty.addEventListener('change', choseDificulty)
//starting game
startBtn.addEventListener('click', () => {
    errors = 0
    document.getElementById('errors').innerText = errors;
    document.getElementById('board').innerHTML = '';
    document.getElementById('digits').innerHTML = '';
    solution = createSudokuSolution();
    board = createPlayableBoard(solution, numCellsToRemove);
    setGame()
})

//starting game function
function setGame() {
    //digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement('div');
        number.id = i;
        number.innerText = i;
        number.addEventListener('click', selectNumber);
        number.classList.add('number');
        document.getElementById('digits').appendChild(number)
    }

    //board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != '-') {
                tile.innerText = board[r][c];
                tile.classList.add('tile-start')
            }
            if (r == 5 || r == 2) {
                tile.classList.add('horizontal-line')
            }

            if (c == 2 || c == 5) {
                tile.classList.add('vertical-line')
            }
            tile.addEventListener('click', selectTile)
            tile.classList.add('tile');
            document.getElementById('board').append(tile)
        }
    };
}

//selecting number
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove('number-selected')
    }
    numSelected = this;
    numSelected.classList.add('number-selected');
}

//selecting place on board
function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return
        }

        let coords = this.id.split('-');
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        } else {
            errors += 1;
            document.getElementById('errors').innerText = errors
        }

        if (numSelected) {
            let howmanydraw = 0
            board.forEach((tile) => {
                if (tile.includes(numSelected)) {
                    howmanydraw += 1;
                };
            })
            console.log(howmanydraw)
        }
        //handle errors
        if (errors == 3) {
            document.getElementById('board').innerHTML = "You Lost"
        }
    }
}

//creating sodoku suolotion randomly
function createSudokuSolution() {
    let base = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function rotateArray(arr, times) {
        return arr.slice(times).concat(arr.slice(0, times));
    }

    let solution = [];
    shuffleArray(base);
    for (let i = 0; i < 9; i++) {
        solution.push(rotateArray(base, (i * 3) % 9).join(''));
        if (i === 2 || i === 5) {
            base = rotateArray(base, 1);
        }
    }

    return solution;
}

//creating the board for the game
function createPlayableBoard(solution, numCellsToRemove) {
    let board = solution.map(row => row.split(''));

    function getRandomCells(totalCells, numCellsToRemove) {
        let cells = [];
        while (cells.length < numCellsToRemove) {
            let cell = Math.floor(Math.random() * totalCells);
            if (!cells.includes(cell)) {
                cells.push(cell);
            }
        }
        return cells;
    }

    let totalCells = 81;
    let cellsToRemove = getRandomCells(totalCells, numCellsToRemove);

    cellsToRemove.forEach(cellIndex => {
        let row = Math.floor(cellIndex / 9);
        let col = cellIndex % 9;
        board[row][col] = '-';
    });

    return board.map(row => row.join(''));
}

//function for choosing dificulties
function choseDificulty() {
    let level = dificulty.value;
    if (level == 'easy') {
        numCellsToRemove = 30;
    }

    if (level == 'medium') {
        numCellsToRemove = 50;
    }

    if (level == 'hard') {
        numCellsToRemove = 70
    }
}
