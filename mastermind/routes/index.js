/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy
// module.exports ==> exports
var _ = require('underscore');

exports.index = function (req, res) {
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    res.render('index', {
        title: 'Mastermind'
    });
};

exports.play = function (req, res) {
    var returnObj = {};
    var newGame = function () {
        var i, data = [],
            puzzle = req.session.puzzle;
        for (i = 0; i < puzzle.size; i += 1) {
            data.push(Math.floor(Math.random() * puzzle.dim));
        }
        req.session.puzzle.data = data;

        returnObj.puzzle = puzzle;
    };
    // poniższa linijka jest zbędna (przy założeniu, że
    // play zawsze używany będzie po index) – w końcowym
    // rozwiązaniu można ją usunąć.
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    /*
     * req.params[2] === wartość size
     * req.params[4] === wartość dim
     * req.params[6] === wartość max
     */
    if (req.params[2]) {
        req.session.puzzle.size = req.params[2];
    }
    if (req.params[4]) {
        req.session.puzzle.dim = req.params[4];
    }
    if (req.params[6]) {
        req.session.puzzle.max = req.params[6];
    }

    newGame();
    res.render('_play', {
        title: 'Mastermind',
        size: req.session.puzzle.size,
        dim: req.session.puzzle.dim,
        max: req.session.puzzle.max
    },
    function (err, view) {
      returnObj.view = view;
    });
    res.json(returnObj);
};

exports.mark = function (req, res) {
    var markAnswer = function () {
        var move = req.params[0].split('/');
        move = move.slice(0, move.length - 1);
        console.log(move);
        return {
            black: 1,
            white: 2
        };
    };
    res.json(markAnswer());
};

exports.gameOver = function (req, res) {
    res.render('_game-over');
};
