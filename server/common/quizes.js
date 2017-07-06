"use strict";

var pad = require('./pad');

function Quizes() {
    this.definitions = [];
    this.instances = [];
}

Quizes.prototype.defineQuiz = function (quiz) {
    this.definitions.push(quiz);
};

Quizes.prototype.addInstance = function (quiz) {
    this.instances.push(quiz);
};

Quizes.prototype.removeInstance = function (instance) {
    var i;

    for (i = this.instances.length - 1; i >= 0; i--) {
        if (this.instances[i] === instance) {
            this.instances.splice(i, 1);
        }
    }
};

Quizes.prototype.generateQuizCode = function () {
    var duplication,
        instance,
        code,
        i;

    code = Math.floor(Math.random() * 100000);

    do {
        duplication = false;
        code = (code + 1) % 100000;

        for (i = 0; i < this.instances.length; i++) {
            instance = this.instances[i];

            if (pad(code, 5) === instance.code) {
                duplication = true;
                break;
            }
        }
    } while (duplication);

    return pad(code, 5);
};

Quizes.prototype.findQuizByCode = function (code) {
    var instance,
        i;

    for (i = 0; i < this.instances.length; i++) {
        instance = this.instances[i];
        if (instance.code === code) {
            return instance;
        }
    }

    return null;
};

Quizes.prototype.findQuizByHostId = function (hostId) {
    var i;

    for (i = 0; i < this.instances.length; i++) {
        if (this.instances[i].hostId === hostId) {
            return this.instances[i];
        }
    }

    return null;
};

Quizes.prototype.findQuizByPeerId = function (peerId) {
    var peers,
        j,
        i;

    for (i = 0; i < this.instances.length; i++) {
        peers = this.instances[i].peers;
        for (j = 0; j < peers.length; j++) {
            if (peers[j].id === peerId) {
                return this.instances[i];
            }
        }
    }

    return null;
};

module.exports = new Quizes();
