"use strict";

function pad(value, len) {
    var str = value.toString();

    if (len === undefined) {
        len = 2;
    }

    while (str.length < len) {
        str = "0" + str;
    }

    return str;
}

module.exports = pad;
