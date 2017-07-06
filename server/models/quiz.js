"use strict";

var Peer = require('./peer'),
    AnswerCounter = require('../common/answerCounter');

function Quiz() {
    this.answerCounter = new AnswerCounter();
    this.answerTime = 10 * 1000;
    this.avatars = [];
    this.code = null;
    this.countdownTime = 3 * 1000;
    this.languages = null;
    this.hostId = null;
    this.peers = [];
    this.questions = [];
    this.round = 0;
    this.title = 'Untitled';
}

Quiz.startCode = null;

Quiz.prototype.addQuestion = function (question) {
    this.questions.push(question);
};

Quiz.prototype.addPeer = function (peerId) {
    this.peers.push(new Peer(peerId));
};

Quiz.prototype.findPeer = function (peerId) {
    var peers = this.peers,
        i;

    for (i = 0; i < peers.length; i++) {
        if (peers[i].id === peerId) {
            return peers[i];
        }
    }

    return null;
};

Quiz.prototype.findPeerByNick = function (nick) {
    var peers = this.peers,
        i;

    for (i = 0; i < peers.length; i++) {
        if (peers[i].profile && peers[i].profile.nick === nick) {
            return peers[i];
        }
    }

    return null;
};

Quiz.prototype.getPeers = function () {
    return this.peers.filter(function (peer) {
        return !!peer.profile;
    });
};

Quiz.prototype.removePeer = function (peerId) {
    var i;
    for (i = this.peers.length - 1; i >= 0; i--) {
        if (this.peers[i].id === peerId) {
            this.peers.splice(i, 1);
        }
    }
};

Quiz.prototype.isFinished = function () {
    return this.round >= this.questions.length;
};

Quiz.prototype.hasStarted = function () {
    return this.round > 0;
};

Quiz.prototype.getImagesToPreload = function (round) {
    var question = this.questions[round],
        preload,
        i;

    if (!question) {
        return null;
    }

    if (question.preload) {
        return question.preload;
    }

    preload = [];
    if (question.image) {
        preload.push(question.image);
    }
    for (i = 0; i < question.answers.length; i++) {
        if (question.answers[i].image) {
            preload.push(question.answers[i].image);
        }
    }

    return preload.length ? preload : null;
};

Quiz.prototype.calculateResults = function (question) {
    var peer,
        startTime,
        endTime,
        peers = [],
        histogram = [],
        i;

    for (i = 0; i < question.answers.length; i++) {
        histogram[i] = 0;
    }

    for (i = 0; i < this.peers.length; i++) {
        peer = this.peers[i];
        if (peer.answerRound === this.round && peer.answer !== undefined) {
            if (startTime === undefined || startTime > peer.answerTime) {
                startTime = peer.answerTime;
            }
            if (endTime === undefined || endTime < peer.answerTime) {
                endTime = peer.answerTime;
            }
            if (histogram[peer.answer] !== undefined) {
                histogram[peer.answer]++;
            }
        }
    }

    // adding points
    for (i = 0; i < this.peers.length; i++) {
        peer = this.peers[i];
        if (peer.answerRound === this.round && peer.answer !== undefined) {
            if (peer.answer === question.correct) {

                // 1000 points for correct answer
                peer.points += 1000;

                // 1000 time bonus
                if (endTime - startTime === 0) {
                    peer.points += 1000;
                } else {
                    peer.points += Math.round(
                        1000 - 1000 * (peer.answerTime - startTime) / (endTime - startTime)
                    );
                }

                peers.push(peer.toJson());
            }
        }
    }

    return {
        correct: question.correct,
        histogram: histogram,
        peers: peers,
        preload: this.getImagesToPreload(this.round + 1),
        round: this.round
    };
};

Quiz.prototype.questionToJson = function (question) {
    return {
        round: this.round,
        text: question.text,
        image: question.image,
        answers: question.answers
    };
};

Quiz.prototype.toJson = function () {
    return {
        answerTime: this.answerTime,
        avatars: this.avatars,
        code: this.code,
        countdownTime: this.countdownTime,
        languages: this.languages,
        peers: this.getPeers(),
        preload: this.getImagesToPreload(this.round),
        questionCount: this.questions.length,
        title: this.title
    };
};

module.exports = Quiz;
