const formidable = require('formidable');
const db = require('../models/db');

module.exports = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    db.set('login.email', fields.email).write();
    db.set('login.password', fields.password).write();
    req.flash('msglogin', 'Счетчик отправлен');
    res.redirect('/login');
  });
};
