module.exports = (req, res) => {
  res.render('pages/admin', {
    msgskill: req.flash('msgskill')[0],
    msgfile: req.flash('msgfile')[0]
  });
};
