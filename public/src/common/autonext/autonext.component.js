(function () {
    'use strict';

    function wqAutonextController(
        $scope,
        $interval,
        wqSession
    ) {
        var $ctrl = this,
            stop;

        $ctrl.value = wqSession.get('autonext');
        $ctrl.options = [-1, 5, 10, 15, 30, 60];

        function stopTimer() {
            if (stop) {
                $interval.cancel(stop);
                stop = 0;
            }
        }

        function restartTimer() {
            stopTimer();

            if ($ctrl.value <= 0) {
                return;
            }

            stop = $interval(function () {
                $ctrl.value--;

                if ($ctrl.value === 0) {
                    $ctrl.onStart();
                    stopTimer();
                    return;
                }
            }, 1000);
        }

        $ctrl.changeOption = function (option) {
            wqSession.set('autonext', option);
            $ctrl.value = option;
            restartTimer();
        };

        restartTimer();

        $scope.$on('$destroy', stopTimer);
    }

    angular.module('wq.common').component('wqAutonext', {
        templateUrl: 'src/common/autonext/autonext.html',
        transclude: true,
        controller: [
            '$scope',
            '$interval',
            'wqSession',
            wqAutonextController
        ],
        bindings: {
            onStart: '&'
        }
    });

}());
