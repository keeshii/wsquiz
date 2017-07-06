"use strict";

var quizes = require('../common/quizes'),
    ws = require('../common/ws');

function onProfile(socket, profile, response) {
    var quiz,
        peer;

    if (!profile.nick) {
        response('error');
        return;
    }

    quiz = quizes.findQuizByPeerId(socket.id);

    if (quiz === null) {
        response('error');
        socket.emit('room:interrupted', 'ERROR_QUIZ_NOT_FOUND');
        return;
    }

    // Nick already in use
    peer = quiz.findPeerByNick(profile.nick);
    if (peer !== null) {
        response('error');
        return;
    }

    // Update peer profile
    peer = quiz.findPeer(socket.id);
    peer.profile = profile;

    // Give peer current standings
    ws.io.sockets.in(quiz.code).emit('room:join', peer.toJson());
    response('ok');
}

module.exports = onProfile;
