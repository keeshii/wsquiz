(function () {
    'use strict';

    function wqTimebarController(
        $scope,
        $interval
    ) {
        var $ctrl = this,
            INTERVAL_STEP = 100,
            stop;

        $ctrl.current = $ctrl.start;
        $ctrl.left = Math.floor($ctrl.current / 1000);

        stop = $interval(function () {
            $ctrl.current -= INTERVAL_STEP;

            if ($ctrl.current < 0) {
                $interval.cancel(stop);
                return;
            }

            $ctrl.left = Math.floor($ctrl.current / 1000);
        }, INTERVAL_STEP);

        $scope.$on('$destroy', function () {
            $interval.cancel(stop);
        });
    }

    angular.module('wq.common').component('wqTimebar', {
        templateUrl: 'src/common/timebar/timebar.html',
        transclude: true,
        controller: [
            '$scope',
            '$interval',
            wqTimebarController
        ],
        bindings: {
            start: '<',
            left: '=?'
        }
    });

}());
