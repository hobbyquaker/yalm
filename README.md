# yalm

A simple Node.js logging module.

Offers 4 logging levels, adds timestamp, severity and colors. Logs to stdout/stderr via console.log and console.error.

## install

```npm install yalm```

## usage

```Javascript
var log = require('yalm');

log.debug('a debug message');
log.info('an info message');
log.warn('a warning message');
log.error('an error message');

log.info('array:', [null, 1, 'string', true]);
log.info('buffer:', new Buffer([32, 32]));
log.info('object:', {"key": "val"});
```

## output of above usage example

![sample output](sample.png)


## options

You can set desired loglevel...
```Javascript
log.setLevel('debug'); // default: 'info'. possible values: 4, 'debug', 3, 'info', 2, 'warn', 1, 'error', 0, 'silent'
```

... and you can disable printing of timestamps, severity and colors
```Javascript
log.setTimestamp(false);
log.setSeverity(false);
log.setColor(false);
```

## aliases

made for humans...
```Javascript
log('...'); // is an alias of log.info('...');
log.warning('...'); // is an alias of log.warn('...');
log.err('...'); // is an alias of log.error('...');
```

## change styling

if you want another timestamp format overwrite the log.ts function...
```Javascript
log.ts = function () {
    // seconds since epoch
    return '' + Math.floor((new Date()).getTime() / 1000);
};
```

... if you want to change the severity strings overwrite log.map properties
```Javascript
log.map.debug = 'DEBUG:';
log.map.info = 'INFO:';
log.map.warn = 'WARNING:';
log.map.error = 'ERROR:';
```


## license

MIT © [Sebastian Raff](https://github.com/hobbyquaker)


