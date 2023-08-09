const cells: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".cell");
const winnerElm: HTMLHeadElement = document.querySelector(".winner")!;
const historyElm: HTMLButtonElement = document.querySelector(".history-btns")!;

let currentPlayer: string = "x";
let isWinner: boolean | string | null = false;

const board: Array<string | null> = new Array(9).fill(null);
const oldMoves: Array<Array<string | null>> = [];
function checkWinner(): string | null {
  const positions: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [x, y, z] of positions) {
    if (board[x] === board[y] && board[y] === board[z]) return board[x];
  }
  return null;
}

cells.forEach((cell: HTMLButtonElement, i: number) => {
  cell.addEventListener("click", () => {
    if (cell.innerText || isWinner) return;

    board[i] = currentPlayer;
    cell.textContent = currentPlayer;
    console.log(isWinner);
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    winnerElm.textContent = `Next player: ${currentPlayer}`;

    isWinner = checkWinner();
    if (isWinner) {
      winnerElm.textContent = `Winner: ${currentPlayer == "x" ? "o" : "x"}`;
    }

    oldMoves.push([...board]);
    renderBtn(oldMoves.length - 1);

    console.log(oldMoves);
  });
});

function clickBtn(idx: number): void {
  let moves: Array<string | null> = oldMoves[idx];

  cells.forEach((cell: Element, i: number) => {
    const move: string | null = moves[i];
    cell.textContent = move === null ? "" : move;
  });
}

function renderBtn(idx: number): void {
  const btn: HTMLButtonElement = document.createElement("button");
  btn.textContent = `Go to move #${idx + 1}`;
  btn.addEventListener("click", () => clickBtn(idx));
  historyElm.appendChild(btn);
}
