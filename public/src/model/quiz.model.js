(function () {
    'use strict';

    function QuizModelFactory() {

        function QuizModel(json) {
            json = json || {};
            this.fromJson(json);
        }

        QuizModel.prototype.fromJson = function (json) {
            this.avatars = json.avatars;
            this.answerTime = json.answerTime;
            this.code = json.code;
            this.countdownTime = json.countdownTime;
            this.languages = json.languages;
            this.maxPoints = 0;
            this.peers = json.peers || [];
            this.preload = json.preload || null;
            this.question = {};
            this.questionCount = json.questionCount;
            this.title = json.title;
        };

        QuizModel.prototype.removePeer = function (peerId) {
            var i;
            for (i = this.peers.length - 1; i >= 0; i--) {
                if (this.peers[i].id === peerId) {
                    this.peers.splice(i, 1);
                }
            }
        };

        QuizModel.prototype.isFinished = function () {
            var round = this.question.round === undefined ? 0 : this.question.round + 1;
            return round >= this.questionCount;
        };

        QuizModel.prototype.hasStarted = function () {
            return this.question.round !== undefined;
        };

        return QuizModel;
    }

    angular.module('wq.model').factory('QuizModel', [
        QuizModelFactory
    ]);

}());
