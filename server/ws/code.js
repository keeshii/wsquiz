"use strict";

var quizes = require('../common/quizes');

function leaveAllRooms(socket) {
    var rooms = socket.rooms,
        prop;

    for (prop in rooms) {
        if (rooms.hasOwnProperty(prop)) {
            socket.leave(prop);
        }
    }
}

function onEnter(socket, code, response) {
    var Quiz,
        instance,
        i;

    // Check for quiz definitions first
    for (i = 0; i < quizes.definitions.length; i++) {
        Quiz = quizes.definitions[i];
        if (Quiz.startCode === code) {

            instance = new Quiz();
            instance.hostId = socket.id;
            instance.code = quizes.generateQuizCode();

            quizes.addInstance(instance);

            leaveAllRooms(socket);
            socket.join(instance.code);

            response('host', instance.toJson());
            return;
        }
    }

    // Check peer codes
    for (i = 0; i < quizes.instances.length; i++) {
        instance = quizes.instances[i];
        if (instance.code === code) {
            instance.addPeer(socket.id);

            leaveAllRooms(socket);
            socket.join(instance.code);

            response('peer', instance.toJson());
            return;
        }
    }

    response('error');
}

module.exports = onEnter;
