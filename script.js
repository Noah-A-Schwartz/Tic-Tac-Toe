
//Board Module
const gameBoard = (() => {
    let gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    const updateGameBoard = (x, y, player) => {
        gameBoard[x][y] = player.getPlayerSymbol();
        console.table(gameBoard);
    }
    const getGameBoard = () => gameBoard;
    return { getGameBoard, updateGameBoard }
})();

const pvpGame = (() => {
    let temp = "";
    let winner = null;
    let turn;
    let players;
    const startGame = () => {
        turn = 0;
        players = [player("X"), player("O")];
    }
    const endTurn = () => {
        if (turn == 0)
            turn = 1;
        else turn = 0;
    }
    const makeMove = (x, y) => {
        if (getTurn() == 0)
            gameBoard.updateGameBoard(x, y, players[0]);
        else gameBoard.updateGameBoard(x, y, players[1]);
        isWinner();
        pvpGame.endTurn();
    }
    //000
    const isWinner = () => {
        winner = null;
        temp = "";
        let currentState = gameBoard.getGameBoard();
        //Rows
        for (i = 0; i < currentState.length; i++) {
            if(winner == null)
                temp = "";
            else break;
            for (j = 0; j < currentState[i].length; j++) {
                temp+=currentState[i][j];
                console.log(temp);
                if (temp == "XXX") {
                    winner = players[0];
                    console.log("Player " + winner.getPlayerSymbol() + " is the Winner");
                }
                else if (temp == "OOO"){
                    winner = players[1];
                    console.log("Player " + winner.getPlayerSymbol() + " is the Winner");
                }
            }
                
        }
        
        //Colums
        winner = null;
        temp = "";
        for (i = 0; i < currentState.length; i++) {
            if(winner == null)
                temp = "";
            else break;
            for (j = 0; j < currentState[i].length; j++) {
                temp+=currentState[j][i];
                console.log(temp);
                if (temp == "XXX") {
                    winner = players[0];
                    console.log("Player " + winner.getPlayerSymbol() + " is the Winner");
                }
                else if (temp == "OOO"){
                    winner = players[1];
                    console.log("Player " + winner.getPlayerSymbol() + " is the Winner");
                }
            }
                
        }
        //Diagonal From Top left
        winner = null;
        temp = "";
        for (i = 0; i < currentState.length; i++) {
                temp+=currentState[i][i];
                console.log(temp);
        }
        if (temp == "OOO") {
            winner = players[1];
            console.log("Player " + winner.getPlayerSymbol() + " is the Winner");
        }
        else if(temp == "XXX"){
            winner = players[0];
            console.log("Player " + winner.getPlayerSymbol() + " is the Winner");
    }
    winner = null;
    temp = "";
    lastRow = null;
    lastColumn = null;

    //Diagonal from top right
    temp += currentState[0][2];
    temp+= currentState[1][1];
    temp += currentState[2][0];

    if (temp == "OOO") {
        winner = players[1];
        console.log("Player " + winner.getPlayerSymbol() + " is the Winner");
    }
    else if(temp == "XXX"){
        winner = players[0];
        console.log("Player " + winner.getPlayerSymbol() + " is the Winner");
}
    }
        
    
        const getTurn = () => turn;
        return { endTurn, startGame, getTurn, makeMove }
    })();

    //Player Factory Function
    const player = (player) => {
        const getPlayerSymbol = () => player
        return { getPlayerSymbol };
    }


    function getNodeIndex(elm) {
        let c = elm.parentNode.children;
        for (i = 0; i < c.length; i++) if (c[i] == elm) return i;
    }

    function makeMove() {
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
        this.removeEventListener("click", makeMove);
    }

    function startGame() {
        addEvents();
        pvpGame.startGame();
        showBoard();
    }


    function showBoard() {
        document.getElementsByClassName("game-board")[0].style.visibility = "visible"
    }

    function addEvents() {
        let board = document.getElementsByClassName("game-board")[0].children
        for (i = 0; i < board.length; i++) {
            board[i].addEventListener('click', makeMove);
        }
    }
