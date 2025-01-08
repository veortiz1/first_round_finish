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


router.put("/edit_exercise", async(req,res) =>{
     const {name,rounds,time,rest,link,description,id}=req.body;

     try{

        [results]= await db.query("select * from workout_exercises where we_id = ? ", [id]);
        if(!name){
            name=results[0].name;
        }
        if(!rounds){
            rounds=results[0].rounds;
        }
        if(!time){
            time=db.results[0].time;
        }

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




module.exports=router;