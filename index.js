var log = function () {
    log.info.apply(log, Array.prototype.slice.call(arguments));
};

log.setColor = function (enable) {
    this.cssColor = false;
    if (enable && (typeof require === 'function') && (typeof window === 'undefined') && (typeof process !== 'undefined') && process.platform !== 'win32') {
        var ansi = require('ansi-styles');
        this.map = {
            debug:  ansi.bgBlue.open +
                    '<debug>' +
                    ansi.bgBlue.close,

            info:   ansi.black.open +
                    ansi.bgGreen.open +
                    '<info> ' +
                    ansi.bgGreen.close +
                    ansi.black.close,

            warn:   ansi.black.open +
                    ansi.bgYellow.open +
                    '<warn> ' +
                    ansi.bgYellow.close +
                    ansi.black.close,

            error:  ansi.white.open +
                    ansi.bold.open +
                    ansi.bgRed.open +
                    '<error>' +
                    ansi.bgRed.close +
                    ansi.bold.close +
                    ansi.white.close
        };
    } else if (enable && (((typeof window !== 'undefined') && window.chrome) || ((typeof browser !== 'undefined') && browser.isFirefox && (typeof support !== 'undefined') && support.modifiedConsole))) {
        this.map = {
            debug:  '%c<debug>',
            info:   '%c<info> ',
            warn:   '%c<warn> ',
            error:  '%c<error>'
        };
        this.mapCss = {
            debug:  'background: blue; color: white',
            info:   'background: lime; color: black',
            warn:   'background: yellow; color: black',
            error:  'background: red; color: white; font-weight: bold'
        };
        this.cssColor = true;
    } else {
        this.map = {
            debug:  '<debug>',
            info:   '<info> ',
            warn:   '<warn> ',
            error:  '<error>'
        }
    }
};

log.setTimestamp = function (enable) {
    this.timestamp = !!enable;
};

log.setSeverity = function (enable) {
    this.severity = !!enable;
};

log._dummy = function () {};

log.stdout = console.log;
log.stderr = console.error;
log.stdwrn = (typeof console.warn === 'function') ? console.warn : console.log;


log._debug = function () {
    var args = Array.prototype.slice.call(arguments);
    if (this.cssColor) {
        var prefix = '';
        if (this.timestamp) prefix += this.ts();
        if (this.severity) {
            prefix = [prefix, log.map.debug].join(' ');
            args.unshift(this.mapCss.debug);
        }
        args.unshift(prefix);
    } else {
        if (this.severity) args.unshift(log.map.debug);
        if (this.timestamp) args.unshift(this.ts());
    }
    this.stdout.apply(console, args);
};
log._info = function () {
    var args = Array.prototype.slice.call(arguments);
    if (this.cssColor) {
        var prefix = '';
        if (this.timestamp) prefix += this.ts();
        if (this.severity) {
            prefix = [prefix, log.map.info].join(' ');
            args.unshift(this.mapCss.info);
        }
        args.unshift(prefix);
    } else {
        if (this.severity) args.unshift(log.map.info);
        if (this.timestamp) args.unshift(this.ts());
    }
    this.stdout.apply(console, args);
};
log._warn = function () {
    var args = Array.prototype.slice.call(arguments);
    if (this.cssColor) {
        var prefix = '';
        if (this.timestamp) prefix += this.ts();
        if (this.severity) {
            prefix = [prefix, log.map.warn].join(' ');
            args.unshift(this.mapCss.warn);
        }
        args.unshift(prefix);
    } else {
        if (this.severity) args.unshift(log.map.warn);
        if (this.timestamp) args.unshift(this.ts());
    }
    log.stdwrn.apply(console, args);
};

log._error = function () {
    var args = Array.prototype.slice.call(arguments);
    if (this.cssColor) {
        var prefix = '';
        if (this.timestamp) prefix += this.ts();
        if (this.severity) {
            prefix = [prefix, log.map.error].join(' ');
            args.unshift(this.mapCss.error);
        }
        args.unshift(prefix);
    } else {
        if (this.severity) args.unshift(log.map.error);
        if (this.timestamp) args.unshift(this.ts());
    }
    this.stderr.apply(console, args);
};
log.ts = function () {
    var d = new Date();
    return d.getFullYear() + '-' +
        ("0" + (d.getMonth() + 1).toString(10)).slice(-2) + '-' +
        ("0" + (d.getDate()).toString(10)).slice(-2) + ' ' +
        ("0" + (d.getHours()).toString(10)).slice(-2) + ':' +
        ("0" + (d.getMinutes()).toString(10)).slice(-2) + ':' +
        ("0" + (d.getSeconds()).toString(10)).slice(-2) + '.' +
        ("00" + (d.getMilliseconds()).toString(10)).slice(-3);
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
    } else { // default: lvl 3 'info', all except debug
        this.err = this.error = this._error;
        this.warn = this.warning = this._warn;
        this.info = this.log = this._info;
        this.debug = this._dummy;
    }
};

// set defaults
log.setColor(true);
log.setTimestamp(true);
log.setSeverity(true);
log.setLevel('info');

if (typeof define === 'function' && define.amd) {
    // export as AMD module
    define(log);
} else if (typeof module !== 'undefined') {
    // export as node module
    module.exports = log;
} else {
    window.log = log;
}
