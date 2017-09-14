var log = require('./index.js');

log.setLevel('debug');

log.debug('a debug message');
log.info('an info message');
log.warn('a warning message');
log.error('an error message');

log.info('array:', [null, 1, 'string', true]);
log.info('buffer:', new Buffer([32, 32]));
log.info('object:', {"key": "val"});

log('another info message');
log.log('another info message');

log.debug("printf-like replacement counter %d <-- yeah!", 99);
log.debug("printf-like replacement counter    <-- yeah!", 99);
log.debug("as if there was never a difference to console.log");

log.setColor(false);
log.info('no colors!');

log.setSeverity(false);
log.info('no colors, no severity!');

log.setTimestamp(false);
log.info('no colors, no severity, no timestamp!');
