"use strict";

var io = require('socket.io');

function WebSocket() {
    this.io = null;
    this.listeners = [];
}

WebSocket.prototype.listen = function (httpServer) {
    var self = this;

    this.io = io.listen(httpServer);

    this.io.on('connection', function (socket) {
        var listener,
            i;

        function ackFn(message, fn) {
            this.callback(socket, message, function (status, data) {
                return fn && fn({status: status, data: data});
            });
        }

        for (i = 0; i < self.listeners.length; i++) {
            listener = self.listeners[i];
            socket.on(listener.message, ackFn.bind(listener));
        }
    });
};

WebSocket.prototype.addListener = function (message, callback) {
    this.listeners.push({
        message: message,
        callback: callback
    });
};

module.exports = new WebSocket();
