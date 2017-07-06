"use strict";

var express = require('express'),
    config = require('./config'),
    ws = require('./common/ws'),
    quizes = require('./common/quizes');

function App() {
    this.app = express();
    this.config = config;

    this.loadStatic = function (dir) {
        this.app.use(express.static(dir));
    };

    this.loadWsHandlers = function () {
        ws.addListener('disconnect', require('./ws/disconnect'));
        ws.addListener('server:code', require('./ws/code'));
        ws.addListener('server:profile', require('./ws/profile'));
        ws.addListener('server:next', require('./ws/next'));
        ws.addListener('server:answer', require('./ws/answer'));
    };

    this.loadQuizes = function () {
        /*jslint nomen: true*/
        var path = require("path").join(__dirname, "quizes");
        /*jslint nomen: false*/

        // Load all files inside the directory "quizes"
        require("fs").readdir(path, function (err, files) {
            files.forEach(function (file) {
                var quizName = file.replace(/\.js$/, '');
                quizes.defineQuiz(require('./quizes/' + quizName));
            });
        });
    };

    this.listen = function () {
        var httpServer;

        httpServer = this.app.listen(config.PORT, config.ADDRESS, function () {
            console.log('Listening on port ' + config.PORT + '!');
        });

        ws.listen(httpServer);
    };
}

module.exports = new App();
