const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { check, validationResult } = require('express-validator');

const client = require('../config/reddis');




router.post("/",async(req,res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        consolee.log("errorr");
        return res.status(401).json("errorsss!!!");
      }
    else{

          
    const {name,height,weight,experience,phone} = req.body;
    try{
        [results] = await db.query("insert into clients(name,height,weight,exp,phone,u_id) values (?,?,?,?,?,?)", [name,height,weight,experience,phone,req.session.u_id]);
        client.set("client:{}",69);
        client.expire("test1",60);
        return res.status(200).json({
            success: true,
            message: "client added!",
          });


    
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Error: "+err,
          });

    }


}
  

})


router.get("/setCID/:id", (req,res) => {

    const cid = req.params.id; 
    
    console.log("CID  :" +cid );
    req.session.c_id=cid;
 
    return res.status(200).json({
        success: true,
        message: "Client ID SET!",
      });

   
    




})



router.delete("/:id",async(req,res) => {
    const c_id = req.params.id; 
    console.log(c_id);
    try{
       const [result]= await db.query("select * from clients where c_id = ? ",[c_id]);
       if(result.length==0){
        return res.status(400).json({
            success: true,
            message: "Client Doesnt Exist!",
          });

       }
       else{
       const [results1]= await db.query("select * from clients where c_id = ? and u_id = ?",[c_id,req.session.u_id]);
       if(results1.length==0){
        return res.status(400).json({
            success: true,
            message: "Client is trying to be delete from a user different than the one logged in!",
          });

       }
       else{
        await db.query("delete from clients where c_id = ?", [c_id]);
   
        return res.status(200).json({
            success: true,
            message: "Client Deleted!",
          });

       }
       }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Error: "+err,
          });

    }
})


router.put("/",async(req,res)=>{
    let {name,height,weight,phone,experience} = req.body;


    try{
    const [results] = await db.query("select * from clients where c_id = ?",[req.session.c_id]);

    if(!name){
        name=results[0].name;
    }
    if(!height){
        height=results[0].height;
    }
    if(!weight){
        weight=results[0].weight;
    }
    if(!experience){
        experience=results[0].exp;
    }
    if(!phone){
        phone=results[0].phone;
    }

    db.query("update clients set name=?,height=?,weight=?,phone=?,exp=? where c_id = ?",[name,height,weight,phone,experience,req.session.c_id]);

    return res.status(200).json({
        name: name,
        height: height,
        weight: weight,
        phone:phone,
        experience: experience,
        success: true,
        message: "Client edited",
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







module.exports=router;