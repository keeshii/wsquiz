(function () {
    'use strict';

    function wqConfig(
        $compileProvider,
        $translateProvider,
        $urlRouterProvider
    ) {
        $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise("/start");

        $translateProvider
            .fallbackLanguage('en')
            .determinePreferredLanguage()
            .useSanitizeValueStrategy('escapeParameters')
            .useStaticFilesLoader({
                prefix: '/languages/',
                suffix: '.json'
            });
    }

    function wqRun(
        $transitions,
        $uibModalStack,
        wqSession,
        wqSocket,
        wqSocketHandler
    ) {
        wqSession.init();
        wqSocket.init();
        wqSocketHandler.init();

        $transitions.onStart({}, function (trans) {
            var toState = trans.$to();

            $uibModalStack.dismissAll();

            if (
                toState.name !== 'start'
                    && toState.name !== 'interrupted'
                    && !wqSession.get('quiz')
            ) {
                return trans.router.stateService.target('start');
            }
        });
    }

    angular.module('wq', [
        'btford.socket-io',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.router',
        'wq.common',
        'wq.model',
        'wq.profile',
        'wq.question',
        'wq.standings',
        'wq.start'
    ]).config([
        '$compileProvider',
        '$translateProvider',
        '$urlRouterProvider',
        wqConfig
    ]).run([
        '$transitions',
        '$uibModalStack',
        'wqSession',
        'wqSocket',
        'wqSocketHandler',
        wqRun
    ]);

}());
