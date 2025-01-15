const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { body,check, validationResult } = require('express-validator');

const client = require('../config/reddis');

router.post("/",async(req,res) => {

    console.log("assign / post");
    let  {monday,tuesday,wednesday,thursday,friday,saturday,sunday,id} = req.body;
    console.log({monday,tuesday,wednesday,thursday,friday,saturday,sunday,id});

    try{
        let [results]=await db.query("select * from assigned_workouts where c_id=?",[id]);
       
        if(results.length==0){
           
           await  db.query("insert into assigned_workouts (c_id,u_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id,req.session.u_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday]
            );
        }
        else{
           await db.query("update assigned_workouts set monday=?,tuesday=?,wednesday=?,thursday=?,friday=?,saturday=?,sunday=? where c_id=?",
           [monday,tuesday,wednesday,thursday,friday,saturday,sunday,id]);
        }

        return res.status(200).json({
            success: true,
            message: "Its added! ",
          });

    }
    catch(err){
        console.log("Error!"+ err);
        return res.status(400).json({
            success: false,
            message: "Error adding Workouts! ",
          });
    }


    
})



module.exports=router;