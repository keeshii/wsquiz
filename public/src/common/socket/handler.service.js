(function () {
    'use strict';

    function wqSocketHandler(
        $state,
        $uibModalStack,
        translateFilter,
        wqDialog,
        wqSession,
        wqSocket
    ) {

        function interrupted() {
            wqDialog.error(translateFilter('COM_INTERRUPTED'))
                .then(function () {
                    wqSession.set('quiz', null);
                    $state.go('start', {reason: 'interrupted'});
                });
        }

        this.init = function () {
            wqSocket.on('room:interrupted', interrupted);

            wqSocket.on('room:join', function (peer) {
                var quiz = wqSession.get('quiz');

                if (!quiz) {
                    return interrupted();
                }

                quiz.peers.push(peer);
            });

            wqSocket.on('room:disconnect', function (peerId) {
                var quiz = wqSession.get('quiz');

                if (!quiz) {
                    return interrupted();
                }

                quiz.removePeer(peerId);
            });

            wqSocket.on('room:countdown', function () {
                var quiz = wqSession.get('quiz'),
                    profile = wqSession.get('profile'),
                    isHost = wqSession.get('isHost');

                if (!quiz) {
                    return interrupted();
                }

                if (!isHost && !profile) {
                    return;
                }

                $uibModalStack.dismissAll();
                wqDialog.countdown(quiz.countdownTime);
            });

            wqSocket.on('room:question', function (question) {
                var quiz = wqSession.get('quiz'),
                    profile = wqSession.get('profile'),
                    isHost = wqSession.get('isHost');

                if (!quiz) {
                    return interrupted();
                }

                if (!isHost && !profile) {
                    return;
                }

                $uibModalStack.dismissAll();
                quiz.question = question;
                $state.go('question', {}, {reload: true});
            });

            wqSocket.on('room:answerPeer', function (data) {
                var quiz = wqSession.get('quiz'),
                    profile = wqSession.get('profile'),
                    isHost = wqSession.get('isHost'),
                    i;

                if (!quiz) {
                    return interrupted();
                }

                if (!isHost && !profile) {
                    return;
                }

                if (quiz.question.round === data.round) {
                    // update number of answers
                    for (i = 0; i < quiz.peers.length; i++) {
                        if (quiz.peers[i].id === data.answerPeerId) {
                            quiz.peers[i].answerRound = data.round;
                        }
                    }
                }
            });

            wqSocket.on('room:results', function (results) {
                var quiz = wqSession.get('quiz'),
                    round = results.round,
                    correct = results.correct,
                    histogram = results.histogram,
                    peers = results.peers,
                    preload = results.preload,
                    i,
                    j;

                if (!quiz) {
                    return interrupted();
                }

                // Load new images before the next question
                quiz.preload = preload;

                // Update the current question results
                if (quiz.question.round === round) {
                    quiz.question.histogram = histogram;
                    quiz.question.correct = correct;
                }

                // Update points
                for (i = 0; i < peers.length; i++) {
                    for (j = 0; j < quiz.peers.length; j++) {
                        if (peers[i].id === quiz.peers[j].id) {
                            quiz.peers[j].points = peers[i].points;
                            break;
                        }
                    }
                }

                // Update the  max points variable
                quiz.maxPoints = 0;
                for (i = 0; i < quiz.peers.length; i++) {
                    if (quiz.maxPoints < quiz.peers[i].points) {
                        quiz.maxPoints = quiz.peers[i].points;
                    }
                }
            });

        };
    }

    angular.module('wq.common').service('wqSocketHandler', [
        '$state',
        '$uibModalStack',
        'translateFilter',
        'wqDialog',
        'wqSession',
        'wqSocket',
        wqSocketHandler
    ]);
}());
