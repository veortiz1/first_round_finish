const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');
const db = require('../config/db');


router.post("/add", async(req,res) => {
    console.log("test");
    const {user,password,email} = req.body;
    function isusernamevalid(user) {
        const regex =/^[A-Za-z0-9]+$/;
        return regex.test(user); 
    }

    function ispasswordvalid(pass){
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(pass); 

      

    }
    try{
     [results] =   await  db.query("select * from users where username = ? or email = ?",[user,email]);

     if(results.length!=0){
        return res.status(409).json({
            success: false,
            message: "User or Email Exists!",
          }); }
    else{
    if(!isusernamevalid(user)){
        console.log("invalid username");
        return res.status(400).json({
            success: false,
            message: "Username can only contain letter or numbers",
          }); }
    }
    if(!ispasswordvalid(password)){
        console.log("invalid password");
        return res.status(400).json({
            success: false,
            message: "Password must contain uppercase,lowercase,number and special character, while being 8 or more characters!",
          }); }
    const hashedPassword = await bcrypt.hash(password, 13);
    try{
        await db.query("insert into users (username,password,email) values (?,?,?) ",[user,hashedPassword,email]);
        [results1] = await db.query("select u_id from users where username = ?",[user]);
        if(results1==0){
            console.log("NO results");
        }
        else{
            console.log("results!!!!!!");
            console.log(results1[0].u_id);
            console.log("USER IDDDD!");
        }
        console.log("here");
        req.session.u_id=results1[0].u_id;
        console.log(req.session.u_id+"  u_idddd");

    }
    catch(err){
        console.log("eroor:"+err);
        return res.status(400).json({
            success: false,
            message: "Error inserting user to DB!: "+err,
          });

    }

 

    return res.status(200).json({
        success: true,
        message: "User Added!",
      });
    
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