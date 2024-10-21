const authCont = require('../controllers/authCont');
const route = require('express').Router();
const {profileHandler} = require('../helpers/img_handler')

// students route 
route.post('/sign-up', profileHandler, authCont.register);

route.post('/sign-in', authCont.login);

route.get('/user-logout', authCont.user_logout);


 


module.exports = route;