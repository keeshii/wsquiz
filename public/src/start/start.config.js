(function () {
    'use strict';

    function StartConfig(
        $cookiesProvider,
        $stateProvider
    ) {
        var expires = new Date();

        // Add one month from now
        expires.setMonth(expires.getMonth() + 1);
        $cookiesProvider.defaults.expires = expires;

        $stateProvider.state('start', {
            controller: 'wqStartController',
            controllerAs : '$ctrl',
            pageTitle: 'Start',
            templateUrl: "src/start/start.html",
            url: "/start"
        });
    }

    angular.module('wq.start', []).config([
        '$cookiesProvider',
        '$stateProvider',
        StartConfig
    ]);

}());
