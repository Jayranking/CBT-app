const lecturerCont = require('../controllers/lecturerCont');
const route = require('express').Router();
const {checkLecturer} = require('../middlewares/authMiddleware')


route.get('/dashboard', checkLecturer, lecturerCont.dashboard);

route.get('/students-result', checkLecturer, lecturerCont.view_students_result);

route.get('/upload-exam', checkLecturer, lecturerCont.upload_exam);

route.post('/result',checkLecturer,  lecturerCont.result);
route.get('/result', checkLecturer, lecturerCont.view_results);
route.post('/download-pdf', checkLecturer, lecturerCont.download_pdf);

route.get('/my-course', checkLecturer, lecturerCont.my_courses);

route.get('/questions', checkLecturer, lecturerCont.questions);
route.post('/delete-question', checkLecturer, lecturerCont.delete_question);

route.post('/exam-question', checkLecturer, lecturerCont.exam_question);
route.post('/edit-question', checkLecturer, lecturerCont.edit_question);

route.get('/duration', checkLecturer, lecturerCont.get_duration);
route.post('/duration', checkLecturer, lecturerCont.duration)

route.get('/profile', checkLecturer, lecturerCont.profile);

route.get('/change-password', checkLecturer, lecturerCont.PasswordPage);
route.post('/change-password', checkLecturer, lecturerCont.changePassword);



module.exports = route;