"use strict";

var Quiz = require('../models/quiz');


function SampleQuiz() {
    Quiz.call(this);
    this.title = 'Sample Quiz';

    // Time to answer
    this.answerTime = 20 * 1000; // 10 sec

    // Supported languages
    this.languages = ['en', 'pl'];

    this.avatars = [
        'images/sample-quiz/avatar-01.svg',
        'images/sample-quiz/avatar-02.svg',
        'images/sample-quiz/avatar-03.svg',
        'images/sample-quiz/avatar-04.svg',
        'images/sample-quiz/avatar-05.svg',
        'images/sample-quiz/avatar-06.svg',
        'images/sample-quiz/avatar-07.svg',
        'images/sample-quiz/avatar-08.svg'
    ];

    this.questions = [
        // Question 1 - simple answers
        {
            text: {
                en: 'Which programming language is the greatest?',
                pl: 'Który język programowania jest najlepszy?'
            },
            image: 'images/sample-quiz/language.jpeg',
            answers: [
                'C#',
                'Python',
                'Java',
                'JavaScript'
            ],
            correct: 3
        },

        // Question 2 - images in the answers
        {
            text: {
                en: 'Which browser should be permanently banned and forgotten?',
                pl: 'Która przeglądarka powinna być zbanowana i zapomniana?'
            },
            image: 'images/sample-quiz/browsers.jpeg',
            answers: [
                {
                    image: 'images/sample-quiz/chrome.jpeg',
                    en: 'Google Chrome'
                }, {
                    image: 'images/sample-quiz/firefox.jpeg',
                    en: 'Mozilla Firefox'
                }, {
                    image: 'images/sample-quiz/ie.jpeg',
                    en: 'Internet Explorer'
                }, {
                    image: 'images/sample-quiz/opera.jpeg',
                    en: 'Opera'
                }, {
                    image: 'images/sample-quiz/safari.jpeg',
                    en: 'Safari'
                }
            ],
            correct: 2
        },

        // Question 3 - common answers to all languages
        {
            text: {
                en: 'What can be found in a modern website?',
                pl: 'Co można znaleźć w nowoczesnych stronach internetowych?'
            },
            image: 'images/sample-quiz/framework.png',
            answers: [
                'Adobe Flash',
                'Angular JS',
                'JQuery UI',
                'Silverlight'
            ],
            correct: 1
        }
    ];

}

SampleQuiz.prototype = Object.create(Quiz.prototype);
SampleQuiz.prototype.constructor = SampleQuiz;

SampleQuiz.startCode = 'sample';


module.exports = SampleQuiz;
