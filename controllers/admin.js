module.exports = (req, res) => {
  if (!req.session.isAdmin) res.redirect('/');
  res.render('pages/admin', {
    msgskill: req.flash('msgskill')[0],
    msgfile: req.flash('msgfile')[0]
  });
};
