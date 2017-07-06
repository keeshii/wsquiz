"use strict";

var quizes = require('../common/quizes');


function onDisconnect(socket, message) {
    var quiz;

    // Host has disconnected, notify all connected peers
    quiz = quizes.findQuizByHostId(socket.id);
    if (quiz !== null) {
        quizes.removeInstance(quiz);
        socket.broadcast.to(quiz.code).emit('room:interrupted');
    }

    // Peer has disconnected
    quiz = quizes.findQuizByPeerId(socket.id);
    if (quiz !== null) {
        quiz.removePeer(socket.id);
        quiz.answerCounter.countPeerId(socket.id);
        socket.broadcast.to(quiz.code).emit('room:disconnect', socket.id);
    }
}

module.exports = onDisconnect;
