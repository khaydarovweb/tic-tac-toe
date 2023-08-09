var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var cells = document.querySelectorAll(".cell");
var winnerElm = document.querySelector(".winner");
var historyElm = document.querySelector(".history-btns");
var currentPlayer = "x";
var isWinner = false;
var board = new Array(9).fill(null);
var oldMoves = [];
function checkWinner() {
    var positions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var _a = positions_1[_i], x = _a[0], y = _a[1], z = _a[2];
        if (board[x] === board[y] && board[y] === board[z])
            return board[x];
    }
    return null;
}
cells.forEach(function (cell, i) {
    cell.addEventListener("click", function () {
        if (cell.innerText || isWinner)
            return;
        board[i] = currentPlayer;
        cell.textContent = currentPlayer;
        console.log(isWinner);
        currentPlayer = currentPlayer === "x" ? "o" : "x";
        winnerElm.textContent = "Next player: ".concat(currentPlayer);
        isWinner = checkWinner();
        if (isWinner) {
            winnerElm.textContent = "Winner: ".concat(currentPlayer == "x" ? "o" : "x");
        }
        oldMoves.push(__spreadArray([], board, true));
        renderBtn(oldMoves.length - 1);
        console.log(oldMoves);
    });
});
function clickBtn(idx) {
    var moves = oldMoves[idx];
    cells.forEach(function (cell, i) {
        var move = moves[i];
        cell.textContent = move === null ? "" : move;
    });
}
function renderBtn(idx) {
    var btn = document.createElement("button");
    btn.textContent = "Go to move #".concat(idx + 1);
    btn.addEventListener("click", function () { return clickBtn(idx); });
    historyElm.appendChild(btn);
}
