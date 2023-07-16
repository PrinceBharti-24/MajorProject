const express = require('express');
const router = express.Router();

const postAdd = require('../controllers/post_controller');

router.get('/post', postAdd.addPost);

module.exports = router;