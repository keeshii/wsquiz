(function () {
    "use strict";

    function wqQuestionFilter(
        $translate,
        wqSession
    ) {
        function getQuizDefaultLanguage() {
            var quiz;

            quiz = wqSession.get('quiz');
            if (!quiz) {
                return null;
            }

            if (!angular.isArray(quiz.languages)) {
                return null;
            }

            return quiz.languages[0] || null;
        }

        function getTranslatedText(input) {
            var defaultLanguage,
                currentLanguage;

            if (angular.isString(input)) {
                return input;
            }

            if (!angular.isObject(input)) {
                return '';
            }

            currentLanguage = $translate.use();
            if (input[currentLanguage]) {
                return input[currentLanguage];
            }

            defaultLanguage = getQuizDefaultLanguage();
            if (input[defaultLanguage]) {
                return input[defaultLanguage];
            }

            return '';
        }

        return function (input, imageUrl) {
            input = getTranslatedText(input);

            if (angular.isString(imageUrl)) {
                imageUrl = imageUrl.replace('"', '&quot;');
                input = '<img src="' + imageUrl + '"><br />' + input;
            }

            return input;
        };
    }

    angular.module('wq.question').filter('wqQuestion', [
        '$translate',
        'wqSession',
        wqQuestionFilter
    ]);

}());
