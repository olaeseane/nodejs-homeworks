const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/home'));
router.get('/login', require('../controllers/login'));
router.get('/admin', require('../controllers/admin'));
router.post('/', require('../controllers/message'));
router.post('/admin/skills', require('../controllers/skills'));
router.post('/admin/upload', require('../controllers/upload'));
router.post('/login', require('../controllers/authorize'));


module.exports = router;
