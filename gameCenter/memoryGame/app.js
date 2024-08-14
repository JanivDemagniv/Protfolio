let errors = 0;
let cardList = [
    'img/darkness',
    'img/double',
    'img/fairy',
    'img/fighting',
    'img/fire',
    'img/grass',
    'img/lightning',
    'img/metal',
    'img/psychic',
    'img/water'
]

let cardSet;
let board = [];
let rows = 4;
let columns = 5;
let card1Selected;
let card2Selected;
let maxErrors;
let gameSpeedDif;

const startBtn = document.getElementById('startBtn')
const selectDif = document.getElementById('selectDif')

startBtn.addEventListener('click', () => {
    document.getElementById('board').innerHTML = "";
    board = []
    cardSet = null;
    errors = 0;
    document.getElementById('errors').innerText = 0;
    shuffleCard();
    startGame();

    startBtn.innerText = 'Reset'
})


function shuffleCard() {
    cardSet = cardList.concat(cardList);

    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp
    }



}

function startGame() {
    //arrange the board 4x5

    if (selectDif.value == 'easy') {
        maxErrors = 15;
        gameSpeedDif = 3000
    }
    if (selectDif.value == 'medium') {
        maxErrors = 10;
        gameSpeedDif = 2000
    }
    if (selectDif.value == 'hard') {
        maxErrors = 5;
        gameSpeedDif = 1000
    }

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            //creating the images on board
            let card = document.createElement('img');
            card.id = r.toString() + '-' + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add('card');
            card.addEventListener('click', selectCard)
            document.getElementById('board').append(card);
        }

        board.push(row)
    }
    setTimeout(hideCards, gameSpeedDif);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + '-' + c.toString());
            card.src = 'img/back.jpg'
        }
    }
}


function selectCard() {
    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split('-')
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + '.jpg'
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;
            let coords = card2Selected.id.split('-')
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + '.jpg'
            setTimeout(update, gameSpeedDif)
        }
    }
    //ending game
    if (errors == maxErrors) {
        document.getElementById('board').innerHTML = '<h1 class="lostGame">You Lost<h1>'
    }
}

//update errors
function update() {
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = 'img/back.jpg';
        card2Selected.src = 'img/back.jpg';
        errors += 1;
        document.getElementById('errors').innerText = errors;
    }

    card1Selected = null;
    card2Selected = null
}