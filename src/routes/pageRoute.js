const route = require('express').Router();
const pageCont = require('../controllers/pageCont');


route.get('/', pageCont.index);
route.get('/login', pageCont.login);
route.get('/register', pageCont.register);

module.exports = route;