const boxes = document.querySelectorAll('.box');
const resetBoard = document.querySelector('.reset');
const result = document.querySelector('.result');
let winnerFound = false;
let playerTurn = true; // Flag to indicate player's turn, initially true

let currentPlayer = 'X'; // Initialize current player as X

// Function to toggle player turn
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Toggle between X and O
}

// Function to reset the game
function resetGame() {
    winnerFound = false;
    currentPlayer = "X";
    playerTurn = true;
    boxes.forEach(box => {
        box.textContent = "";
    })


}


resetBoard.addEventListener('click', () => {
    winnerFound = false;
    result.textContent = '';
    resetGame();
})


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



// Function to handle computer move (basic random move)
function computerMove() {
    if (!playerTurn && !winnerFound) {
        // Find all empty boxes
        const emptyBoxes = [...boxes].filter(box => !box.textContent);
        // Choose a random empty box
        const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        // Add computer's symbol to the random empty box
        randomBox.textContent = currentPlayer;
        // Toggle player turn
        playerTurn = true;
        togglePlayer();
        // Check for win after each move
        const winner = checkWin();
        if (winner) {
            result.textContent = `${winner} is winner`;
            winnerFound = true;
        } else if (checkDraw()) {
            result.textContent = "It's a draw";
            winnerFound = true;
        }
    }
}





function playerMove(box) {
    if (playerTurn && !box.textContent && !winnerFound) {
        // Add player's symbol to the clicked box
        box.textContent = currentPlayer;
        // Toggle player turn
        playerTurn = false;
        // Check for win after each move
        togglePlayer();
        const winner = checkWin();
        if (winner) {
            result.textContent = `${winner} is winner`;
            winnerFound = true;
        } else if (checkDraw()) {
            result.textContent = "It's a draw";
            winnerFound = true;
        } else {
            // It's the computer's turn
            setTimeout(computerMove, 500);
        }
    }
}


boxes.forEach(box => {
    box.addEventListener('click', () => {
        playerMove(box);
    })

})