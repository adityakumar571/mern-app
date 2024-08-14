const { signup, login } = require('../Controllers/AuthController');
const joi =require('joy')
const { singupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router =require('express').Router();


router.post('/signup',singupValidation,signup);
router.post('/login',loginValidation,login);

module.exports=router;