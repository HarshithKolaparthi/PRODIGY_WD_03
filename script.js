document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
    const resetButton = document.getElementById('resetButton');
    const message = document.getElementById('message');
    let isXTurn = true;
    let gameState = Array(9).fill(null);
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const index = event.target.dataset.index;

        if (!gameState[index]) {
            gameState[index] = isXTurn ? 'X' : 'O';
            event.target.textContent = gameState[index];
            isXTurn = !isXTurn;
            checkWinner();
        }
    }

    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                message.textContent = `${gameState[a]} wins!`;
                cells.forEach(cell => cell.removeEventListener('click', handleClick));
                return;
            }
        }

        if (gameState.every(cell => cell)) {
            message.textContent = "It's a tie!";
        }
    }

    function resetGame() {
        gameState = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleClick);
        });
        message.textContent = '';
        isXTurn = true;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
});
