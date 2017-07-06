"use strict";

function Peer(peerId) {
    this.id = peerId;
    this.profile = null;
    this.points = 0;
    this.answerRound = null;
}

Peer.prototype.toJson = function () {
    return {
        id: this.id,
        profile: this.profile,
        points: this.points,
        answerRound: this.answerRound
    };
};

module.exports = Peer;
