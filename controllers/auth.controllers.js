const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { request } = require('express');

const authController = {
    


    generateAccesstoken:(user)=>{
        return jwt.sign(
            {_id:user._id,admin:user.admin},
            'accesstoken_key',
            {expiresIn:30});

    },

    generateRefreshtoken:(user)=>{
        return jwt.sign(
            {_id:user._id,admin:user.admin},
            'refreshtoken',
            {expiresIn:60});

    },

    refreshtoken_create_new_accesstoken:(refreshtoken)=>{
        return jwt.sign(
            {_id:refreshtoken._id,admin:refreshtoken.admin},
            'accesstoken_key',
            {expiresIn:30});
    }
    ,

    registerUser:async (req,res,next)=>{
        // res.json(req.body);

        try {

            // console.log('den day');
            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash(req.body.password,salt);

            // create a new user
            const user_save = await new Users({
                name:req.body.username,
                email:req.body.email,
                password:password_hash
            });
    
            
            user_save.save();
            res.redirect('/');
            console.log(user_save);

        } catch (error) {
            res.json(error);
        }

        
    },

    login:async(req,res,next)=>{
      
        try {
            // res.json(req.body.username)
            const user = await Users.findOne({name:req.body.username});
            
            // res.json(user);
            if(!user){
                
                return res.json('khong tim thay nguoi dung');
            }

            
            const validPassword = await bcrypt.compare(req.body.password,user.password);
          
            if(!validPassword){
                
                return res.json('mat khau khong dung');
            }

            if(user && validPassword){
                // console.log('test');
                const access_token = await authController.generateAccesstoken(user);
                const refresh_token = await authController.generateRefreshtoken(user);
                user.refreshtoken = refresh_token;
                await user.save();
                // console.log("accesstoken : "+access_token);
                // console.log("refreshtoken : "+refresh_token);
                // res.json({
                //     "accesstoken":access_token,
                //     "refreshtoken":refresh_token
                // });
                if(access_token){
                    res.cookie("accesstoken",access_token);
                    res.cookie("refreshtoken",refresh_token);
                    
                    res.redirect('/');
                }else{
                    res.json("khong khoi tao token duoc");
                }
            }
            

        } catch (error) {
            res.status(500).json(error);
        }
    },

    logout:(req,res,next)=>{
        res.clearCookie("accesstoken");
        console.log('vao logout');
        res.redirect('/login');
    }



    

}

module.exports = authController;