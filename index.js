module.exports = {
    loglevel: 'debug',
    color: true,
    timestamp: true,
    severity: true,
    c: {
        red: '\x1b[31m',
        yellow: '\x1b[33m',
        green: '\x1b[32m',
        inverse: '\x1b[7m',
        'default': '\x1b[0m'
    },
    debug: function () {
        var args = Array.prototype.slice.call(arguments);
        if (this.loglevel !== 'info' && this.loglevel !== 'warn' && this.loglevel !== 'error') {
            if (this.severity) args.unshift('<' + (this.color ? this.c.inverse : '') + 'debug' + (this.color ? this.c.default : '') + '>');
            if (this.timestamp) args.unshift(this.ts());
            console.log.apply(console, args);
        }
    },
    info: function () {
        var args = Array.prototype.slice.call(arguments);
        if (this.loglevel !== 'warn' && this.loglevel !== 'error') {
            if (this.severity) args.unshift('<info> ');
            if (this.timestamp) args.unshift(this.ts());
            console.log.apply(console, args);
        }
    },
    warn: function () {
        var args = Array.prototype.slice.call(arguments);
        if (this.loglevel !== 'error') {
            if (this.severity) args.unshift((this.color ? this.c.yellow : '') + '<warn> ' + (this.color ? this.c.default : ''));
            if (this.timestamp) if (this.timestamp) args.unshift(this.ts());
            console.log.apply(console, args);
        }
    },
    error: function () {
        var args = Array.prototype.slice.call(arguments);
        if (this.severity) args.unshift((this.color ? this.c.red : '') + '<error>' + (this.color ? this.c.default : ''));
        if (this.timestamp) args.unshift(this.ts());
        console.error.apply(console, args);
    },
    ts: function () {
        var d = new Date();
        return d.getFullYear() + '-' +
            ("0" + (d.getMonth() + 1).toString(10)).slice(-2) + '-' +
            ("0" + (d.getDate()).toString(10)).slice(-2) + ' ' +
            ("0" + (d.getHours()).toString(10)).slice(-2) + ':' +
            ("0" + (d.getMinutes()).toString(10)).slice(-2) + ':' +
            ("0" + (d.getSeconds()).toString(10)).slice(-2) + '.' +
            ("00" + (d.getMilliseconds()).toString(10)).slice(-3);
    }
};