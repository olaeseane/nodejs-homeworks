const formidable = require('formidable');
const db = require('../models/db');

module.exports = (req, res) => {
  const form = formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    db.get('messages')
      .push(fields)
      .write();
    req.flash('msgsemail', 'Контактные данные отправлены');
    res.redirect('/');
  });
};
