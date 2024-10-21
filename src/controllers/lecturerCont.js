const User = require("../models/user");
const Course = require("../models/course");
const Question = require("../models/question");
const Course_assignment = require('../models/course_assignment');
const Result = require("../models/result");
const bcrypt = require('bcrypt');
const Time = require("../models/time");
const PDFDocument = require('pdfkit');
const fs = require('fs');




module.exports = {
    dashboard: async (req, res) => {
        const context = {}
        try {
            const coursesCount = await Question.countDocuments();
            context['coursesCount'] = coursesCount

            const resultCount = await Result.countDocuments();
            context['resultCount'] = resultCount

            return res.render('./lecturerViews/dashboard', { context, res });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    view_students_result: async (req, res) => {
        const context = {}
        try {
            return res.render('./lecturerViews/viewUploadResult', { context, res });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    upload_exam: async (req, res) => {
        const context = {}
        try {
            const course = await Course.findOne({ _id: req.query.assignedCourseId });
            context['course'] = course

            return res.render('./lecturerViews/uploadExam', { context, res });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    result: async (req, res) => {
        try {
            const studentId = req.body.studentId;
            const courseId = req.body.courseId;
            const selectedAnswers = req.body.answers;

            //To Check if the student already has a result for the given course
            const existingResult = await Result.findOne({ studentId, courseId });
            if (existingResult) {
                return res.status(400).json({ 
                    error: 'You have already taken this exam, Logout Now!!!', 
                    // redirectURL: '/login'
                });
            }

            let score = 0;
            const answers = [];

            // Fetch the correct answers for the questions
            const questions = await Question.find({ courseId });
            const correctAnswersMap = new Map();
            questions.forEach(question => {
                correctAnswersMap.set(question._id.toString(), question.correctAnswer);
            });

            // Calculate score and prepare answers
            for (const answer of selectedAnswers) {
                const question = await Question.findById(answer.questionId);
                if (!question) {
                    return res.status(400).json({ error: `Question with ID ${answer.questionId} not found` });
                }

                // Convert selected option to the corresponding letter format
                const selectedOptionLetter = String.fromCharCode(65 + question.options.indexOf(answer.selectedOption));

                const isCorrect = question.correctAnswer === selectedOptionLetter;
                if (isCorrect) {
                    score += 2;
                }

                answers.push({
                    questionId: answer.questionId,
                    selectedOption: answer.selectedOption,
                    isCorrect
                });
            }


            // Save the result to the database
            const result = await Result.create({
                studentId,
                courseId,
                answers,
                score
            });
            console.log(result);
            return res.status(200).json({
                success: true,
                msg: 'Exam submitted successfully',
                redirectURL: '/login'
            });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: error.message });
        }
    },

    view_results: async (req, res) => {
        try {
            const results = await Result.find({ courseId: req.query.assignedCourseId }).populate('studentId courseId');
 
            return res.render('./lecturerViews/result', { results, res});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }  
    },

    download_pdf: async (req, res) => {
        try {
            const results = await Result.find({ courseId: req.query.assignedCourseId }).populate('studentId courseId');
            console.log(results)
            const doc = new PDFDocument();
            doc.fontSize(14).text('Students Results', { align: 'center' }).moveDown();
 
            results.forEach(result => {
                doc.text(`Name: ${result.studentId.fullname}`);
                doc.text(`Reg No: ${result.studentId.reg_no}`);
                doc.text(`Faculty: ${result.studentId.faculty}`);
                doc.text(`Department: ${result.studentId.dept}`);
                doc.text(`Score: ${result.score}`);
                doc.moveDown();
            }); 

            const pdfPath = './public/pdf/results.pdf'; // Path to save the PDF

            // Create directory if it doesn't exist
            await fs.promises.mkdir('./public/pdf', { recursive: true });

            // Create a writable stream to write PDF content to the file
            const pdfStream = fs.createWriteStream(pdfPath);

            // Pipe the PDF document directly to the writable stream
            doc.pipe(pdfStream);

            // Close the writable stream when the PDF is finished writing
            doc.end();

            // Send the PDF file for download
            res.download(pdfPath);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    my_courses: async (req, res) => {
        const context = {}
        try {
            const assignedCourses = await Course_assignment.find({ lecturer: req.user }).populate('course session');
            context['assignedCourses'] = assignedCourses

            return res.render('./lecturerViews/myCourses', { context, res });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    get_duration: async (req, res) => {
        try {
           const time = await Time.findOne();
            return res.render('./lecturerViews/duration', { res, time });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    duration: async (req, res) => {
        const {hours, minutes, seconds } = req.body;

        console.log(req.body);


        const timeReg = /^\d{1,2}$/;

        try {
            if (!timeReg.test(hours) || parseInt(hours) > 23 || parseInt(hours) < 0)  {
                throw new Error('Enter a valid input (0-23');
            };
            
            if (!timeReg.test(minutes) || parseInt(minutes) > 59 || parseInt(minutes) < 0) {
                throw new Error('Enter a valid input (0-59)');
            };
            
            if (!timeReg.test(seconds) || parseInt(seconds) > 59 || parseInt(seconds) < 0) {
                throw new Error('Enter a valid input (0-59)');
            };

            const _time = await Time.findOneAndUpdate({},
                {hours, minutes, seconds}, {new: true}
            )
            console.log(_time);
            return res.status(200).json({
                success: true, msg: 'Time set successfully',
                redirectURL: '/tutor/my-course'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },

    questions: async (req, res) => {
        const context = {}
        try {
            const courseQuestions = await Question.find({ courseId: req.query.assignedCourseId }).populate('courseId');
            context['courseQuestions'] = courseQuestions


            return res.render('./lecturerViews/questions', { context, res });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    exam_question: async (req, res) => {
        const {
            question,
            courseId,
            options,
            correctAnswer,
        } = req.body;

        console.log(req.body);


        const pattern = /^[A-Za-z0-9_\-? ]+$/;

        try {
            if (!pattern.test(question)) {
                throw new Error('Type questions correctly');
            }

            if (options == []) {
                throw new Error('Please upload Options');
            }

            if (!correctAnswer) {
                throw new Error('Please select the correct answer');
            }

            const _question = await Question.create({
                question,
                courseId,
                options,
                correctAnswer,
            })
            console.log(_question);
            return res.status(200).json({
                success: true, msg: 'Question added successfully',
                redirectURL: '/tutor/my-course'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },
    get_edit_questions: async (req, res) => {
        const context = {}
        try {

            const courseQuestions = await Question.findOne({ _id: req.query.questionId }).populate('courseId');
            context['courseQuestions'] = courseQuestions


            return res.render('./lecturerViews/editQuestion', { context, res });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },
    edit_question: async (req, res) => {
        const {
            questionId,
            question,
            courseId,
            options,
            correctAnswer,
        } = req.body;

        console.log(req.body);


        const pattern = /^[A-Za-z0-9_\-? ]+$/;

        try {
            if (!pattern.test(question)) {
                throw new Error('Type questions correctly');
            }

            if (options == []) {
                throw new Error('Please upload Options');
            }



            if (!correctAnswer) {
                throw new Error('Please select the correct answer');
            }

            const updateQuestion = await Question.findOneAndUpdate(
                { _id: questionId },

                {
                    question,
                    courseId,
                    options,
                    correctAnswer,
                })
            console.log(updateQuestion);
            return res.status(200).json({
                success: true, msg: 'Question Updated successfully',
                redirectURL: '/tutor/my-course'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },
    delete_question: async (req, res) => {
        const { question_id } = req.body
        try {
            if (question_id == "") {
                throw Error('Invalid Data')
            }
            const _deleteQuestion = await Question.findOneAndDelete({ _id: question_id })
            return res.status(200).json({ success: true, msg: 'Question deleted Successfully', redirectURL: '/tutor/my-course' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },


    profile: async (req, res) => {
        const context = {}
        try {
            return res.render('./lecturerViews/profile', { context, res })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    PasswordPage: async (req, res) => {
        const context = {}
        try {
            return res.render('./lecturerViews/changePwd', { context, res });
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

            if (res.locals.lecturer) {
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