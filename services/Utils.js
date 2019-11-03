
const queryBuilder = (query) => {
  switch (query) {
    case 'faces':
        return 'query=(tags:facial_recognition)';
    default:
        return null

  }
};


module.exports = {
  queryBuilder,
};