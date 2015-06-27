'use strict';
var assert = require('assert');
var chessRules = require('../src');

describe('pgn module', function () {

    it('must understand e4', function () {
        var position = chessRules.getInitialPosition();
        var moveE4 = chessRules.pgnToMove(position, "e4");
        assert.equal(moveE4.src, 12);
        assert.equal(moveE4.dst, 28);
    });

    it('must understand a simple game', function () {
        var position = chessRules.getInitialPosition();
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "e4"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "e5"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "d4"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "exd4"));
        assert.equal(position.board[27].type, 'P');
        assert.equal(position.board[27].side, 'B');
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "Qd4"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "Nc6"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "e5"));
        position = chessRules.applyMove(position, chessRules.pgnToMove(position, "Nxd4"));
        assert.equal(position.board[27].type, 'N');
        assert.equal(position.board[27].side, 'B');
    });

    it('must be able to identify source by piece type', function () {
        var position = chessRules.getInitialPosition();
        // Add a white bishop at C3
        position.board[18] = {type: 'B', side: 'W'};

        // Add a white knight at F3
        position.board[21] = {type: 'N', side: 'W'};

        // Both pieces can reach E5...
        var knightMove = chessRules.pgnToMove(position, "Ne5");
        assert.equal(knightMove.src, 21);

        var bishopMove = chessRules.pgnToMove(position, "Be5");
        assert.equal(bishopMove.src, 18);
    });

});

