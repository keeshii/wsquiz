(function () {
    'use strict';

    function wqQuestionController(
        $scope,
        $uibModal,
        wqSocket
    ) {
        var $ctrl = this;

        $ctrl.sendAnswer = function (answer) {
            var round = $scope.session.quiz.question.round;

            if ($scope.session.isHost || $ctrl.answer !== undefined) {
                return;
            }

            $ctrl.answer = answer;

            wqSocket.emit('server:answer', {
                round: round,
                answer: answer
            });
        };

        $scope.$watch('session.quiz.question.correct', function (correct) {
            if (correct === undefined) {
                return;
            }

            $uibModal.open({
                backdrop: false,
                bindToController: true,
                controller: 'wqQuestionSummaryController',
                controllerAs: '$ctrl',
                keyboard: false,
                templateUrl: 'src/question/summary/summary.html',
                windowClass: 'c-fullmodal'
            }).rendered.then(function () {
                $ctrl.answer = undefined;
            });
        });
    }

    angular.module('wq.question').controller('wqQuestionController', [
        '$scope',
        '$uibModal',
        'wqSocket',
        wqQuestionController
    ]);

}());
