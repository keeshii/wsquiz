"use strict";

var quizes = require('../common/quizes'),
    ws = require('../common/ws'),
    q = require('q');

function startCountdown(quiz) {
    var deferred = q.defer();

    if (quiz.pending) {
        deferred.reject('pending');
        return deferred.promise;
    }

    quiz.pending = quiz.questions[quiz.round];
    quiz.answerCounter.startCounting(quiz.peers);
    ws.io.sockets.in(quiz.code).emit('room:countdown');

    setTimeout(function () {
        deferred.resolve();
    }, quiz.countdownTime);

    return deferred.promise;
}

function sendQuestion(quiz) {
    var deferred = q.defer();

    ws.io.sockets.in(quiz.code).emit(
        'room:question',
        quiz.questionToJson(quiz.pending)
    );

    quiz.answerCounter.onComplete(function () {
        deferred.resolve();
    });

    setTimeout(function () {
        deferred.resolve();
    }, quiz.answerTime);

    return deferred.promise;
}

function sendResults(quiz) {
    var results = quiz.calculateResults(quiz.pending);

    quiz.pending = null;
    quiz.answerCounter.stopCounting();
    quiz.round++;

    ws.io.sockets.in(quiz.code).emit('room:results', results);
}

function freeQuiz(quiz) {
    var socket,
        i;

    // Remove host from the room
    socket = ws.io.sockets.connected[quiz.hostId];
    if (socket) {
        socket.leave(quiz.code);
    }

    // Remove all peers from the room
    for (i = 0; i < quiz.peers.length; i++) {
        socket = ws.io.sockets.connected[quiz.peers[i].id];
        if (socket) {
            socket.leave(quiz.code);
        }
    }

    // Remove the quiz instance
    quizes.removeInstance(quiz);
}

function onNext(socket, data, response) {
    var quiz = quizes.findQuizByHostId(socket.id);

    if (quiz === null) {
        return response('error');
    }

    if (quiz.isFinished()) {
        return response('error');
    }

    response('ok');

    // Start countdown
    startCountdown(quiz).then(function () {
        return sendQuestion(quiz);
    }).then(function () {
        return sendResults(quiz);
    }).then(function () {
        if (quiz.isFinished()) {
            return freeQuiz(quiz);
        }
    });
}

module.exports = onNext;
