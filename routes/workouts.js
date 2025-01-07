const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { check, validationResult } = require('express-validator');



router.post("/",async(req,res)=>{
    let {name,workouts}=req.body;
    console.log("Workouts: "+workouts);
   



    
    
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
                console.log(err);
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
            message: "workout Deleted!",
          });
        
    
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "workout not deleted!",
          });

    }



})



module.exports=router;