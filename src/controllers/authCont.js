const User = require("../models/user");
const jwt = require('jsonwebtoken');


module.exports = {

    // students registration & login 
    register: async(req, res) => {
        const {fullname, email, phone_no, reg_no, gender, faculty, dept, session, level, password} = req.body;

        const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneReg = /^0[1-9]\d{9}$/;
        const reg_noReg = /^\d{4}\/[a-zA-Z]{2}\/\d+$/;
        const pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

        try {
            if (!fullnameReg.test(fullname)) {
                throw new Error('Invalid Fullname format');
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

            if (!pwdReg.test(password)) {
                throw new Error('password not strong');
            }

            if (req.fileValidationError === '') {
                throw new Error(req.fileValidationError)
            }
            const img = req.file.filename;

            // Create user and put in db
            const user = await User.create(
                {fullname, email, phone_no, reg_no, gender, img, faculty, dept, session, level, password, role: 'student'}
            )
            console.log(user);
            return res.status(200).json({
                success: true, msg: 'Account created successfully',
                redirectURL:  `/student/register-course/?studentId=${user._id}` 
            });
        }   catch (error) {
            return res.status(500).json({error: error.message});
        }
    },
  
    login: async(req, res) =>{
        const {reg_no, password} = req.body;
        const reg_noReg = /^\d{4}\/[a-zA-Z]{2}\/\d+$/;
        const pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+\[\]{}|;:,.<>?]).{8,}$/;

        try {
            if (!reg_noReg.test(reg_no)) {
                throw new Error('Incorrect Registration Number')
            }

            if (!pwdReg.test(password)) {
                throw new Error('Incorrect password')
            }

            // invoke the static login method
            const isLoggedIn = await User.login(reg_no, password)
            // console.log(isLoggedIn)

            if (isLoggedIn) {
                // Generate JWT token
                const token = jwt.sign({id: isLoggedIn._id, role: isLoggedIn.role}, process.env.SECRET,
                    {expiresIn: 4000 * 60 * 60 * 24}
                )
                
                // console.log(token);
                // send JWT to cookie
                res.cookie('jwt', token, {maxAge: 4000 * 60 * 60 * 24}); 

                let redirectURL = '';
                if (isLoggedIn.role === 'student') {
                    redirectURL = '/student/start-exam';
                } else if (isLoggedIn.role === 'lecturer') {
                    redirectURL = '/tutor/dashboard'; 
                }

                return res.status(200).json({
                    success: true, 
                    msg:'Login Successfully',
                    redirectURL : redirectURL,
                    user: isLoggedIn
                });
            }else{
                throw new Error('Invalid Credentials');
            }
        } catch (error) {
            return res.status(401).json({error: error.message})
        }
    },

    user_logout: (req, res) => {
        res.cookie('jwt', "", {maxAge: 4});
        res.redirect('/login')
    },

  
}    
