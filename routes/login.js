const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');
const db = require('../config/db');
const client = require('../config/reddis');
const crypto = require('crypto');



router.post("/", async(req,res) => {
    const {user,password} = req.body;
   
    try{
        [results] =await db.query("select * from users where username = ? ",[user]);
        console.log(results.length);
        if(results.length>0){
            const isMatch = await bcrypt.compare(password, results[0].password);
            console.log(isMatch);
            if(isMatch){
                console.log("matchhhh");
            
           
                req.session.u_id=results[0].u_id;
                const user_token = crypto.randomBytes(32).toString('hex');

                try{
                req.session.csrf=user_token;
                await client.set("user:"+req.session.u_id+":token",user_token);
                await client.expire("user:"+req.session.u_id+":token",7200);
                }
                catch(err){
                    return res.status(400).json({
                        success: false,
                        message: "Redis Error!" + err,
                      });

                }
                
                return res.status(200).json({
                    success: true,
                    message: "User Exists!",
                  });
        

            }
            else{
                console.log("nomatcchhhh");
                return res.status(400).json({
                    success: false,
                    message: "Password doesnt match!",
                  });

            }

        }

        else{
            console.log("no users");
            return res.status(400).json({
                success: false,
                message: "User doesnt exist!",
              });
    
        }
      

    }
    catch(err){
        console.log("eroor:"+err);
        return res.status(400).json({
            success: false,
            message: "Error: "+err,
          });
    }
 


})




module.exports=router;