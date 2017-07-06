(function () {
    'use strict';

    function wqStandingsController(
        $location,
        $scope,
        $state,
        wqDialog,
        wqSocket
    ) {
        var $ctrl = this;

        function getHostName() {
            var protocol = $location.protocol(),
                host = $location.host(),
                port = $location.port();
            if (protocol === 'http' && port === 80) {
                return host;
            }
            if (protocol === 'https' && port === 443) {
                return 'https://' + host;
            }
            if (protocol === 'http') {
                return host + ':' + port;
            }
            return protocol + '://' + host + ':' + port;
        }

        $ctrl.host = getHostName();
        $ctrl.hasStarted = $scope.session.quiz.hasStarted();
        $ctrl.isFinished = $scope.session.quiz.isFinished();

        $ctrl.returnToStart = function () {
            $state.go('start');
        };

        $ctrl.nextRound = function () {
            $scope.standingsForm.$submitted = true;
            wqSocket.emit('server:next')
                .catch(function () {
                    wqDialog.error('Error occured. Please try again.');
                }).finally(function () {
                    $scope.standingsForm.$submitted = false;
                });
        };
    }

    angular.module('wq.standings').controller('wqStandingsController', [
        '$location',
        '$scope',
        '$state',
        'wqDialog',
        'wqSocket',
        wqStandingsController
    ]);

}());
