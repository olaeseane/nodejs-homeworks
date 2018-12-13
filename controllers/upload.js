const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const db = require('../models/db');

module.exports = (req, res, next) => {
  const form = new formidable.IncomingForm();
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  form.uploadDir = path.join(process.cwd(), uploadDir);

  form.parse(req, (err, fields, files) => {
    if (err) return next(err);

    const valid = validation(fields, files);
    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      req.flash('msgfile', valid.status);
      return res.redirect('/admin');
    }

    const fileName = path.join(uploadDir, files.photo.name);
    fs.rename(files.photo.path, fileName, err => {
      if (err) {
        console.error(err.message);
        return;
      }
      db.get('products')
        .push({ name: fields.name, price: fields.price, path: path.join('upload', files.photo.name) })
        .write();
      req.flash('msgfile', 'Картинка успешно загружена');
      res.redirect('/admin');
    });
  });
};

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true };
  }
  if (!fields.name) {
    return { status: 'Не указано описание картинки!', err: true };
  }
  if (!fields.price) {
    return { status: 'Не указано цена!', err: true };
  }
  return { status: 'Ok', err: false };
};
