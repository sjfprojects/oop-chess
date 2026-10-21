class Piece {
    colour;

    constructor(pieceColour) {
        this.colour = pieceColour;
    }

    getColour() {
        console.log(`Piece colour is ${this.colour}`);
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

    getValidMoves(board) {

    }
}

function isEven(n) {
    if (n%2 == 0) {
        return true;
    } else return false;
}

class Board {
    constructor() {
        this.square = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ];
        this.container = document.getElementById('board-container');
    }

    setup() {
        this.square[0][0] = new Rook("b");
        this.square[0][1] = new Knight("b");
        this.square[0][2] = new Bishop("b");
        this.square[0][3] = new Queen("b");
        this.square[0][4] = new King("b");
        this.square[0][5] = new Bishop("b");
        this.square[0][6] = new Knight("b");
        this.square[0][7] = new Rook("b");

        this.square[1][0] = new Pawn("b");
        this.square[1][1] = new Pawn("b");
        this.square[1][2] = new Pawn("b");
        this.square[1][3] = new Pawn("b");
        this.square[1][4] = new Pawn("b");
        this.square[1][5] = new Pawn("b");
        this.square[1][6] = new Pawn("b");
        this.square[1][7] = new Pawn("b");

        this.square[6][0] = new Pawn("w");
        this.square[6][1] = new Pawn("w");
        this.square[6][2] = new Pawn("w");
        this.square[6][3] = new Pawn("w");
        this.square[6][4] = new Pawn("w");
        this.square[6][5] = new Pawn("w");
        this.square[6][6] = new Pawn("w");
        this.square[6][7] = new Pawn("w");

        this.square[7][0] = new Rook("w");
        this.square[7][1] = new Knight("w");
        this.square[7][2] = new Bishop("w");
        this.square[7][3] = new Queen("w");
        this.square[7][4] = new King("w");
        this.square[7][5] = new Bishop("w");
        this.square[7][6] = new Knight("w");
        this.square[7][7] = new Rook("w");
    }

    render() {
        let selectedSquare = null;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');
                if (isEven(i) == isEven(j)) {
                    square.classList = 'square light-square';
                } else square.classList = 'square dark-square';
                this.container.append(square);

                const icon = document.createElement('img');
                icon.classList = 'pieces';

                if (this.square[i][j] != null) {
                    icon.src = `./pieces/${this.square[i][j].colour}${this.square[i][j].type}.svg`;
                    square.append(icon);
                    square.addEventListener('click', () => {
                        if (selectedSquare) {
                            selectedSquare.classList.remove('selected-square');
                        }
                        square.classList.add('selected-square');
                        selectedSquare = square;
                    })
                }
            }
        }
    }
}

const board = new Board();
board.setup();
board.render();