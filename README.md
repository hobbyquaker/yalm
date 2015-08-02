# yalm - yet another logging module

Offers 4 logging levels, adds timestamp, severity and colors. Logs to stdout/stderr.

## install

```npm install yalm```

## usage

```Javascript
var log = require('yalm');

log.debug('a debug message');
log.info('an info', true);
log.warn('a warning', 1, 2, 3);
log.error('an error', {message: 'test!', code: 517}, new Buffer([32]));
```

## sample output

![sample output](sample.png)

## options

You can set desired loglevel...
```Javascript
log.loglevel = 'debug'; // default: 'debug'. possible values: 'debug', 'info', 'warn', 'error'
```

... and you can turn off printing off timestamps, severity and colors
```Javascript
log.timestamp = false;
log.severity = false;
log.color = false;```

## license

MIT


