(function () {
    'use strict';

    function QuestionConfig(
        $stateProvider
    ) {
        $stateProvider.state('question', {
            controller: 'wqQuestionController',
            controllerAs : '$ctrl',
            pageTitle: 'Question',
            params: {question: 'none'},
            templateUrl: "src/question/question.html",
            url: "/question"
        });
    }

    angular.module('wq.question', []).config([
        '$stateProvider',
        QuestionConfig
    ]);

}());
