const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, check, validationResult } = require('express-validator');
const client = require('../config/reddis');


router.post("/",
body("name").notEmpty().withMessage("Please Fill out Name field!")
.matches(/^[A-Za-z0-9 ]+$/).withMessage("Name must only contain letters,numbers,and spaces"),
body("rounds").notEmpty().withMessage("Please enter a value for rounds!")
.isInt().withMessage("Rounds must only be a number! e.g 1,2,3"),
body("time").notEmpty().withMessage("Please enter value for time!")
.isInt().withMessage("Time can only be number e.g 30,40,50 etc."),
body("rest").notEmpty().withMessage("Please enter value for rest!")
.isInt().withMessage("Rest can only be number e.g 30,40,50 etc."),
body("link").optional({checkFalsy: true}).matches(/^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}$/)
.withMessage("Please enter a valid youtube link"),
body("description").optional({checkFalsy:true})
, async(req,res) => {

    console.log("IN Exercises /");
   let  {name,rounds,time,rest,link,description,token} = req.body;
   const errors = validationResult(req); 
   if (!errors.isEmpty()) {
       console.log("Input validation error!");
       const firstError = errors.array()[0]; 
       return res.status(422).json({ error: firstError.msg});
   }   

   try{
    let redis_token= await client.get("user:"+req.session.u_id+":token");
    if(redis_token==token){
        console.log("TOKENS ARE EQAUL!");
    }
    else{
        return res.status(500).json({
            success: false,
            message: "Tokens not equal! ",
          });
    }
    
   }
   catch(err){
    return res.status(500).json({
        success: false,
        message: "Redis Error: "+err,
      });
   }


   if(!link){
    link="None!";
   }
   if(!description){
    description="None!";
   }

   try{
   await db.query("insert into exercises (name,rounds,time,rest,link,description,u_id) values (?,?,?,?,?,?,?)",[name,rounds,time,rest,link,description,req.session.u_id]);
   return res.status(200).json({
    success: false,
    message: "Added!",
  });
   }
   catch(err){
    console.log(err);
    return res.status(400).json({
        success: false,
        message: "Error: "+err,
      });
   }

})


router.get("/setEID/:id", async(req,res) => {
    try{
    const eid = req.params.id; 
    req.session.e_id=eid;
    console.log(req.session.e_id+" exercise id");
    return res.status(200).json({
        success: true,
        message: "excercise ID SET!",
      });
    }
    catch(err){

        console.log(err);
        return res.status(400).json({
            success: false,
            message: "not set!",
          });
    }

})


router.put("/", 
body("name").optional({checkFalsy:true})
.matches(/^[A-Za-z0-9 ]+$/).withMessage("Name must only contain letters,numbers,and spaces"),
body("rounds").optional({checkFalsy:true})
.isInt().withMessage("Rounds Must Be a Number!"),
body("time").optional({checkFalsy:true}).isInt().withMessage("Time must be a number!"),
body("rest").optional({checkFalsy:true}).isInt().withMessage("Rest must be a number"),
body("link").optional({checkFalsy: true}).matches(/^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}$/)
.withMessage("Please enter a valid youtube link"),
body("description").optional()
,async(req,res) => {
    console.log("IN exercises / put");
   
    let  {name,rounds,time,rest,link,description,token} = req.body;
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        console.log("Input validation error!");
        const firstError = errors.array()[0]; 
        return res.status(422).json({ error: firstError.msg});
    }   

    try{
        let redis_token=await client.get("user:"+req.session.u_id+":token")

        if(redis_token==token){
            console.log("TOKENS ARE EQUAL!");
        }
        else{
            return res.status(500).json({
                success: false,
                message: "Tokens not equal! ",
              });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Redis Error: "+err,
          });
        
    }
    try{
       [results]=await db.query("select * from exercises where e_id= ?",[req.session.e_id]);

        if(!name){
            name=results[0].name

        }
        if(!rounds){
        rounds=results[0].rounds;
        }
        if(!time){
            time=results[0].time;
        }
        if(!rest){
            rest=results[0].rest;

        }
        if(!link){
            link=results[0].link;

        }
        if(!description){
           description=results[0].description;
        }

        await db.query("update exercises set name=?,rounds=?,time=?,rest=?,link=?,description=? where e_id=?",[name,rounds,time,rest,link,description,req.session.e_id]);

        return res.status(200).json({
            name: name,
            rounds:rounds,
            time:time,
            rest:rest,
            link:link,
            description:description,
            success: true,
            message: "Client edited",
          });

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Client edited",
          });
    }
   



})

router.delete("/:id/:token",async(req,res)=>{
    console.log("IN EXERCISES /id/token delete"); 
    try{
        const eid = req.params.id; 
        const token =req.params.token;
        try{
            let redis_token= await client.get("user:"+req.session.u_id+":token");
            if(redis_token==token){
                console.log("TOKENS ARE EQUAL!");
            }
            else{
                return res.status(500).json({
                    success: false,
                    message: "Tokens not equal! ",
                  });
            }
        }   
        catch(err){
            return res.status(500).json({
                success: false,
                message: "Redis Error: "+err,
              });
        }
     
   
     

        await db.query("delete from exercises where e_id=? and u_id",[eid,req.session.u_id]);

        return res.status(200).json({
            success: true,
            message: "excercise Deleted!",
          });
        
    
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "excercise not deleted!",
          });

    }



})







module.exports=router;