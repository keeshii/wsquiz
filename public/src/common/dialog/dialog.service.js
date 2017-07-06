(function () {
    'use strict';

    function wqDialogService(
        $uibModal,
        translateFilter
    ) {
        function dialog(title, message) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'src/common/dialog/dialog.html',
                size: null,
                controller: ['$scope', function ($scope) {
                    $scope.title = title;
                    $scope.message = message;
                }]
            });
            return modalInstance.result;
        }

        this.info = function (message) {
            return dialog(translateFilter('COM_INFO_HEADER'), message);
        };

        this.error = function (message) {
            return dialog(translateFilter('COM_ERROR_HEADER'), message);
        };

        this.confirm = function (message) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'src/common/dialog/confirm.html',
                size: null,
                controller: ['$scope', function ($scope) {
                    $scope.title = translateFilter('COM_CONFIRM_HEADER');
                    $scope.message = message;
                }]
            });
            return modalInstance.result;
        };

        this.countdown = function (miliseconds) {
            var DEFAULT_SECONDS = 3000;
            return $uibModal.open({
                animation: true,
                backdrop: false,
                controller: ['$scope', function ($scope) {
                    $scope.start = miliseconds || DEFAULT_SECONDS;
                }],
                keyboard: false,
                templateUrl: 'src/common/dialog/countdown.html',
                windowClass: 'c-fullmodal'
            }).result;
        };
    }

    angular.module('wq.common').service('wqDialog', [
        '$uibModal',
        'translateFilter',
        wqDialogService
    ]);

}());
