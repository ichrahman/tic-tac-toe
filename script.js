const boxes = document.querySelectorAll('.box');
const resetBoard = document.querySelector('.reset');
const result = document.querySelector('.result');
let winnerFound = false;

let currentPlayer = 'X'; // Initialize current player as X

// Function to toggle player turn
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Toggle between X and O
}

// Function to reset the game
function resetGame() {
    boxes.forEach(box => {
        box.textContent = "";
    })

    currentPlayer = "";
}


// Function to check if the current player has won
function checkWin() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        const boxA = document.querySelector(`.box[data-index="${a}"]`).textContent;
        const boxB = document.querySelector(`.box[data-index="${b}"]`).textContent;
        const boxC = document.querySelector(`.box[data-index="${c}"]`).textContent;

        if (boxA && boxA === boxB && boxB === boxC) {
            winnerFound = true;
            return boxA;
        }
    }
    return null;
}

function checkDraw() {
    for (let box of boxes) {
        if (!box.textContent) {
            return false
        }
    }

    return !checkWin();
}

resetBoard.addEventListener('click', () => {
    winnerFound = false;
    result.textContent = '';
    resetGame();
})

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (!winnerFound) {
            if (!box.textContent) {
                box.textContent = currentPlayer;
                const winner = checkWin();
                if (winner) {
                    result.textContent = `${winner} is winner`;
                    winnerFound = true;
                } else if (checkDraw()) {
                    result.textContent = "It's a draw";
                    winnerFound = true;
                }
                togglePlayer();
            }
        }
    })

})