(function () {
    'use strict';

    function wqPreloaderController(
        $document,
        $scope
    ) {
        var cache;

        function preload(images) {
            var i;

            if (!angular.isArray(images)) {
                return;
            }

            cache = [];
            for (i = 0; i < images.length; i++) {
                cache[i] = $document[0].createElement('img');
                cache[i].src = images[i];
            }
        }

        $scope.$watch('$ctrl.images', function (images) {
            preload(images);
        });
    }

    angular.module('wq.common').component('wqPreloader', {
        controller: [
            '$document',
            '$scope',
            wqPreloaderController
        ],
        bindings: {
            images: '<'
        }
    });

}());
