"use strict";

var  q = require('q');

function AnswerCounter() {
    var deferred = null,
        waitingFor = [];

    this.startCounting = function (peers) {
        var i;

        if (deferred) {
            deferred.reject();
        }

        waitingFor = [];
        deferred = q.defer();

        for (i = 0; i < peers.length; i++) {
            if (peers[i].profile) {
                waitingFor.push(peers[i].id);
            }
        }
    };

    this.stopCounting = function () {
        if (deferred) {
            deferred.reject();
            deferred = null;
        }
    };

    this.onComplete = function (callback) {
        if (!deferred) {
            return;
        }
        deferred.promise.then(callback);
    };

    this.countPeerId = function (peerId) {
        var index = waitingFor.indexOf(peerId);
        if (index === -1) {
            return;
        }

        waitingFor.splice(index, 1);
        if (waitingFor.length === 0) {
            deferred.resolve();
            deferred = null;
        }
    };
}

module.exports = AnswerCounter;
