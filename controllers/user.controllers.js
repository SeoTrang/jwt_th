const user = require('../models/user');


const userControllers = {
    home:(req,res,next)=>{
        res.render('home');
    },
    login:(req,res,nex)=>{
        res.render('login');
    },
    register:(req,res,nex)=>{
        res.render('register');
    },
    getAdmin:async(req,res,next)=>{
        try {
            const adminInfo = await user.findOne({admin:"true"});
            console.log("admin info : "+adminInfo);
            if(adminInfo){
                res.json(adminInfo);
            }
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = userControllers;