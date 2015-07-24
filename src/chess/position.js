'use strict';

function pieceFactory(piece, side) {
    return {type: piece, side: side};
}

function clone(position) {
    return {
        turn: position.turn,
        castlingFlags: position.castlingFlags.slice(0),
        lastPawnMoveColumn: position.lastPawnMoveColumn,
        board: position.board.slice(0)
    };
}

function getInitialPosition() {
    return {
        turn: 'W',
        castlingFlags: ['wk', 'wq', 'bk', 'bq'],

        lastPawnMoveColumn: null,

        board: [
            pieceFactory("R", "W"),
            pieceFactory("N", "W"),
            pieceFactory("B", "W"),
            pieceFactory("Q", "W"),
            pieceFactory("K", "W"),
            pieceFactory("B", "W"),
            pieceFactory("N", "W"),
            pieceFactory("R", "W"),

            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),
            pieceFactory("P", "W"),

            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,

            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),
            pieceFactory("P", "B"),

            pieceFactory("R", "B"),
            pieceFactory("N", "B"),
            pieceFactory("B", "B"),
            pieceFactory("Q", "B"),
            pieceFactory("K", "B"),
            pieceFactory("B", "B"),
            pieceFactory("N", "B"),
            pieceFactory("R", "B")
        ]
    };
}

function pieceToUTF8(piece) {
    var code;
    switch(piece.type.concat(piece.side)) {
        case 'PW':
            code = '\u2659';
            break;
        case 'PB':
            code = '\u265F';
            break;
        case 'NW':
            code = '\u2658';
            break;
        case 'NB':
            code = '\u265E';
            break;
        case 'BW':
            code = '\u2657';
            break;
        case 'BB':
            code = '\u265D';
            break;
        case 'RW':
            code = '\u2656';
            break;
        case 'RB':
            code = '\u265C';
            break;
        case 'QW':
            code = '\u2655';
            break;
        case 'QB':
            code = '\u265B';
            break;
        case 'KW':
            code = '\u2654';
            break;
        case 'KB':
            code = '\u265A';
            break;
        default:
            code = null;
            break;
    }
    return code;
}

function positionToString(position, utfFlag) {
    var strings = [];
    strings.push(position.turn == 'W' ? 'WHITE' : 'BLACK');
    strings.push(' ');
    strings.push(position.castlingFlags[0] == 'wk' ? 'K' : '');
    strings.push(position.castlingFlags[1] == 'wq' ? 'Q' : '');
    strings.push(position.castlingFlags[2] == 'bk' ? 'k' : '');
    strings.push(position.castlingFlags[3] == 'bq' ? 'q' : '');

    var row;
    var col;
    for (row = 7; row >= 0; row--) {
        strings.push('\n');
        for (col = 0; col < 8; col++) {
            var currentPiece = position.board[row * 8 + col];
            if (currentPiece == null) {
                strings.push('.');
            } else if (currentPiece.side == 'W') {
                strings.push('true'==utfFlag?pieceToUTF8(currentPiece):currentPiece.type.toUpperCase());
            } else {
                strings.push('true'==utfFlag?pieceToUTF8(currentPiece):currentPiece.type.toLowerCase());
            }
            strings.push(' ');
        }
    }
    return strings.join('');
}

module.exports = {
    getInitialPosition: getInitialPosition,
    positionToString: positionToString,
    clone: clone
};
