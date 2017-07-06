(function () {
    'use strict';

    function ProfileConfig(
        $stateProvider
    ) {
        $stateProvider.state('profile', {
            controller: 'wqProfileController',
            controllerAs : '$ctrl',
            pageTitle: 'Profile',
            templateUrl: "src/profile/profile.html",
            url: "/profile"
        });
    }

    angular.module('wq.profile', []).config([
        '$stateProvider',
        ProfileConfig
    ]);

}());
