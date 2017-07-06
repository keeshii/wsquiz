(function () {
    'use strict';

    function wqProfileSetAvatarController(
        avatars
    ) {
        var $ctrl = this;
        $ctrl.avatars = avatars;
    }

    angular.module('wq.profile').controller('wqProfileSetAvatarController', [
        'avatars',
        wqProfileSetAvatarController
    ]);

}());
