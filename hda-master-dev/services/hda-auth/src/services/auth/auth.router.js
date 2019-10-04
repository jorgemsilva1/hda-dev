const express = require('express');
const { userSchemaCheck } = require('./auth.schema');
const authController = require('./auth.controller');

const router = express.Router();


// Login Method
router.post('/login', authController.login);

// Register Method
router.post('/register', authController.register);

router.delete('/delete/:id', authController.delete);

router.put('/update/:id', authController.update);

// Get All 
router.get('/all', authController.get);

// Get by id
router.get('/getById/:id', authController.getById);

// Password Reset
// router.put('/pwdreset', authController.passwordReset)

module.exports = router;