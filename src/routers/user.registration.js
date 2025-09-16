const express = require('express');
const { userController } = require('../controllers');
const { userValidationMiddleware } = require('../middleware');

const router = express.Router();

/**
 * http://localhost:2000/api/register
 */
router.post('/register',userValidationMiddleware.userValidation,userController.userRegister_Controller);
module.exports = router;