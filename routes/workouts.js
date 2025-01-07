const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { check, validationResult } = require('express-validator');



router.post("/",async(req,res)=>{
    let {name,workouts}=req.body;
    console.log("Workouts: "+workouts);
    workouts = JSON.stringify(workouts);
    
    try{

        db.query("insert into workouts (name,excercises,u_id) values (?,?,?)",[name,workouts,req.session.u_id]);
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



module.exports=router;