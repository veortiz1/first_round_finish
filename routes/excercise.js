const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { check, validationResult } = require('express-validator');


router.post("/", async(req,res) => {
   const  {name,rounds,time,rest,link,description} = req.body;
   console.log("EXCERCISE NAME: " + name);

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


router.put("/", async(req,res) => {
    let  {name,rounds,time,rest,link,description} = req.body;
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

router.delete("/:id",async(req,res)=>{
    try{
        const eid = req.params.id; 
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