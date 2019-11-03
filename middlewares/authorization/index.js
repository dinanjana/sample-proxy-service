module.exports = (req, res, next) => {
  req.fullContext = req.get('user-role') === 'ADMIN';
  next();
};