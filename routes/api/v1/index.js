const express = require('express');

const usersApi = require("../../../controllers/api/v1/users");

const router = express.Router();

router.use('/posts', require('./posts'));
router.post('/createSession', usersApi.createSession)

module.exports = router;