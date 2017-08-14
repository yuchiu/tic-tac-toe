let tiles = document.getElementsByClassName("tile");
let state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let game = true;
let visible = false;
let HUMAN = false;
let COMPUTER = true;
let HUMVAL = -1;
let COMVAL = 1;
let currentPlayer = HUMAN;
let winMatrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let humanXO;
let compXO;
let resetButton = document.getElementById('reset');
let xButton = document.getElementById('x');
let oButton = document.getElementById('o');
let heading = document.getElementById('heading');
let computerTurn = document.getElementById('comp');


function reset() {
    for (let x = 0; x < 9; x++) {
        tiles[x].innerHTML = "";
        state[x] = 0;
    tiles[x].style.display = 'none';
    }
    let humanXO = null;
    let compXO = null;
    resetButton.style.display = 'none';
    computerTurn.style.display = 'none';
    xButton.style.display = 'block';
    oButton.style.display = 'block';
    game = true;
    heading.innerHTML = 'Tic Tac Toe. Choose O or X to start the turn';
}


function claim(clicked) {
    if (!game)
        return;
    for (let x = 0; x < 9; x++) {
        if (tiles[x] == clicked && state[x] == 0) {
            set(x, currentPlayer);
        }
    }
}

function set(index, player) {
    if (!game)
        return;
    if (state[index] == 0) {
        if (player == HUMAN) {
            tiles[index].innerHTML = humanXO;

        } else {
            tiles[index].innerHTML = compXO;
        }
        state[index] = player == HUMAN ? HUMVAL : COMVAL;
        currentPlayer = !currentPlayer;
        aiturn(state, 0, currentPlayer, false);
        if (checkWin(state, player) || checkFull(state)) {
            for (let x = 0; x < 9; x++)
            heading.innerHTML = "Game ended. Click reset to start another game.";
            game = false;
        }
    }
}

function checkWin(board, player) {
    let value = player == HUMAN ? HUMVAL : COMVAL;
    for (let x = 0; x < 8; x++) {
        let win = true;
        for (let y = 0; y < 3; y++) {
            if (board[winMatrix[x][y]] != value) {
                win = false;
                break;
            }
        }
        if (win)
            return true;
    }
    return false;
}

function checkFull(board) {
    for (let x = 0; x < 9; x++)
        if (board[x] == 0)
            return false;
    return true;
}

function aiturn(board, depth, player, turn) {
    if (checkWin(board, !player))
        return -10 + depth;
    if (checkFull(board))
        return 0;
    let value = player == HUMAN ? HUMVAL : COMVAL;
    let max = -Infinity;
    let index = 0;
    for (let x = 0; x < 9; x++) {
        if (board[x] == 0) {
            let newboard = board.slice();
            newboard[x] = value;
            let moveval = -aiturn(newboard, depth + 1, !player, false);
            if (moveval > max) {
                max = moveval;
                index = x;
            }
        }
    }
    if (turn)
        set(index, player)
    return max;
}

function chooseX() {
    humanXO = 'X';
    compXO = 'O';
    resetButton.style.display = 'block';
    computerTurn.style.display = 'block';
    xButton.style.display = 'none';
    oButton.style.display = 'none';
    for(let i = 0; i<9; i ++)
    tiles[i].style.display = 'block';
    heading.innerHTML = 'Have Fun! Click computer for it to takes turn';
}

function chooseO() {
    humanXO = 'O';
    compXO = 'X';
    resetButton.style.display = 'block';
    computerTurn.style.display = 'block';
    xButton.style.display = 'none';
    oButton.style.display = 'none';
    for(let i = 0; i<9; i ++)
    tiles[i].style.display = 'block';
    heading.innerHTML = 'Have Fun! Click computer for it to takes turn';

}