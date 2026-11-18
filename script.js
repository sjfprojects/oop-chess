//selection and movement
//fix notation for black
//turns and game loop
//capturing
//check
//mate
//special moves
//computer


/*
click on piece
 -> valid moves higlighted (isSelected)
 -> click on square
 -> move piece, update piece/board
 -> previous move still highlighted
*/

class Piece {
    colour;

    constructor(pieceColour) {
        this.colour = pieceColour;
        this.isSelected = false;
        this.element = null;
    }

    movePiece(from, to) {

    }
}

class Rook extends Piece {
    type = "r";

    getValidMoves(board) {

    }
}

class Knight extends Piece {
    type = "n";

    getValidMoves(board) {

    }
}

class Bishop extends Piece {
    type = "b";

    getValidMoves(board) {

    }
}

class Queen extends Piece {
    type = "q";

    getValidMoves(board) {

    }
}

class King extends Piece {
    type = "k";

    getValidMoves(board) {

    }
}

class Pawn extends Piece {
    type = "p";

    getValidMoves(board, row, col) {
        //check moves
        const validMoves = [board[row - 1][col], board[row - 2][col]];
        return validMoves;
    }
}

class Square {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.notation = "abcdefgh"[col] + (8 - row);
        this.piece = null;
        this.isLight = (row + col) % 2 === 0;
        this.isSelected = false;
        this.element = document.createElement("div");
    }
}

function createSquares() {
    let board = [];

    for (i = 0; i < 8; i++) {
        let rows = [];
        for (j = 0; j < 8; j++) {
            rows.push(new Square(i, j));
        }
        board.push(rows);
    }

    return board;
}

class Board {
    constructor() {
        this.container = document.getElementById('board-container');
        this.board = createSquares();

        this.selectedPiece = null;
        //this.selectedSquare = null;
    }

    setup() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let currentSquare = this.board[
                    playerColour == 'w' ? i : 7 - i
                ][
                    playerColour == 'w' ? j : 7 - j
                ];

                const square = currentSquare.element;

                if (currentSquare.isLight) {
                    square.classList = 'square light-square';
                } else square.classList = 'square dark-square';
                this.container.append(square);
            }
        }

        //pieces
        {
            this.board[0][1].piece = new Knight("b");
            this.board[0][0].piece = new Rook("b");
            this.board[0][2].piece = new Bishop("b");
            this.board[0][3].piece = new Queen("b");
            this.board[0][4].piece = new King("b");
            this.board[0][5].piece = new Bishop("b");
            this.board[0][6].piece = new Knight("b");
            this.board[0][7].piece = new Rook("b");

            this.board[1][0].piece = new Pawn("b");
            this.board[1][1].piece = new Pawn("b");
            this.board[1][2].piece = new Pawn("b");
            this.board[1][3].piece = new Pawn("b");
            this.board[1][4].piece = new Pawn("b");
            this.board[1][5].piece = new Pawn("b");
            this.board[1][6].piece = new Pawn("b");
            this.board[1][7].piece = new Pawn("b");

            this.board[6][0].piece = new Pawn("w");
            this.board[6][1].piece = new Pawn("w");
            this.board[6][2].piece = new Pawn("w");
            this.board[6][3].piece = new Pawn("w");
            this.board[6][4].piece = new Pawn("w");
            this.board[6][5].piece = new Pawn("w");
            this.board[6][6].piece = new Pawn("w");
            this.board[6][7].piece = new Pawn("w");

            this.board[7][0].piece = new Rook("w");
            this.board[7][1].piece = new Knight("w");
            this.board[7][2].piece = new Bishop("w");
            this.board[7][3].piece = new Queen("w");
            this.board[7][4].piece = new King("w");
            this.board[7][5].piece = new Bishop("w");
            this.board[7][6].piece = new Knight("w");
            this.board[7][7].piece = new Rook("w");
        }
    }

    render() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let currentSquare = this.board[
                    playerColour == 'w' ? i : 7 - i
                ][
                    playerColour == 'w' ? j : 7 - j
                ];
                const square = currentSquare.element;

                const icon = document.createElement('img');
                icon.classList = 'pieces';
                if (currentSquare.element.childElementCount != 0) continue;
                if (currentSquare.piece != null) {
                    icon.src = `./pieces/${currentSquare.piece.colour}${currentSquare.piece.type}.svg`;
                    square.append(icon);
                    currentSquare.piece.element = icon;
                }

                if (currentSquare.piece?.colour == playerColour) {
                    square.addEventListener('click', () => {
                        if (this.selectedPiece != currentSquare.piece && this.selectedPiece != null) {
                            this.selectedPiece.isSelected = false;
                            this.selectedPiece.element.parentNode.classList.remove('selected-square');
                        }
                        this.selectedPiece = currentSquare.piece;
                        currentSquare.piece.isSelected = true;
                        square.classList.add('selected-square');
                        
                        const validMoves = this.selectedPiece.getValidMoves(this.board, currentSquare.row, currentSquare.col);
                        document.querySelectorAll('.circle').forEach(c => c.remove());
                        for (i = 0; i < validMoves.length; i++) {
                            const circle = document.createElement("div");
                            circle.classList.add('circle');
                            validMoves[i].element.append(circle);
                        }
                    });
                }
            }
        }
    }
}

function setPlayerColour(colour) {
   playerColour = colour;
   document.getElementById("start-button").disabled = false;
}

class Game {
    constructor() {
        this.player = playerColour;
        //this.turn = "w";

        const board = new Board(this.player);
        board.setup();
        board.render();
    }
}

function start() {
    document.getElementById("white-button").disabled = true;
    document.getElementById("random-button").disabled = true;
    document.getElementById("black-button").disabled = true;
    document.getElementById("start-button").disabled = true;
    new Game;
}