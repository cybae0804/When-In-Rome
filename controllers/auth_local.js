const { localPassport } = require('../config/passport-setup');

exports.login = (req, res, next) => {
  localPassport.authenticate('local', function (err, user, info) {
    
    if (err) return next(err);
    if (!user) return res.send({ success: false });

    req.logIn(user, function (err) {
      if (err) return next(err); 

      return res.send({ success: true });
    });
  })(req, res, next);
};
