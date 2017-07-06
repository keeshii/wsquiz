(function () {
    'use strict';

    function wqSocket(
        $q,
        $window,
        socketFactory
    ) {

        var TIMEOUT = 3000,
            socket;

        this.init = function () {
            var ioSocket;

            ioSocket = $window.io.connect();

            socket = socketFactory({
                ioSocket: ioSocket
            });

            this.on = socket.addListener.bind(socket);

            this.off = socket.removeListener.bind(socket);
        };

        this.emit = function (message, data) {
            var deferred = $q.defer();

            socket.emit(message, data, function (response) {
                if (response && response.status === 'error') {
                    deferred.reject(response.data);
                    return;
                }
                deferred.resolve(response);
            });

            $window.setTimeout(function () {
                deferred.reject('TIMEOUT');
            }, TIMEOUT);

            return deferred.promise;
        };
    }

    angular.module('wq.common').service('wqSocket', [
        '$q',
        '$window',
        'socketFactory',
        wqSocket
    ]);
}());
