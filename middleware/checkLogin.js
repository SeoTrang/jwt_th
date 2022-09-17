const jwt = require("jsonwebtoken");
const authController = require('../controllers/auth.controllers');


async function checkLogin(req,res,next){

    try {
        console.log("accesstoken : "+req.cookies.accesstoken);
        // res.json(req.cookies.accesstoken);

        let access_token = await req.cookies.accesstoken;
        
        let logined = await jwt.verify(access_token,'accesstoken_key');
        // console.log(logined);
        // res.json(logined);

        // console.log("accesstoken: ",access_token);
        // console.log("logined: ",logined);
        if(logined){
           next();
        }
        
    } catch (error) {
        // res.redirect('/login');
        console.log(error);
        if(error.message === "jwt expired"){
            try {
                let refresh_token = req.cookies.refreshtoken;
            
                    let verify_refreshtoken = await jwt.verify(refresh_token,'refreshtoken');
                    // res.json(verify_refreshtoken);
                    if(verify_refreshtoken){
                        // console.log(verify_refreshtoken);
                        const new_accesstoken = await authController.refreshtoken_create_new_accesstoken(verify_refreshtoken);
                        console.log('new accesstoken : '+new_accesstoken);
                        if(new_accesstoken){
                            res.cookie("accesstoken",new_accesstoken);
                            next();
                        }
                    }
            } catch (error) {
                if(error.message === "jwt expired"){
                    res.json('token het han vui long dang nhap lai !!');
                }
            }

        }else res.json(error);
    }
}

module.exports = checkLogin;