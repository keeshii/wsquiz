(function () {
    'use strict';

    function wqSession(
        $rootScope,
        SessionModel
    ) {
        var session;

        this.set = function (key, value) {
            session[key] = value;
        };

        this.get = function (key) {
            return session[key];
        };

        this.init = function () {
            session = new SessionModel();
            $rootScope.session = session;
        };
    }

    angular.module('wq.common').service('wqSession', [
        '$rootScope',
        'SessionModel',
        wqSession
    ]);

}());
