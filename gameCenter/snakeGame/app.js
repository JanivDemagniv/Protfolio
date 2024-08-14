//HTML Elements
const board = document.getElementById('game-board');
const instractionText = document.getElementById('instrucation-text')
const score = document.getElementById('score')
const highScoreText = document.getElementById('highScore')

//Game Varilables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeed = 200;
let gameStarted = false;

//drawing function, call all drawing in one place
function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
}

//draw the snake
function drawSnake() {
    snake.forEach((cube) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, cube);
        board.appendChild(snakeElement);
    })
}

//draw food
function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement)
    }
};

//creating the cubes itslef
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

//position
function setPosition(element, position) {
    element.style.gridColumn = position.x
    element.style.gridRow = position.y;
}

//generate food function
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y }
}

//snake movment
function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'right':
            head.x++;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--
            break
    }
    snake.unshift(head)

    //what happend if the snake eating food
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeed)
    } else {
        snake.pop()
    }
};

const arrowUp = document.getElementById('ArrowUp')
const arrowDown = document.getElementById('ArrowDown')
const arrowRight = document.getElementById('ArrowRight')
const arrowLeft = document.getElementById('ArrowLeft')
const spaceBtn = document.getElementById('Space')

spaceBtn.addEventListener('click', startGame);
arrowDown.addEventListener('click', () => direction = 'down')
arrowUp.addEventListener('click', () => direction = 'up')
arrowRight.addEventListener('click', () => direction = 'right')
arrowLeft.addEventListener('click', () => direction = 'left')

//conecting move function to key commends
function handleKeyPress(e) {
    if (
        (!gameStarted && e.code === 'space') ||
        (!gameStarted && e.key === ' ')
    ) {
        startGame()
    } else {
        switch (e.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
        }
    }
};

//check the collision of the snake with the border of the screen
function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame()
    }

    //checking collision with the snake itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame()
        }
    }
}

//assining the keys command
document.addEventListener('keydown', handleKeyPress);

//increasing speed game for each food that been eaten
function increaseSpeed() {
    if (gameSpeed > 150) {
        gameSpeed -= 5;
    } else if (gameSpeed > 100) {
        gameSpeed -= 3;
    } else if (gameSpeed > 50) {
        gameSpeed -= 2;
    } else if (gameSpeed > 25) {
        gameSpeed -= 1;
    }
};

//game function(start,reset,stop)
function startGame() {
    gameStarted = true;
    instractionText.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeed);
};

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instractionText.style.display = 'block';

}

function resetGame() {
    updateHighScore();
    stopGame();
    food = generateFood();
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    gameSpeed = 200;
    updateScore();
};

//updating scores
function updateScore() {
    let currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
};

function updateHighScore() {
    let currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block'
};

