var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 200;
var display = document.getElementsByTagName("h3");
var ctx = canvas.getContext("2d");
var grid = 10;
var count = 0;
var score = 0;
var level = 4;
var levelC = 0;
var attempt = 0;
var highScore = 0;

var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 5
};

var apple = {
    x: 320,
    y: 320,
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function startGame() {
    requestAnimationFrame(startGame);
    if (++count < level) {
        return;
    }
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.cells.unshift({
        x: snake.x,
        y: snake.y
    });
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    ctx.fillStyle = "#FFA17A";
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    ctx.fillStyle = "#FFA17A";

    snake.cells.forEach(function (cell, index) {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score = score + 5;
            level = level - 0.1;
            levelC++;
            apple.x = getRandomInt(0, canvas.width / 25) * grid;
            apple.y = getRandomInt(0, canvas.height / 25) * grid;
            display[0].innerHTML = "Score:" + score;
            display[3].innerHTML = "Level:" + levelC;
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (
                snake.x < 0 ||
                snake.x >= canvas.width ||
                snake.y < 0 ||
                snake.y >= canvas.height ||
                (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y)
            ) {
                reset();
                init();
            }
        }
    });
}

document.addEventListener("keydown", function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

function reset() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [],
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
    if (score >= highScore || highScore == "") {
        highScore = score;
    }
    attempt++;
    score = 0;
    level = 5;
    levelC = 0;
    display[0].innerHTML = "Score:" + score;
    display[3].innerHTML = "Level:" + levelC;
    display[1].innerHTML = "highScore:" + highScore;
    display[2].innerHTML = "attempt:" + attempt;

}

function init() {
    let temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 200;
    ctx.putImageData(temp, 0, 0);

}

window.addEventListener("resize", init);
requestAnimationFrame(startGame);