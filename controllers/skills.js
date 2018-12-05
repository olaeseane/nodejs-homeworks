const formidable = require('formidable');
const db = require('../models/db');

module.exports = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    db.get('skills')
      .push(fields)
      .write();
    req.flash('msgskill', 'Счетчик отправлен');
    res.redirect('/admin');
  });
};
