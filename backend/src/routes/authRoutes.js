const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const { validateLogin, validateRegister } = require('../middleware/validation');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/token', authController.getAccessToken);
router.delete('/logout', authController.logout);

module.exports = router;