const logger = require('log4js').getLogger('app');
module.exports = (req, res, next) => {
  logger.info(`Request from ${req.ip} to ${req.path}`);
  next();
};