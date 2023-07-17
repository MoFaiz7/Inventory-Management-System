const express = require('express');
const router = express.Router()

// controller functions
const {registerUser, loginUser} = require('../controllers/adminController');

//signup
router.post('/register', registerUser)

//login
router.post('/login', loginUser)

module.exports = router