const db = require('../models/db');

module.exports = (req, res) => {
  let param = {
      msgsemail: req.flash('msgsemail')[0],
      my_products: db.get('products').value()
    },
    my_skills = db.get('skills').value();

  if (Object.keys(my_skills).length !== 0) {
    param = { ...param, my_skills: Object.values(db.get('skills').value()) };
  }
  res.render('pages/index', param);
};
