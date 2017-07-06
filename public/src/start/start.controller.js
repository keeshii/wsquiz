(function () {
    'use strict';

    function wqStartController(
        $scope,
        $state,
        $translate,
        QuizModel,
        wqSocket
    ) {
        var session = $scope.session,
            $ctrl = this;

        function updateQuizLanguage(quiz) {
            var lang = $translate.preferredLanguage(),
                current = $translate.use();

            // Change language if not supprted by quiz
            if (quiz &&
                    quiz.languages &&
                    quiz.languages.indexOf(lang) === -1) {
                lang = quiz.languages[0];
            }

            if (lang !== current) {
                $translate.use(lang);
            }
        }

        updateQuizLanguage();

        function onResponse(response) {
            var quizJson = response.data;

            switch (response.status) {
            case 'host':
                session.quiz = new QuizModel(quizJson);
                session.isHost = true;
                updateQuizLanguage(session.quiz);
                $state.go('standings');
                break;
            case 'peer':
                session.quiz = new QuizModel(quizJson);
                session.isHost = false;
                updateQuizLanguage(session.quiz);
                $state.go('profile');
                break;
            }
        }

        $ctrl.enterQuiz = function (code) {
            $scope.startForm.$submitted = true;

            wqSocket.emit('server:code', code)
                .then(onResponse)
                .catch(function () {
                    $ctrl.invalidCode = true;
                })
                .finally(function () {
                    $scope.startForm.$submitted = false;
                });
        };
    }

    angular.module('wq.start').controller('wqStartController', [
        '$scope',
        '$state',
        '$translate',
        'QuizModel',
        'wqSocket',
        wqStartController
    ]);

}());
