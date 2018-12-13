const express = require('express');
const router = express.Router();

const isAuth = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect('/login');
  }
  // req.session.isAdmin ? next() : res.redirect('/login');
};

router.get('/', require('../controllers/home'));
router.get('/login', require('../controllers/login'));
router.get('/admin', isAuth, require('../controllers/admin'));
router.post('/', require('../controllers/message'));
router.post('/admin/skills', isAuth, require('../controllers/skills'));
router.post('/admin/upload', isAuth, require('../controllers/upload'));
router.post('/login', require('../controllers/authorize'));

module.exports = router;
