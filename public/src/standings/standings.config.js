(function () {
    'use strict';

    function StandingsConfig(
        $stateProvider
    ) {
        $stateProvider.state('standings', {
            controller: 'wqStandingsController',
            controllerAs : '$ctrl',
            pageTitle: 'Standings',
            templateUrl: "src/standings/standings.html",
            url: "/standings"
        });
    }

    angular.module('wq.standings', []).config([
        '$stateProvider',
        StandingsConfig
    ]);

}());
