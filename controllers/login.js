module.exports = (req, res) => {
  res.render('pages/login', {
    msglogin: req.flash('msglogin')[0]
  });
};
