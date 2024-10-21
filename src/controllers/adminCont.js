const Faculty = require("../models/faculty");
const Admin = require("../models/admin");
const User = require("../models/user");
const Session = require("../models/session");
const Dept = require("../models/dept");
const Course = require("../models/course");
const Course_assignment = require("../models/course_assignment");
const Result = require("../models/result");
const { sendEmail, generatePassword } = require("../helpers/util");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Duration = require("../models/duration");
  
module.exports = {
 
    dashboard: async(req, res) => {
        const context = {}
        try {

            const lecturersCount = await User.countDocuments({ role: 'lecturer' });
            context['lecturersCount'] = lecturersCount;

            const studentsCount = await User.countDocuments({role: 'student'});
            context['studentsCount'] = studentsCount

            const facultiesCount = await Faculty.countDocuments();
            context['facultiesCount'] = facultiesCount 

            const deptsCount = await Dept.countDocuments();
            context['deptsCount'] = deptsCount

            return res.render('./adminViews/dashboard', {context, res})
        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    }, 

    view_admin: async (req, res) => {
        const context = {}
        try {

            const _admins = await Admin.find({is_hidden: false})
            context['admins'] = _admins

            return res.render('./adminViews/viewAdmin', { context, res})
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },
    get_register_admin: async(req, res) => {
        const context = {}
       try {
            

            return res.render('./adminViews/regAdmin', {context, res})

        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
       }
    },
    register_admin: async (req, res) => {
        const { fullname, email, phone_no, gender } = req.body;

        const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneReg = /^0[1-9]\d{9}$/;

        try {
            if (!fullnameReg.test(fullname)) {
                throw new Error('Invalid name format');
            }

            if (!emailReg.test(email)) {
                throw new Error('Invalid email address');
            }

            if (!phoneReg.test(phone_no)) {
                throw new Error('Invalid phone number input');
            }

            if (gender == "") {
                throw new Error('Select your gender');
            }
            // ================Generate random password===============
            const password = generatePassword(12);

            // Create user and put in db
            const admin = await Admin.create(
                { fullname, email, phone_no, gender, password: 'Password@2' }
            )
            console.log(admin);

            const mailBody = `Your account has been created successfully. Please use the login
            credential below to log in to your account: <br> <br>
            Email: <b>${email}</b> <br>
            Password: <b>${password}</b> <br> <br>
            You are advised to change the default password after successful login. 
            Click on the button below to login to your account <br><br>
            <a href="/login">Click here to login</a> `;

            // ===================Notify admin through email==================
            sendEmail(email, 'Account Created', mailBody)

            return res.status(200).json({
                success: true, msg: 'Account created successfully',
                redirectURL: '/admin/home'
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    admin_login: (req, res) => {
        return res.render('./adminLogin')
    }, 
    login: async (req, res) => {
        const { email, password } = req.body;
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const pwdReg = /^(?:[0-9A-Za-z!@#$%^&*()\-+=_{}\[\]|:;"'<>,.?\\/ ])+$/;

        try {
            if (!emailReg.test(email)) {
                throw new Error('Invalid email address')
            }

            if (!pwdReg.test(password)) {
                throw new Error('Incorrect password')
            }

            // invoke the static login method
            const isLoggedIn = await Admin.login(email, password)

            if (isLoggedIn) {
                // Generate JWT token
                const token = jwt.sign({ id: isLoggedIn._id }, process.env.SECRET,
                    { expiresIn: 1000 * 60 * 60 * 24 }
                )
                // console.log(token);

                // send JWT to cookie
                res.cookie('jwt', token, { maxAge: 4000 * 60 * 60 });

                return res.status(200).json({
                    success: true, msg: 'Login Successfully',
                    redirectURL: '/admin/home',
                    admin: isLoggedIn
                })
            }
        }   catch (error) {
            return res.status(401).json({ error: error.message })
        }
    },
    admin_logout: (req, res) => {
        res.cookie('jwt', "", {maxAge: 4});
        res.redirect('/admin/admin-signin')
    },
    edit_admin: async (req, res) => {
        const { adminId, fullname, email, phone_no, gender } = req.body;
        const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneReg = /^0[1-9]\d{9}$/;

        try {
            if (!fullnameReg.test(fullname)) {
                throw new Error('Invalid name format');
            }

            if (!emailReg.test(email)) {
                throw new Error('Invalid email address');
            }

            if (!phoneReg.test(phone_no)) {
                throw new Error('Invalid phone number input');
            }

            if (gender == "") {
                throw new Error('Select your gender');
            }
            // ================Generate random password===============
            // const password = generatePassword(12);

            // Create user and put in db
            const admin = await Admin.findOneAndUpdate(
                {_id: adminId}, { fullname, email, phone_no, gender, password: 'Password@2' }
            )
            console.log(admin);

            // const mailBody = `Your account has been created successfully. Please use the login
            // credential below to log in to your account: <br> <br>
            // Email: <b>${email}</b> <br>
            // Password: <b>${password}</b> <br> <br>
            // You are advised to change the default password after successful login. 
            // Click on the button below to login to your account <br><br>
            // <a href="/login">Click here to login</a> `;

            // ===================Notify admin through email==================
            // sendEmail(email, 'Account Created', mailBody)

            return res.status(200).json({
                success: true, msg: 'Details edited successfully',
                redirectURL: '/admin/view-admin'
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    ViewEditAdmin : async(req, res) =>{
        const context = {}
        try { 
            
            const _adminById = await Admin.findOne({_id: req.query.adminId})
            context['admin'] = _adminById

            return res.render('./adminViews/editAdmin', { context,res})

        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    get_lecturer: async (req, res) => {
        const context = {}
        try {

            const faculties = await Faculty.find();
            context['faculties'] = faculties

            const depts = await Dept.find();
            context['depts'] = depts
 
            const sessions = await Session.find();
            context['sessions'] = sessions

            return res.render('./adminViews/regLecturer', { context,res })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    },
    register_lecturer: async (req, res) => {
        const { fullname, email, phone_no, reg_no, gender, faculty, dept, session, level } = req.body;
        const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneReg = /^0[1-9]\d{9}$/;
        const reg_noReg = /^\d{4}\/[a-zA-Z]{2}\/\d+$/;
         
        try {
            if (!fullnameReg.test(fullname)) {
                throw new Error('Invalid name format');
            }

            if (!emailReg.test(email)) {
                throw new Error('Invalid email address');
            }

            if (!phoneReg.test(phone_no)) {
                throw new Error('Invalid phone number input');
            }

            if (!reg_noReg.test(reg_no)) {
                throw new Error('Incorrect input');
            }

            if (gender == "") {
                throw new Error('Select your gender');
            }


            if (faculty == "") {
                throw new Error('Select your faculty');
            }

            if (dept == "") {
                throw new Error('Select your department');
            }

            if (session == "") {
                throw new Error('Select your session');
            }

            if (level == "") {
                throw new Error('select your current level');
            }

            if (req.fileValidationError === '') {
                throw new Error(req.fileValidationError)
            }
            const img = req.file.filename;


            // ================Generate random password===============
            const password = generatePassword(12);
            console.log(password);

            // Create user and put in db
            const lecturer = await User.create(
                { fullname, email, phone_no, reg_no, gender, img, faculty, dept, session, level, role: 'lecturer', password: password }
            )
            console.log(lecturer);

            const mailBody = `Your account has been created successfully. Please use the login
            credential below to log in to your account: <br> <br>
            Registration Number: <b>${reg_no}</b> <br>
            Password: <b>${password}</b> <br> <br>
            You are advised to change the default password after successful login. 
            Click on the button below to login to your account <br><br>
            <a href="/login">Click here to login</a> `;

            // ===================Notify Lecturer through email==================
            sendEmail(email, 'Account Created', mailBody)

            return res.status(200).json({
                success: true, msg: 'Account created successfully',
                redirectURL: '/admin/home'
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    view_lecturer: async (req, res) => { 
        const context = {} 
        try {
            const _lecturers = await User.find({ role: 'lecturer' });
            context['lecturers'] = _lecturers
            return res.render('./adminViews/viewLect', { context,res})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    edit_lecturer: async (req, res) => {
        const { lecturerId, fullname, email, phone_no, reg_no, gender, faculty, dept, session, level} = req.body;
        const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneReg = /^0[1-9]\d{9}$/;
        const reg_noReg = /^\d{4}\/[a-zA-Z]{2}\/\d+$/;

        try {
            if (!fullnameReg.test(fullname)) {
                throw new Error('Invalid name format');
            }

            if (!emailReg.test(email)) {
                throw new Error('Invalid email address');
            }

            if (!phoneReg.test(phone_no)) {
                throw new Error('Invalid phone number input');
            }

            if (!reg_noReg.test(reg_no)) {
                throw new Error('Incorrect input');
            }

            if (gender == "") {
                throw new Error('Select your gender');
            }


            if (faculty == "") {
                throw new Error('Select your faculty');
            }

            if (dept == "") {
                throw new Error('Select your department');
            }

            if (session == "") {
                throw new Error('Select your session');
            }

            if (level == "") {
                throw new Error('select your current level');
            }

            // ================Generate random password===============
            const password = generatePassword(12);

            // Create user and put in db
            const updatedLecturer = await User.findOneAndUpdate(

                {_id: lecturerId},
                { fullname, email, phone_no, reg_no, gender, faculty, dept, session, level, role: 'lecturer'}
            )
            console.log(updatedLecturer);

            // ===================Notify Lecturer through email==================
            // sendEmail(email, 'Account Created', mailBody)

            return res.status(200).json({
                success: true, msg: 'Account Updated successfully',
                redirectURL: '/admin/view-lecturer'
            });

        }   catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    viewEditLect:  async (req, res) => {
        const context = {}
        try {
           

            const _lecturer = await User.findOne({_id: req.query.lecturerId})
            context['lecturer'] = _lecturer 

            const faculties = await Faculty.find();
            context['faculties'] = faculties

            const depts = await Dept.find();
            context['depts'] = depts
 
            const sessions = await Session.find();
            context['sessions'] = sessions

            return res.render('./adminViews/editLect', {context,res})
        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
        
    },
    ban_lect: async (req, res) => {
        const { lect_id } = req.body;
        try {
            if (!lect_id) {
                throw new Error('Invalid Data');
            }
            const _banLect = await User.findByIdAndUpdate(lect_id, { status: 'banned' }, { new: true }, {role: 'lecturer'});
            console.log(_banLect);
            return res.status(200).json({ success: true, msg: 'Department banned successfully', redirectURL: '/admin/view-lect' });
        } catch (error) {
            console.error('Error banning department:', error);
            return res.status(500).json({ error: error.message });
        }
    },
    

    get_faculty: async (req, res) => {
        try {

        }   catch (error) {
            return res.status(500).json({error: error.message})        
        }
        return res.render('./adminViews/regFaculty')
    },
    register_faculty: async (req, res) => {
        const { faculty_name } = req.body;

        const faculty_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        try {
            if (!faculty_nameReg.test(faculty_name)) {
                throw new Error('Invalid input')
            }

            // create faculty and put in db
            const faculty = await Faculty.create(
                { faculty_name }
            )
            console.log(faculty);
            return res.status(200).json({
                success: true, msg: 'faculty added successfully',
                redirectURL: '/admin/view-faculty'
            })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    view_faculty: async (req, res) => {
        context = {}
        try {

            const faculties = await Faculty.find();
            context['faculties'] = faculties
            return res.render('./adminViews/ViewFaculty', { context,res })
        }   catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    edit_faculty: async (req, res) => {
        const {facultyId, faculty_name } = req.body;

        const faculty_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        try {
            if (!faculty_nameReg.test(faculty_name)) {
                throw new Error('Invalid input')
            }

            // create faculty and put in db
            const UpdateFaculty = await Faculty.findOneAndUpdate(
                {_id: facultyId}, { faculty_name }
            )
            console.log(UpdateFaculty);
            return res.status(200).json({
                success: true, msg: 'Faculty Updated successfully',
                redirectURL: '/admin/view-faculty'
            })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    viewEditFaculty : async(req, res) => {
       const context = {}
        try {
            
            const faculties = await Faculty.findOne({_id: req.query.facultyId});
            context['faculties'] = faculties
            return res.render('./adminViews/editFaculty', { context,res })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },
    delete_faculty: async (req, res) => {
        const { faculty_id } = req.body
        try {
            if (faculty_id == "") {
                throw Error('Invalid Data')
            }
            const _deleteFaculty = await Faculty.findOneAndDelete({ _id: faculty_id })
            return res.status(200).json({ success: true, msg: 'faculty deleted Successfully', redirectURL: '/admin/view-faculty' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    get_session: async (req, res) => {
        
        try {
            
            
        } catch (error) {
            return res.status(500).json({error: error.message})        
        }
        return res.render('./adminViews/regSession')
    },
    register_session: async (req, res) => {
        const { session } = req.body;

        const sessionReg = /\b\d{4}-\d{4}\b/;
        try {
            if (!sessionReg.test(session)) {
                throw new Error('Invalid session format. Please use the format YYYY-YYYY.')
            }
           

            // create faculty and put in db
            const _session = await Session.create(
                { session }
            )
            console.log(_session);
            return res.status(200).json({
                success: true, msg: 'Session added successfully',
                redirectURL: '/admin/view-session'
            })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    view_session: async (req, res) => {
        const context = {}
        try {
            const sessions = await Session.find();
            context['sessions'] = sessions
            return res.render('./adminViews/viewSession', { context,res })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    delete_session: async (req, res) => {
        const { session_id } = req.body
        try {
            if (session_id == "") {
                throw Error('Invalid Data')
            }
            const _deleteSession = await Session.findOneAndDelete({ _id: session_id })
            return res.status(200).json({ success: true, msg: 'Session deleted Successfully', redirectURL: '/admin/home' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },
    

    registerDepart: async (req, res) => {
        const context = {}
        try {

            const faculties = await Faculty.find();
            context['faculties'] = faculties

            return res.render('./adminViews/regDept', { context,res })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }

    },
    register_dept: async (req, res) => {
        const { dept_name, faculty_name } = req.body;

        const dept_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        try {
            if (!dept_nameReg.test(dept_name)) {
                throw new Error('Invalid department name format. Please use valid characters.');
            }

            if (!faculty_name) {
                throw new Error('Please select a faculty.');
            }

            // create faculty and put in db
            const _dept = await Dept.create(
                { dept_name, faculty: faculty_name }
            )
            console.log(_dept);
            return res.status(200).json({
                success: true, msg: 'department added successfully',
                redirectURL: '/admin/view-dept'
            })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    view_dept: async (req, res) => {
        context = {}
        try {
            const depts = await Dept.find();
            context['depts'] = depts
            return res.render('./adminViews/ViewDept', { context,res})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    edit_dept: async (req, res) => {
        const {deptId, dept_name, faculty_name } = req.body;

        const dept_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        try {
            if (!dept_nameReg.test(dept_name)) {
                throw new Error('Invalid department name format. Please use valid characters.');
            }

            if (!faculty_name) {
                throw new Error('Please select a faculty.');
            }

            // create faculty and put in db
            const UpdateDept = await Dept.findOneAndUpdate(
                {_id: deptId},{ dept_name, faculty: faculty_name }
            )
            console.log(UpdateDept);
            return res.status(200).json({
                success: true, msg: 'Department Updated successfully',
                redirectURL: '/admin/view-dept'
            })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    viewEditDept: async (req, res) => {
        const context = {}
        try {

            const depts = await Dept.findOne({_id: req.query.deptId});
            context['depts'] = depts

            return res.render('./adminViews/editDept', { context,res })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    delete_dept: async (req, res) => {
        const { dept_id } = req.body
        try {
            if (dept_id == "") {
                throw Error('Invalid Data')
            }
            const _deleteDept = await Dept.findOneAndDelete({ _id: dept_id })
            return res.status(200).json({ success: true, msg: 'department deleted Successfully', redirectURL: '/admin/view-dept' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    },

    get_course: async (req, res) => {
        const context = {}
        try {

            const faculties = await Faculty.find();
            context['faculties'] = faculties

            const depts = await Dept.find();
            context['depts'] = depts

            return res.render('./adminViews/regCourse', { context,res })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    },
    register_course: async (req, res) => {
        const { title, code, unit, faculty, dept, level, semester } = req.body;

        const titleReg = /^[A-Za-z\s]+$/;
        const codeReg = /^[A-Za-z0-9\s]+$/;
        const unitReg = /^\d+$/;
        try {
            if (!titleReg.test(title)) {
                throw new Error('Invalid format')
            }

            if (!codeReg.test(code)) {
                throw new Error('Invalid format')
            }

            if (!unitReg.test(unit)) {
                throw new Error('Invalid format')
            }

            if (!faculty) {
                throw new Error('Select semester')
            }

            if (!dept) {
                throw new Error('Select department')
            }


            if (!level) {
                throw new Error('Select level')
            }

            if (!semester) {
                throw new Error('Select semester')
            }

            // create faculty and put in db
            const _course = await Course.create(
                { title, code, unit, faculty, dept, level, semester }
            )
            console.log(_course);
            return res.status(200).json({
                success: true, msg: 'Course added successfully',
                redirectURL: '/admin/view-courses'
            })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    view_course: async (req, res) => {
        const context = {}
        try {
            const courses = await Course.find();
            context['courses'] = courses
            return res.render('./adminViews/ViewCourse', { context,res })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    edit_course: async (req, res) => {
        const {courseId, title, code, unit, faculty, dept, level, semester } = req.body;

        const titleReg = /^[A-Za-z\s]+$/;
        const codeReg = /^[A-Za-z0-9\s]+$/;
        const unitReg = /^\d+$/;
        try {
            if (!titleReg.test(title)) {
                throw new Error('Invalid format')
            }

            if (!codeReg.test(code)) {
                throw new Error('Invalid format')
            }

            if (!unitReg.test(unit)) {
                throw new Error('Invalid format')
            }

            if (!faculty) {
                throw new Error('Select semester')
            }

            if (!dept) {
                throw new Error('Select department')
            }


            if (!level) {
                throw new Error('Select level')
            }

            if (!semester) {
                throw new Error('Select semester')
            }

            // create faculty and put in db
            const updateCourse = await Course.findOneAndUpdate(
                {_id: courseId}, { title, code, unit, faculty, dept, level, semester }
            )
            console.log(updateCourse);
            return res.status(200).json({
                success: true, msg: 'Course Updated successfully',
                redirectURL: '/admin/view-courses'
            })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    viewEditcourse: async (req, res) => {
        const context = {}
        try {
            const courses = await Course.findOne({_id: req.query.courseId});
            context['courses'] = courses 

            const faculties = await Faculty.find();
            context['faculties'] = faculties

            const depts = await Dept.find();
            context['depts'] = depts
            return res.render('./adminViews/editCourse', { context,res })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    get_assignCourse: async (req, res) => {
        const context = {}
        try {
           
            const lecturers = await User.find({role: 'lecturer'});
            context['lecturers'] = lecturers

            const courses = await Course.find();
            context['courses'] = courses

            const sessions = await Session.find();
            context['sessions'] = sessions

            return res.render('./adminViews/assignCourse', { context,res})

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    },
    assign_course: async (req, res) => {
        const { lecturer, courses, session, date } = req.body;
        try {
            if (!lecturer) {
                throw new Error('Select Course Lecturer/Cordinator')
            }

            if (!courses || courses.length === 0) {
                throw new Error('Select course title')
            }


            if (!session) {
                throw new Error('Select session')
            }

            if (!date) {
                throw new Error('Date required')
            }

            
            // assign and put in db
            const assign_course = await Course_assignment.create(
                { lecturer, course: courses, session, date }
            )
            
            return res.status(200).json({
                success: true, msg: 'Course assigned successfully',
                redirectURL: '/admin/view-assigned-courses'
            })
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    },
    view_assignCourse: async (req, res) => {
        context = {}
        
        try {

            const assignedCourses = await Course_assignment.find().populate('lecturer course session');
            context['assignedCourses'] = assignedCourses

            return res.render('./adminViews/viewAssign', { context,res })
        }   catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    edit_assignCourse: async (req, res) => {
        const {coursesAssigenedId, lecturer, courses, session, date } = req.body;
        try {
            if (!lecturer) {
                throw new Error('Select Course Lecturer/Cordinator')
            }

            if (!courses || courses.length === 0) {
                throw new Error('Select course title')
            }


            if (!session) {
                throw new Error('Select session')
            }

            if (!date) {
                throw new Error('Date required')
            }

            
            // create faculty and put in db
            const Update_assignCourse = await Course_assignment.findOneAndUpdate(
                {_id: coursesAssigenedId},{ lecturer, course: courses, session, date }
            )
            console.log(Update_assignCourse);
            return res.status(200).json({
                success: true, msg: 'Course Re-assigned successfully',
                redirectURL: '/admin/view-assigned-courses'
            })
        }   catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }, 
    lecturer_Courses : async (req, res) => {
        const context = {}
        try {
            const assignedCourse =  await Course_assignment.findOne({_id: req.query.assignmentId}).populate('lecturer course session');
            context['assignedCourse'] = assignedCourse
            return res.render('./adminViews/lectAssignedCourses', {context,res})
        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message}) 
        }
        
    },
    view_editAssignCourse: async (req, res) => {
        context = {}
        try {
            const lecturers = await User.find({role: 'lecturer'});
            context['lecturers'] = lecturers

            const courses = await Course.find();
            context['courses'] = courses

            const sessions = await Session.find();
            context['sessions'] = sessions

            const assignedCourses = await Course_assignment.findOne({_id: req.query.assignedCourseId}).populate('lecturer course session')
            context['assignedCourses'] = assignedCourses

            return res.render('./adminViews/editAssign', { context,res})
        }   catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }, 

    view_students: async (req, res) => {
        const context = {}
        try {
            const _students = await User.find({ role: 'student' });
            context['students'] = _students
            return res.render('./adminViews/viewStudent', { context,res })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    edit_student: async (req, res) => {
        const { studentId, fullname, email, phone_no, reg_no, gender, faculty, dept, session, level} = req.body;
        const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneReg = /^0[1-9]\d{9}$/;
        const reg_noReg = /^\d{4}\/[a-zA-Z]{2}\/\d+$/;

        try {
            if (!fullnameReg.test(fullname)) {
                throw new Error('Invalid name format');
            }

            if (!emailReg.test(email)) {
                throw new Error('Invalid email address');
            }

            if (!phoneReg.test(phone_no)) {
                throw new Error('Invalid phone number input');
            }

            if (!reg_noReg.test(reg_no)) {
                throw new Error('Incorrect input');
            }

            if (gender == "") {
                throw new Error('Select your gender');
            }


            if (faculty == "") {
                throw new Error('Select your faculty');
            }

            if (dept == "") {
                throw new Error('Select your department');
            }

            if (session == "") {
                throw new Error('Select your session');
            }

            if (level == "") {
                throw new Error('select your current level');
            }

            // Create user and put in db
            const updatedStudent = await User.findOneAndUpdate(

                {_id: studentId},
                { fullname, email, phone_no, reg_no, gender, faculty, dept, session, level, role: 'student'}
            )
            console.log(updatedStudent);

            return res.status(200).json({
                success: true, msg: 'Account Updated successfully',
                redirectURL: '/admin/view-students'
            });

        }   catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    viewEditStudent:  async (req, res) => {
        const context = {}
        try {
            const _student = await User.findOne({_id: req.query.studentId})
            context['student'] = _student 

            const faculties = await Faculty.find();
            context['faculties'] = faculties

            const depts = await Dept.find();
            context['depts'] = depts
 
            const sessions = await Session.find();
            context['sessions'] = sessions

            return res.render('./adminViews/editStudent', {context,res})
        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
        
    },

    view_result: async (req, res) => {
        context = {}
        try {
            const results = await Result.find();
            context['results'] = results
            return res.render('./adminViews/viewResult', { context, res})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    profile : async(req, res) => {
        const context = {}
        try {
            const _admins =  await Admin.findOne();
            context['_admins'] = _admins
            return res.render('./adminViews/profile', {context,res})
        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    },

    PasswordPage : async(req, res) => {
        const context = {}
        try {
            return res.render('./adminViews/changePwd', {context,res});
        }   catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    },  

    changePassword : async(req, res) => {
        const {oldPwd, newPwd} = req.body;

        try {
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

            if (!passwordPattern.test(newPwd)) {
                throw Error = 'Enter a valid Password';
            }

            if (res.locals.admin) {
                auth = await bcrypt.compare(oldPwd, _admin.password);
                if (auth) {
                    const salt = await bcrypt.genSalt();

                    const _newPwd = await bcrypt.hash(newPwd, salt);

                    const adminChangePassword = await Admin.findOneAndUpdate({_id: res.locals.admin._id}, {password: _newPwd})
                    console.log(adminChangePassword);
                    return res.status(200).json({
                        success : true, msg: 'Password changed successfully',
                        redirectURL: '/admin/home'
                    });
                }
                throw  Error('Incorrect password')
            }else{
                throw  Error('Incorrect password')
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({error : error.message});
        }
    },

    duration : async(req, res) => {
        const context = {}
        try {
            return res.render('./adminViews/duration', { context,res })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    startExam : async(req, res) => {
        try {
            const duration = await Duration.findOneAndUpdate({}, { $set: { startTime: Date.now() } }, { upsert: true, new: true });
            console.log(duration);
            return res.status(200).json({
                success : true, msg: 'Exam started successfully',
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : error.message})
        }
    },
    stopExam : async(req, res) => {
        try {
            await Duration.updateOne({}, { endTime: Date.now() });
            // const duration = await Duration.findOneAndUpdate({}, { $set: { endTime: Date.now() } });
            // console.log(duration);
            return res.status(200).json({
                success : true, msg: 'Exam stopped successfully',
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : error.message})
        }
    },

    setting : (req, res) => {
        const context = {}
        try {
            return res.render('./adminViews/settings', {context, res})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}