const playerName = document.querySelector("#Player-name");
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const winnerMessage = document.querySelector("#winner-message");
const reset = document.querySelector("#reset");

let boardArray = ['', '', '', '', '', '', '', '', '']; // coresponding array for cells of board

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let witchPlayerTurn = Math.random() > .5 ? "O" : "X";
playerName.textContent = witchPlayerTurn
board.dataset.playerActive = witchPlayerTurn;

setOnClickForCells();

function setOnClickForCells() {
    cells.forEach((cell, index) => {
        cell.onclick = () => {
            if (boardArray[index] === ""){
                cell.classList.add(witchPlayerTurn);
                boardArray[index] = witchPlayerTurn;
                let gameState = checkGameState();
                if(gameState === 1) {
                    winnerMessage.innerHTML = `<h3>${witchPlayerTurn} Selamat Kamu Menang 🗿</h3>`
                    removeOnClickFromCells()
                } else if (gameState === -1) {
                    winnerMessage.innerHTML = `<h3>Imbang wir 🗿.</h3>`
                } else {
                    witchPlayerTurn = witchPlayerTurn === "X" ? "O" : "X" // change turn
                    playerName.textContent = witchPlayerTurn
                }
            }
        }
    })
}


reset.onclick = () => {
    boardArray = ['', '', '', '', '', '', '', '', ''];
    witchPlayerTurn = Math.random() > .5 ? "X" : "O";
    playerName.textContent = witchPlayerTurn;
    board.dataset.playerActive = witchPlayerTurn;
    cells.forEach(cell => {
        cell.classList.remove("X");
        cell.classList.remove("O");
    })
    winnerMessage.innerHTML = ``
    setOnClickForCells()
}

function checkGameState () {
    for (condition of winningConditions) {
        // there is a winner
        if (boardArray[condition[0]] === boardArray[condition[1]] &&
            boardArray[condition[1]] === boardArray[condition[2]] &&
            boardArray[condition[0]]!== "") {
                return 1
            }
    }

    for (cell of boardArray) {
        // there is a empty cell and game should continue
        if (cell === "") {
            return 0
        }
    }

    // the game is finished and there is no winner
    return -1
}


function removeOnClickFromCells() {
    cells.forEach(cell => {
        cell.onclick = ""
    })
}
