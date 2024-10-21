const User = require('../models/user');
const Course = require("../models/course");
const Student_course = require('../models/student_courses');
const bcrypt = require('bcrypt');
const Duration = require('../models/duration');
const Question = require("../models/question");
const Time = require('../models/time');


module.exports = {

    start_exam: async (req, res) => {
        try {
            const duration = await Duration.findOne();
            const examStarted = duration && duration.startTime && !duration.endTime;

            return res.render('./studentViews/examPage', { examStarted,res });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },     

    // course registration side 
    get_reg_course: async (req, res) => {
        const context = {}
        try {
            const courses = await Course.find();
            context['courses'] = courses

            return res.render('./studentViews/regCourse', { context,res });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }

    },

    course_registration: async (req, res) => {
        const { courses } = req.body;
        try {
            if (!courses || courses.length === 0) {
                throw new Error('Select Your Course')
            }

            // create student course and put in db
            const student_courses = await Student_course.create(
                { course: courses, student: req.user }
            )
            console.log(student_courses);

            return res.status(200).json({
                success: true, msg: 'Course registered successfully',
                redirectURL: `/student/start-exam`
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }

    },

    exam: async (req, res) => {
        const context = {}
        try {
            
            const studentCourse = await Student_course.findOne({ student: req.student }).populate('course');
            context['studentCourse'] = studentCourse;

            const courseQuestions = await Question.find({ courseId: studentCourse.course[0] }).populate('courseId')
            context['courseQuestions'] = courseQuestions

            const time = await Time.findOne();

            return res.render('./studentViews/examStart', { context,res, time});
        } catch (error) {  
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    profile: async (req, res) => {
        const context = {}
        try {
            return res.render('./studentViews/profile', { context,res })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    PasswordPage: async (req, res) => {
        const context = {}
        try {
            return res.render('./studentViews/changePwd', { context,res});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    changePassword: async (req, res) => {
        const { oldPwd, newPwd } = req.body;

        try {
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

            if (!passwordPattern.test(newPwd)) {
                throw Error = 'Enter a valid Password';
            }

            const student = await User.findOne({ _id: req.user });

            if (res.locals.student) {
                auth = await bcrypt.compare(oldPwd, student.password);
                if (auth) {
                    const salt = await bcrypt.genSalt();

                    const _newPwd = await bcrypt.hash(newPwd, salt);

                    const studentChangePassword = await User.findOneAndUpdate({ _id: req.user }, { password: _newPwd })
                    console.log(studentChangePassword);
                    return res.status(200).json({
                        success: true, msg: 'Password changed successfully',
                        redirectURL: '/login'
                    });
                }
                throw Error('Incorrect password')
            } else {
                throw Error('Incorrect password')
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    },


}