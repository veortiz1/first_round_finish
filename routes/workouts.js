const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, check, validationResult } = require('express-validator');
const client = require('../config/reddis');



router.post("/",
body("name").matches(/^[A-Za-z0-9 ]+$/).withMessage("Name must only contain letters,numbers,and spaces")
,async(req,res)=>{
    console.log("IN workouts / post");
    let {name,workouts,token}=req.body;

    try{
        let redis_token= await client.get("user:"+req.session.u_id+":token");
        if(redis_token==token){
            console.log("TOKENS EQUAL!");
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Tokens not equal!",
            })
        }

    }
    catch(err){
        console.log("ERROR:" +err);
        return res.status(500).json({
            success:false,
            message: "Redis Error!",
        })
    }

   



    
    
    try{

        const[result]=await db.query("insert into workouts (name,u_id) values (?,?)",[name,req.session.u_id]);
        w_id=result.insertId;
        console.log
        for (const workout of workouts) {
            try{
            console.log("workout #: "+workout);
            const [exercise] = await db.query("SELECT * FROM exercises WHERE e_id = ?", [workout]);
            console.log("exercise: ",exercise[0]);

            const [results1] = await db.query(
                "INSERT INTO workout_exercises (w_id, e_id, name, rounds, time, rest, link,description,u_id) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)",
                [w_id, workout, exercise[0].name, exercise[0].rounds, exercise[0].time, exercise[0].rest, exercise[0].link, exercise[0].description, exercise[0].u_id] );
            }
            catch(err){
               return res.status(500).json({
               success:false,
               message: "Database error",
               });
            }
        }
        
        return res.status(200).json({
            success: true,
            message: "Workout created",
          });


    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Workout not created",
          });

    }


})


router.delete("/:id",async(req,res)=>{
    try{
        const wid = req.params.id; 
        await db.query("delete from workouts where w_id=? and u_id",[wid,req.session.u_id]);

        return res.status(200).json({
            success: true,
            message: "You are hired!",
          });
        
    
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "workout not deleted!",
          });

    }



})

router.put("/edit_exercise", async(req,res) =>{
    console.log("currently editing exercise");
     let {name,rounds,time,rest,link,description,id}=req.body;

     try{
        console.log("currently editing exercise");

        [results]= await db.query("select * from workout_exercises where we_id = ? ", [id]);
        if(!name){
            name=results[0].name;
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

        await db.query("update workout_exercises set name=?,rounds=?,time=?,rest=?,link=?,description=? where we_id=?",[name,rounds,time,rest,link,description,id]);

        return res.status(200).json({
            success: true,
            message: "exercisev  updated in workout",
          });

     }
     catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "exercisev not updated in workout",
          });
     }


})



router.put("/:id",async(req,res)=>{
    console.log("edit workout screen");
    try{
        console.log("here");
        const wid = req.params.id; 
       req.session.w_id=wid;
       return res.status(200).json({
        success: true,
        message: "workout id set!",
      });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "workout id not set!",
          });

    }



})

router.delete("/delete_exercise/:id", async(req,res) => {

    try{
        const wid = req.params.id; 
        await db.query("delete from workout_exercises where we_id=?",[wid]);
        return res.status(200).json({
            success: true,
            message: "exercis deleted from workout",
          });

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "exercisev not deleted from workout",
          });

    }
})







module.exports=router;