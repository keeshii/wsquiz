# Websocket Quiz

Realtime quiz client written in node.js and websockets. It is extremly simple to
use and configure. Many people are joining to the same quiz and compete each
other at the same time. Such quiz may be a good addition at the end of a
workshop or it can be used at school.

To get a better overview of this project, you can try visit the demo page
given below. To start the sample quiz use the code: `sample`.

* Demo page: [http://ryuu.eu:1521](http://ryuu.eu:1521)
* Code: `sample`

## Usage

### Pre-Requisites

* NodeJs version at least 4.6.x.
* Reasonable amount of RAM. 

The system may host multiple quiz instances at the same time, and it doesn't use
any external databse to store data. Everything is kept in the memory.

Supported browsers:
* Internet Explorer 10
* Firefox 45
* Chrome 49
* Safari 9.3

### Configuring

1. Check and update the file `server/config.js` according to your needs.

2. Run `npm install --production`

3. Run `npm start`

If everything is working properly, the server should listen on
`http://localhost:8080/` and you should be able to start our basic quiz with
code `sample`.

### Adding new quizes

1. Make an another copy of file `server/quizes/sample-quiz.js`

2. Read the comments and change the questions.

3. Don't forget to change the `startCode` property as well. This code is used
to start the quiz.

4. Copy images and other static files into folder `public/images/<quiz-name>/`

5. Restart the server.

### Local development

If you wish to make changes in the source code and contribute to this project,
you problably would like to clone this git repository. The following commands
will help you setup the project in the development mode:

1. Run as root:
* `npm install -g grunt-cli`
* `npm install -g bower`

2. Run as user:
* `npm install`
* `bower install`
* `grunt debug`

3. To prepare a package that could be copied to server use:
* `grunt release`

## License

MIT
