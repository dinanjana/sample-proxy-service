const express = require('express');
const BodyParser = require('body-parser');
const log4js = require('log4js');

log4js.configure({
  appenders: { app: { type: 'file', filename: 'app.log' }, out: { type: 'stdout' } },
  categories: { default: { appenders: ['app', 'out'], level: 'INFO' } }
});

const logger = log4js.getLogger('app');

const { initPassport, passport } = require('./middlewares/authentication');

const authorization = require('./middlewares/authorization');

const { faceAnalyzerProxy } = require('./services/ProxyService');

const reqLogger = require('./middlewares/requestLogger');

const robotDetector = require('./middlewares/robotDetector');

const port = 9000;

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

initPassport();

app.use(reqLogger);

app.use(robotDetector);

app.get('/ai_module/api/analyzer/:querySubject', passport.authenticate('bearer', { session: false }), authorization, faceAnalyzerProxy);

app.listen(port, () => logger.info(`Proxy server listening on port ${port}!`));