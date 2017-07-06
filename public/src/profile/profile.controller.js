(function () {
    'use strict';

    function wqProfileController(
        $scope,
        $state,
        $uibModal,
        wqSocket
    ) {
        var session = $scope.session,
            $ctrl = this;

        $ctrl.profile = {
            nick: '',
            avatar: null
        };

        $ctrl.setAvatar = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                controller: 'wqProfileSetAvatarController',
                controllerAs: '$ctrl',
                resolve: {
                    avatars: function () {
                        return session.quiz.avatars || [];
                    }
                },
                templateUrl: 'src/profile/setAvatar/setAvatar.html'
            });

            modalInstance.result.then(function (avatar) {
                $ctrl.profile.avatar = avatar;
            });
        };

        $ctrl.submitProfile = function (profile) {
            $scope.profileForm.$submitted = true;

            wqSocket.emit('server:profile', profile)
                .then(function () {
                    session.profile = profile;
                    $state.go('standings');
                })
                .catch(function () {
                    $ctrl.invalidNick = true;
                })
                .finally(function () {
                    $scope.profileForm.$submitted = false;
                });
        };
    }

    angular.module('wq.profile').controller('wqProfileController', [
        '$scope',
        '$state',
        '$uibModal',
        'wqSocket',
        wqProfileController
    ]);

}());
