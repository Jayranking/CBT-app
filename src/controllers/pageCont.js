const Faculty = require("../models/faculty");
const Session = require("../models/session");
const Dept = require("../models/dept");


module.exports = {
    index : (req, res) =>{
        return res.render('./index')
    },

    login : (req, res) =>{
        return res.render('./login')
    },

    register : async(req, res) =>{
        const context = {}
        try {
            const faculties = await Faculty.find();
            context['faculties'] = faculties

            const depts = await Dept.find();
            context['depts'] = depts

            const sessions = await Session.find();
            context['sessions'] = sessions

            return res.render('./form', { context })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    },

    
}