"use strict";

var quizes = require('../common/quizes'),
    ws = require('../common/ws');

function onAnswer(socket, data, response) {
    var quiz = quizes.findQuizByPeerId(socket.id),
        peer;

    if (quiz === null) {
        return response('error');
    }

    peer = quiz.findPeer(socket.id);

    if (peer === null) {
        return response('error');
    }

    // Answer to late, but send ok response
    if (quiz.pending === null || data.round !== quiz.round) {
        return response('ok');
    }

    // Already answered
    if (peer.answerRound === quiz.round) {
        return response('error');
    }

    quiz.answerCounter.countPeerId(peer.id);
    peer.answer = parseInt(data.answer, 10);
    peer.answerRound = quiz.round;
    peer.answerTime = Date.now();

    ws.io.sockets.in(quiz.code).emit('room:answerPeer', {
        round: quiz.round,
        answerPeerId: socket.id
    });

    response('ok');
}

module.exports = onAnswer;
