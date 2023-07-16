const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/add', require('./posts'));

console.log('router loaded successfully');

module.exports = router;