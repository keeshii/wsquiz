(function () {
    'use strict';

    function wqQuestionSummaryController(
        $scope,
        $state
    ) {
        var $ctrl = this;

        $ctrl.goToStandings = function () {
            $state.go('standings');
        };

        function buildSummary() {
            if (!$scope.session.quiz.question) {
                return [];
            }

            var question = $scope.session.quiz.question,
                histogram = question.histogram,
                answers = question.answers,
                correct = question.correct,
                summary = [],
                width,
                max = 0,
                i;

            for (i = 0; i < answers.length; i++) {
                if (histogram[i] && histogram[i] > max) {
                    max = histogram[i];
                }
            }

            for (i = 0; i < answers.length; i++) {

                width = 0;
                if (max !== 0) {
                    width = 100 * (histogram[i] || 0) / max + '%';
                }

                summary.push({
                    text: answers[i],
                    count: histogram[i] || 0,
                    correct: correct === i,
                    width: width
                });
            }

            return summary;
        }

        $ctrl.summary = buildSummary();
    }

    angular.module('wq.question').controller('wqQuestionSummaryController', [
        '$scope',
        '$state',
        wqQuestionSummaryController
    ]);

}());
