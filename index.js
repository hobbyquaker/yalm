var log = function () {
    log.info.apply(log, Array.prototype.slice.call(arguments));
};

var ansi = require('ansi-styles');

log.setColor = function (enable) {
    if (enable) {
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

            error:  ansi.black.open +
                    ansi.bold.open +
                    ansi.bgRed.open +
                    '<error>' +
                    ansi.bgRed.close +
                    ansi.bold.close +
                    ansi.black.close
        };
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
log._debug = function () {
    var args = Array.prototype.slice.call(arguments);
    if (this.severity) args.unshift(log.map.debug);
    if (this.timestamp) args.unshift(this.ts());
    console.log.apply(console, args);
};
log._info = function () {
    var args = Array.prototype.slice.call(arguments);
    if (this.severity) args.unshift(log.map.info);
    if (this.timestamp) args.unshift(this.ts());
    console.log.apply(console, args);
};
log._warn = function () {
    var args = Array.prototype.slice.call(arguments);
    if (this.severity) args.unshift(log.map.warn);
    if (this.timestamp) if (this.timestamp) args.unshift(this.ts());
    console.log.apply(console, args);
};
log._error = function () {
    var args = Array.prototype.slice.call(arguments);
    if (this.severity) args.unshift(log.map.error);
    if (this.timestamp) args.unshift(this.ts());
    console.error.apply(console, args);
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
log.setColor(process.platform !== 'win32');
log.setTimestamp(true);
log.setSeverity(true);
log.setLevel('info');

module.exports = log;