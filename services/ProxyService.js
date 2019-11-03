const _  = require('lodash');
const axios = require('axios');
const logger = require('log4js').getLogger('app');
const { queryBuilder } = require('./Utils');

const BASE_URL = 'https://cybersmart.predictintel.ai/test_mgt/api/documents/?';

const faceAnalyzerProxy = (req, res) => {
  const querySubject = req.params.querySubject;
  const query = req.query;
  const queryParamString = _.reduce(query, (acc, val, key) => `${acc}&${_.trim(key)}=${_.trim(val)}`, '');
  const url = `${BASE_URL}${queryBuilder(querySubject)}&index=file${queryParamString}`;

  logger.info(`Redirecting to ${url}`);

  axios.get(url)
    .then((resp) => {
      if (!req.fullContext) {
        resp.Documents = _.map(resp.Documents,
          ({ fileName, mimeType, fileUrl, fileType, _id }) => ({ fileName, mimeType, fileUrl, fileType, _id }));
      }
      res.status(200).send(resp);

    })
    .catch((err) => {
      logger.error(JSON.stringify(err), err);
      res.status(400).send(err)
    })
};

module.exports = {
  faceAnalyzerProxy,
};