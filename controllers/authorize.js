const formidable = require('formidable');
const db = require('../models/db');

module.exports = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (
      db.get('login.email').value() === fields.email &&
      db.get('login.password').value() === fields.password
    ) {
      req.session.isAdmin = true;
      res.redirect('/admin');
    } else {
      req.session.isAdmin = false;
      req.flash('msglogin', 'Логин и/или пароль не корректны');
      res.redirect('/login');
    }
  });
};
