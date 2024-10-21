const jwt = require('jsonwebtoken');
const Duration = require('../models/duration');
const Admin = require('../models/admin');
const User = require('../models/user');

const checkAdmin = (req, res, next) => {

    const token = req.cookies.jwt;
    // console.log(token);

    if (!token || token === undefined) {
        return res.redirect('/admin/admin-signin');
    }   

    if (token) {
        jwt.verify(token, process.env.SECRET, async(error, decodedToken) => {    
            if (error) {
                if (error.message == 'jwt expired') {
                    return res.redirect('/admin/admin-signin');
                }
                return res.redirect('/admin/admin-signin');
            }
            else {
                const _admin = await Admin.findOne({_id: decodedToken.id}, {password: 0})
                if (_admin) {
                    req.admin = decodedToken.id;
                    res.locals.admin = _admin
                    next();
                }
                else{
                    res.locals.admin = null;
                    return res.redirect('/admin/admin-signin');

                }
                
            }
        });
    }
    else {
        return res.redirect('/admin/admin-signin');
    }


}

const checkStudent = (req, res, next) => {

    const token = req.cookies.jwt;
    // console.log(token);

    if (!token || token === undefined) {
        return res.redirect('/login');
    }   

    if (token) {
        jwt.verify(token, process.env.SECRET, async(error, decodedToken) => {    
            if (error) {
                if (error.message == 'jwt expired') {
                    return res.redirect('/login');
                }
                return res.redirect('/login');
            }
            else {
                const user = await User.findOne({_id: decodedToken.id}, {password: 0})
                if (user) {
                    if (user.role === "student") {
                        req.user = decodedToken.id;
                        res.locals.student = user

                        next();
                    }
                }
                else {
                    res.locals.student = null;
                    return res.redirect('/login');

                }
                
            }
        });
    }
    else {
        return res.redirect('/login');
    }


}

const checkLecturer = (req, res, next) => {

    const token = req.cookies.jwt;
    // console.log(token);

    if (!token || token === undefined) {
        return res.redirect('/login');
    }   

    if (token) {
        jwt.verify(token, process.env.SECRET, async(error, decodedToken) => {    
            if (error) {
                if (error.message == 'jwt expired') {
                    return res.redirect('/login');
                }
                return res.redirect('/login');
            }
            else {
                const user = await User.findOne({_id: decodedToken.id}, {password: 0})
                if (user) {
                    if (user.role === "lecturer") {
                        req.user = decodedToken.id;
                        res.locals.lecturer = user
                        next();
                    }
                }
                else {
                    res.locals.lecturer = null;
                    return res.redirect('/login');

                }
                
            }
        });
    }
    else {
        return res.redirect('/login');
    }


}

const checkExamStarted = async(req, res, next) => {
    try {
        const duration = await Duration.findOne();
        if (duration && duration.startTime && !duration.endTime) {
            next();
        }else{
            return res.status(403).json({
                message : 'Exam not started'
            })
        }
        console.log(duration);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}
module.exports = { checkAdmin, checkStudent, checkLecturer, checkExamStarted}