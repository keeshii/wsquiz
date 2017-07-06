(function () {
    'use strict';

    function SessionModelFactory() {

        function SessionModel(json) {
            this.autonext = -1;
            this.quiz = null;
            this.profile = null;
            this.isHost = false;
        }

        return SessionModel;
    }

    angular.module('wq.model').factory('SessionModel', [
        SessionModelFactory
    ]);

}());
