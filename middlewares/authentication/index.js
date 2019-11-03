const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

const records = [
  { id: 1, username: 'jack', token: '123456789', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', token: 'abcdefghi', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

const findByToken = (token, cb) => {
  process.nextTick(() => {
    for (let i = 0, len = records.length; i < len; i++) {
      const record = records[i];
      if (record.token === token) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};

const initPassport = () => {
  // Configure the Bearer strategy for use by Passport.
  //
  // The Bearer strategy requires a `verify` function which receives the
  // credentials (`token`) contained in the request.  The function must invoke
  // `cb` with a user object, which will be set at `req.user` in route handlers
  // after authentication.
  passport.use(new Strategy(
    (token, cb) => {
      findByToken(token, (err, user) => {
        if (err) { return cb(err); }
        if (!user) {
          return cb(null, false, 'Access Denied');
        }
        return cb(null, user);
      });
    }));

};

module.exports = { initPassport, passport };