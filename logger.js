'use strict';

/* eslint-disable */
const colors = require('colors');
/* eslint-enable */

class Logger {
  static logerr(msg) {
    const now = new Date().toString();
    const fmtString = `[Server][ERROR][${now}]`;
    console.log(fmtString.red, msg);
  }

  static loginfo(msg) {
    const now = new Date().toString();
    const fmtString = `[Server][INFO][${now}]`;
    console.log(fmtString.green, msg);
  }

  static logwarn(msg) {
    const now = new Date().toString();
    const fmtString = `[Server][WARN][${now}]`;
    console.log(fmtString.yellow, msg);
  }
}

module.exports = Logger;
