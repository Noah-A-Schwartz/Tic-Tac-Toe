
//Board Module
const gameBoard = (() =>{
    let gameBoard = [
                     [null, null, null],
                     [null, null, null],
                     [null, null, null],
                    ];
    const updateGameBoard = (x,y, player) => {
        gameBoard[x, y] = player.getPlayerSymbol();
    }
    const getGameBoard = () => gameBoard;
    return {getGameBoard, updateGameBoard}
})();

const pvpGame = (() => {
    let turn;
    let players;
    const startGame = () => {
        turn = 0;
        players = [player("X"), player("O")]
    }
    const endTurn = () => {
        if(turn == 0)
            turn = 1;
        else turn = 0;
    }
    const makeMove = (x,y) => {
        if (getTurn == 0)
            gameBoard.updateGameBoard(x,y, players[0]);
        else gameBoard.updateGameBoard(x,y, players[1]);
        pvpGame.endTurn();
    }
     
    const getTurn = () => turn;
    return{endTurn, startGame, getTurn, makeMove}
})();

//Player Factory Function
const player = (player) =>{
    const getPlayerSymbol = () => player
    return{getPlayerSymbol};
}


function getNodeIndex(elm) {
    let c = elm.parentNode.children;
    for (i = 0; i < c.length; i++) if (c[i] == elm) return i;
  }

function makeMove(){
    let index = getNodeIndex(this)
    let grid = document.getElementsByClassName("game-board")[0];
    let offset = Number(window.getComputedStyle(grid.children[0]).gridColumnStart) - 1; 
    if (isNaN(offset)) {
        offset = 0;
      }
      const colCount = window.getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    
      const rowPosition = Math.floor((index + offset) / colCount);
      const colPosition = (index + offset) % colCount;
     
     pvpGame.makeMove(rowPosition, colPosition);
     this.children[0].innerText = (pvpGame.getTurn() == 0) ? "O" : "X";
}

function startGame(){
    addEvents()
    pvpGame.startGame();
    showBoard();
}

function showBoard(){
    document.getElementsByClassName("game-board")[0].style.visibility = "visible"
}

function addEvents(){
    let board = document.getElementsByClassName("game-board")[0].children
    for (i = 0; i < board.length; i++){
        board[i].addEventListener('click', makeMove);
       }
}
