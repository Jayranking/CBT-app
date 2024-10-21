const studentCont = require('../controllers/studentCont');
const route = require('express').Router();
const {checkStudent, checkExamStarted} = require('../middlewares/authMiddleware')

route.get('/start-exam', checkStudent, studentCont.start_exam);
route.get('/exam',  checkStudent, studentCont.exam);

route.get('/register-course',  studentCont.get_reg_course);
route.post('/register-course',  studentCont.course_registration);

route.get('/profile', checkStudent, studentCont.profile);

route.get('/change-password', checkStudent, studentCont.PasswordPage);
route.post('/change-password', checkStudent, studentCont.changePassword);




module.exports = route;