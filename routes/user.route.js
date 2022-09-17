let express = require('express');
var router = express.Router();

let userControllers = require('../controllers/user.controllers');
let authController = require('../controllers/auth.controllers');
let middlewareLogin = require('../middleware/checkLogin');


router.get('/login',userControllers.login);
router.get('/register',userControllers.register);

// authenticate
router.post('/register-user',authController.registerUser);

router.post('/login',authController.login);

router.get('/logout',authController.logout);

// test ajax get admin info
router.get('/getadmin',userControllers.getAdmin);


// home
router.get('/',middlewareLogin, userControllers.home);

module.exports = router;