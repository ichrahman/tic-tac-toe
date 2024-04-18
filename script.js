const boxes = document.querySelectorAll('.box');
let toggleMove = false;

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (toggleMove === false) {
            box.textContent = 'X';
            toggleMove = !toggleMove;
        } else {
            box.textContent = 'O';
            toggleMove = !toggleMove
        }


    })
})