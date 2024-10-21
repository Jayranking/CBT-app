const adminCont = require('../controllers/adminCont');
const route = require('express').Router();
const {profileHandler} = require('../helpers/img_handler');
const {checkAdmin} = require('../middlewares/authMiddleware')



route.get('/home', checkAdmin, adminCont.dashboard);
route.get('/view-admin', checkAdmin, adminCont.view_admin);
route.get('/register-admin', checkAdmin, adminCont.get_register_admin);
route.post('/register-admin', adminCont.register_admin);
route.get('/admin-signin',  adminCont.admin_login);
route.post('/sign-in', adminCont.login);
route.get('/admin-logout', adminCont.admin_logout);
route.post('/edit-admin', checkAdmin, adminCont.edit_admin);
route.get('/edit-admin', checkAdmin, adminCont.ViewEditAdmin);

 
route.get('/lecturer', checkAdmin, adminCont.get_lecturer);
route.post('/register-lecturer', checkAdmin, profileHandler, adminCont.register_lecturer);
route.get('/view-lecturer', checkAdmin, adminCont.view_lecturer);
route.post('/edit-lecturer', checkAdmin, profileHandler, adminCont.edit_lecturer);
route.get('/edit-lecturer', checkAdmin, adminCont.viewEditLect);
route.post('/ban-lect', checkAdmin, adminCont.ban_lect);

route.get('/register-faculty', checkAdmin, adminCont.get_faculty);
route.get('/view-faculty', checkAdmin, adminCont.view_faculty);
route.post('/faculty', checkAdmin, adminCont.register_faculty);
route.post('/edit-faculty', checkAdmin, adminCont.edit_faculty);
route.get('/edit-faculty', checkAdmin, adminCont.viewEditFaculty);
route.post('/delete-faculty', checkAdmin, adminCont.delete_faculty);

route.get('/register-session', checkAdmin, adminCont.get_session);
route.post('/register-session', checkAdmin, adminCont.register_session);
route.post('/session', checkAdmin, adminCont.register_session);
route.get('/view-session', checkAdmin, adminCont.view_session);
route.post('/delete-session', checkAdmin, adminCont.delete_session);

route.get('/register-dept', checkAdmin, adminCont.registerDepart);
route.post('/dept', checkAdmin, adminCont.register_dept);
route.get('/view-dept', checkAdmin, adminCont.view_dept);
route.post('/edit-dept', checkAdmin, adminCont.edit_dept);
route.get('/edit-dept', checkAdmin, adminCont.viewEditDept);
route.post('/delete-dept', checkAdmin, adminCont.delete_dept);


route.get('/register-course', checkAdmin, adminCont.get_course);
route.post('/course', checkAdmin, adminCont.register_course);
route.get('/view-courses', checkAdmin, adminCont.view_course);
route.post('/edit-course', checkAdmin, adminCont.edit_course);
route.get('/edit-course', checkAdmin, adminCont.viewEditcourse);

route.get('/assign-course', checkAdmin, adminCont.get_assignCourse);
route.post('/assign-course', checkAdmin, adminCont.assign_course);
route.get('/view-assigned-courses', checkAdmin, adminCont.view_assignCourse);
route.post('/edit-assign-course', checkAdmin, adminCont.edit_assignCourse);
route.get('/courses-assigned-lecturer', checkAdmin,  adminCont.lecturer_Courses);
route.get('/edit-assigned', checkAdmin, adminCont.view_editAssignCourse);

route.get('/view-students', checkAdmin, adminCont.view_students);
route.post('/edit-student', checkAdmin, adminCont.edit_student);
route.get('/view-student', checkAdmin, adminCont.viewEditStudent);

route.get('/view-result', checkAdmin, adminCont.view_result);

route.get('/profile', checkAdmin, adminCont.profile);

route.get('/change-password', checkAdmin, adminCont.PasswordPage);
route.post('/change-password', checkAdmin, adminCont.changePassword);

route.get('/duration', checkAdmin, adminCont.duration);
route.post('/start', checkAdmin, adminCont.startExam);
route.post('/stop', checkAdmin, adminCont.stopExam);

route.get('/settings', checkAdmin, adminCont.setting);

module.exports = route;