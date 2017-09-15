/* global window, define, browser, support */
/* eslint-disable no-multi-assign */

var log = function () {
    log.info.apply(log, Array.prototype.slice.call(arguments));
};

log.setColor = function (enable) {
    this.cssColor = false;
    if (enable && (typeof require === 'function') && (typeof window === 'undefined') && (typeof process !== 'undefined') && process.platform !== 'win32') {
        const ansi = require('ansi-styles');
        this.map = {
            debug: ansi.bgBlue.open +
                    '<debug>' +
                    ansi.bgBlue.close,

            info: ansi.black.open +
                    ansi.bgGreen.open +
                    '<info> ' +
                    ansi.bgGreen.close +
                    ansi.black.close,

            warn: ansi.black.open +
                    ansi.bgYellow.open +
                    '<warn> ' +
                    ansi.bgYellow.close +
                    ansi.black.close,

            error: ansi.white.open +
                    ansi.bold.open +
                    ansi.bgRed.open +
                    '<error>' +
                    ansi.bgRed.close +
                    ansi.bold.close +
                    ansi.white.close
        };
    } else if (enable && (((typeof window !== 'undefined') && window.chrome) || ((typeof browser !== 'undefined') && browser.isFirefox && (typeof support !== 'undefined') && support.modifiedConsole))) {
        this.map = {
            debug: '%c<debug>',
            info: '%c<info> ',
            warn: '%c<warn> ',
            error: '%c<error>'
        };
        this.mapCss = {
            debug: 'background: blue; color: white',
            info: 'background: lime; color: black',
            warn: 'background: yellow; color: black',
            error: 'background: red; color: white; font-weight: bold'
        };
        this.cssColor = true;
    } else {
        this.map = {
            debug: '<debug>',
            info: '<info> ',
            warn: '<warn> ',
            error: '<error>'
        };
    }
};

log.setTimestamp = function (enable) {
    this.timestamp = Boolean(enable);
};

log.setSeverity = function (enable) {
    this.severity = Boolean(enable);
};

log._dummy = function () {};

log.stdout = console.log;
log.stderr = console.error;
log.stdwrn = (typeof console.warn === 'function') ? console.warn : console.log;

log._debug = function () {
    var args = Array.prototype.slice.call(arguments);
    var prefix = '';
    if (typeof arguments[0] === 'string') {
        // Preserves behaiviour in case of printf-like strings: "blabla count: %d - yeah!"
        if (this.cssColor) {
            if (this.timestamp) {
                prefix += this.ts();
            }
            if (this.severity) {
                prefix = [prefix, log.map.debug].join(' ');
                args.unshift(this.mapCss.debug);
            }
        } else {
            if (this.timestamp) {
                prefix += this.ts() + ' ';
            }
            if (this.severity) {
                prefix += log.map.debug + ' ';
            }
        }
        arguments[0] = prefix + arguments[0];
        this.stdout.apply(console, arguments);
    } else {
        // Takes care of any other case
        // https://gist.github.com/robatron/5681424
        if (this.cssColor) {
            if (this.timestamp) {
                prefix += this.ts();
            }
            if (this.severity) {
                prefix = [prefix, log.map.debug].join(' ');
                args.unshift(this.mapCss.debug);
            }
            args.unshift(prefix);
        } else {
            if (this.severity) {
                args.unshift(log.map.debug);
            }
            if (this.timestamp) {
                args.unshift(this.ts());
            }
        }
        this.stdout.apply(console, args);
    }
};
log._info = function () {
    var args = Array.prototype.slice.call(arguments);
    var prefix = '';
    if (typeof arguments[0] === 'string') {
        // Preserves behaiviour in case of printf-like strings: "blabla count: %d - yeah!"
        if (this.cssColor) {
            if (this.timestamp) {
                prefix += this.ts();
            }
            if (this.severity) {
                prefix = [prefix, log.map.info].join(' ');
                args.unshift(this.mapCss.info);
            }
        } else {
            if (this.timestamp) {
                prefix += this.ts() + ' ';
            }
            if (this.severity) {
                prefix += log.map.info + ' ';
            }
        }
        arguments[0] = prefix + arguments[0];
        this.stdout.apply(console, arguments);
    } else {
        // Takes care of any other case
        // https://gist.github.com/robatron/5681424
        if (this.cssColor) {
            if (this.timestamp) {
                prefix += this.ts();
            }
            if (this.severity) {
                prefix = [prefix, log.map.info].join(' ');
                args.unshift(this.mapCss.info);
            }
            args.unshift(prefix);
        } else {
            if (this.severity) {
                args.unshift(log.map.info);
            }
            if (this.timestamp) {
                args.unshift(this.ts());
            }
        }
        this.stdout.apply(console, args);
    }
};
log._warn = function () {
    var args = Array.prototype.slice.call(arguments);
    var prefix = '';
    if (typeof arguments[0] === 'string') {
        // Preserves behaiviour in case of printf-like strings: "blabla count: %d - yeah!"
        if (this.cssColor) {
            if (this.timestamp) {
                prefix += this.ts();
            }
            if (this.severity) {
                prefix = [prefix, log.map.warn].join(' ');
                args.unshift(this.mapCss.warn);
            }
        } else {
            if (this.timestamp) {
                prefix += this.ts() + ' ';
            }
            if (this.severity) {
                prefix += log.map.warn + ' ';
            }
        }
        arguments[0] = prefix + arguments[0];
        this.stdout.apply(console, arguments);
    } else {
        // Takes care of any other case
        // https://gist.github.com/robatron/5681424
        if (this.cssColor) {
            if (this.timestamp) {
                prefix += this.ts();
            }
            if (this.severity) {
                prefix = [prefix, log.map.warn].join(' ');
                args.unshift(this.mapCss.warn);
            }
            args.unshift(prefix);
        } else {
            if (this.severity) {
                args.unshift(log.map.warn);
            }
            if (this.timestamp) {
                args.unshift(this.ts());
            }
        }
        this.stdwrn.apply(console, args);
    }
};

log._error = function () {
    var args = Array.prototype.slice.call(arguments);
    var prefix = '';
    if (typeof arguments[0] === 'string') {
        // Preserves behaviour in case of printf-like strings: "blabla count: %d - yeah!"
        if (this.cssColor) {
            if (this.timestamp) {
                prefix += this.ts();
            }
            if (this.severity) {
                prefix = [prefix, log.map.error].join(' ');
                args.unshift(this.mapCss.error);
            }
        } else {
            if (this.timestamp) {
                prefix += this.ts() + ' ';
            }
            if (this.severity) {
                prefix += log.map.error + ' ';
            }
        }
        arguments[0] = prefix + arguments[0];
        this.stdout.apply(console, arguments);
    } else {
        // Takes care of any other case
        // https://gist.github.com/robatron/5681424
        if (this.cssColor) {
            if (this.timestamp) {
                prefix += this.ts();
            }
            if (this.severity) {
                prefix = [prefix, log.map.error].join(' ');
                args.unshift(this.mapCss.error);
            }
            args.unshift(prefix);
        } else {
            if (this.severity) {
                args.unshift(log.map.error);
            }
            if (this.timestamp) {
                args.unshift(this.ts());
            }
        }
        this.stderr.apply(console, args);
    }
};
log.ts = function () {
    const d = new Date();
    return d.getFullYear() + '-' +
        ('0' + (d.getMonth() + 1).toString(10)).slice(-2) + '-' +
        ('0' + (d.getDate()).toString(10)).slice(-2) + ' ' +
        ('0' + (d.getHours()).toString(10)).slice(-2) + ':' +
        ('0' + (d.getMinutes()).toString(10)).slice(-2) + ':' +
        ('0' + (d.getSeconds()).toString(10)).slice(-2) + '.' +
        ('00' + (d.getMilliseconds()).toString(10)).slice(-3);
};
log.setLevel = function (lvl) {
    if (lvl === 4 || lvl === 'debug' || lvl === 'all') {
        this.err = this.error = this._error;
        this.warn = this.warning = this._warn;
        this.info = this.log = this._info;
        this.debug = this._debug;
    } else if (lvl === 2 || lvl === 'warn' || lvl === 'warning') {
        this.err = this.error = this._error;
        this.warn = this.warning = this._warn;
        this.info = this.log = this._dummy;
        this.debug = this._dummy;
    } else if (lvl === 1 || lvl === 'err' || lvl === 'error') {
        this.err = this.error = this._error;
        this.warn = this.warning = this._dummy;
        this.info = this.log = this._dummy;
        this.debug = this._dummy;
    } else if (lvl === 0 || lvl === 'silent' || lvl === 'quiet') {
        this.err = this.error = this._dummy;
        this.warn = this.warning = this._dummy;
        this.info = this.log = this._dummy;
        this.debug = this._dummy;
    } else { // Default: lvl 3 'info', all except debug
        this.err = this.error = this._error;
        this.warn = this.warning = this._warn;
        this.info = this.log = this._info;
        this.debug = this._dummy;
    }
};

// Set defaults
log.setColor(true);
log.setTimestamp(true);
log.setSeverity(true);
log.setLevel('info');

if (typeof define === 'function' && define.amd) {
    // Export as AMD module
    define(log);
} else if (typeof module === 'undefined') {
    window.log = log;
} else {
    // Export as node module
    module.exports = log;
}
