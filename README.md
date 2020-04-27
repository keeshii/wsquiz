# Websocket Quiz

Realtime quiz client written in node.js and websockets. It is extremly simple to
use and configure. Many people are joining to the same quiz and compete each
other at the same time. Such quiz may be a good addition at the end of a
workshop or it can be used at school.

To get a better overview of this project, you can try visit the demo page
given below. To start the sample quiz use the code: `sample`.

* Demo page: [https://quiz.ryuu.eu](https://quiz.ryuu.eu)
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

### Setup for production

1. Download package from [releases](https://github.com/keeshii/wsquiz/releases).

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
will help you setup the environment for the development:

1. Install stuff
```
npm install
npx bower instal
```

2. Compile and run the package in debug mode (not minified sources).
```
npx grunt debug
npm start
```

3. Or test the application in the production mode.
```
npx grunt
npm start
```

4. To prepare a package that could be copied to server use:
```
npx grunt release
```

## License

MIT
