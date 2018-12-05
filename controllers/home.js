module.exports = (req, res) => {
  res.render('pages/index', { msgsemail: req.flash('msgsemail')[0] });
};
