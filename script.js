const boxes = document.querySelectorAll('.box');
const resetBoard = document.querySelector('.reset');

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

resetBoard.addEventListener('click', () => {
    resetGame();
})

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (!box.textContent) {
            box.textContent = currentPlayer;
            togglePlayer();
        }
    })

})