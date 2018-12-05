module.exports = (req, res) => {
  res.render('pages/login', {
    msgslogin: req.flash('msglogin')[0]
  });
};
