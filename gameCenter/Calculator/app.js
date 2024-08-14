//set actions
let actoin = ["**", "/", "*", "-", "+"];
//set the numbers
let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//handke math problems varlable
let mathProblem = ""

//buttons
const numBtn = document.querySelectorAll(".numBtn");
const actBtn = document.querySelectorAll(".actBtn");
const screen = document.getElementById('screen');
const complexActBtn = document.querySelectorAll(".mathBtn")
const equal = document.getElementById('equal');
const newBtn = document.getElementById('new');
const point = document.getElementById('point');
const deleteBtn = document.getElementById('delete');

//funcotionality
complexActBtn.forEach((cell, cellIndex) => {
    cell.addEventListener('click', () => {
        let mathAction = [Math.tan(mathProblem), Math.sin(mathProblem), Math.cos(mathProblem), Math.sqrt(mathProblem), Math.log(mathProblem)]
        screen.value = mathAction[cellIndex];
        return mathProblem = screen.value;
    })
})

numBtn.forEach((cell, cellIndex) => {
    cell.addEventListener('click', () => {
        screen.value += nums[cellIndex];
        return mathProblem = screen.value;
    })
});

actBtn.forEach((cell, cellIndex) => {
    cell.addEventListener('click', () => {
        if (screen.value != "") {
            screen.value += actoin[cellIndex];
            return mathProblem = screen.value;
        }
    })
});


deleteBtn.addEventListener('click', () => {
    screen.value = mathProblem.slice(0, mathProblem.length - 1);
    return mathProblem = screen.value;
})

point.addEventListener('click', () => {
    screen.value += ".";
    return mathProblem = screen.value;
})

equal.addEventListener('click', () => {
    screen.value = eval(mathProblem);
    return mathProblem = screen.value;
})

newBtn.addEventListener('click', () => {
    location.reload();
    return mathProblem = "";
})

