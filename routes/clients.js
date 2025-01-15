const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { body,check, validationResult } = require('express-validator');

const client = require('../config/reddis');







router.post("/",
body('name').notEmpty().withMessage('Name cannot be empty')
.matches(/^[A-Za-z0-9 ]+$/).withMessage('Name must contain only letters and numbers'),
body('height').optional({ checkFalsy: true }).isFloat().withMessage("Height Must only contain number or period e.g 2.5 "),
body('weight').optional({ checkFalsy: true }).isFloat().withMessage("Weight Must only contain number or period e.g 2.5 "),
body('experience').optional({ checkFalsy: true }).isFloat().withMessage("Experience Must only contain number or period e.g 2.5 "),
body('phone').optional({ checkFalsy: true }).isInt().withMessage("Phone number must only contain numbers no -,.,etc e.g 1234567891"),
async(req,res) => {
    let {name,height,weight,experience,phone,token} = req.body;
    let  redis_token;
    try {
        console.log("CURRENT ROUTE CLIENTS '/' POST ");
       redis_token = await client.get("user:"+req.session.u_id+":token"); 
        if (redis_token) {
            if(token==redis_token){
                console.log("csrf is the same");
            }
            else{
               console.log("CSRF TOKEN MISMATCH!");
                return res.status(401).json({
                    success: false,
                    message: "Tokens are different",
                  });
            }
        
          
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
                console.log("Input validation error!");
                const firstError = errors.array()[0]; 
                return res.status(422).json({ error: firstError.msg});
            }   
          
            if(!height){
                height=0;
            }
            if(!weight){
                weight=0;
            }
            if(!experience){
                experience=0;
            }
            if(!phone){
                phone=0;
            }
            try{
                [results] = await db.query("insert into clients(name,height,weight,exp,phone,u_id) values (?,?,?,?,?,?)", [name,height,weight,experience,phone,req.session.u_id]);
                c_id=results.insertId;
                return res.status(200).json({
                    success: true,
                    message: "client added!",
                  });
            
            }
            catch(err){
                console.log("Error adding to database: "+ err);
                return res.status(500).json({
                    success: false,
                    message: "Error: "+err,
                  });
        
            }
           
        } else {
            console.log("NO REDIS VALUE EXISTS FOR USER!");
            return res.status(500).json({
                success: false,
                message: "USER NOT FOUND IN DB!",
              });
          
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Redis Error: "+err,
          });
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



router.delete("/:id/:token",async(req,res) => {
    console.log("In clients . delete!!!!");
    const c_id = req.params.id; 
    const token = req.params.token; 

    console.log("token: "+token);

    console.log("c_id: "+c_id);

    try{
        redis_token = await client.get("user:"+req.session.u_id+":token"); 
        if(redis_token){
         if(redis_token==token){
            console.log("Tokens are Equal!")
         }
         else{
            console.log("tokens arent equal");
            return res.status(500).json({
                success: false,
                message: "Tokens Are NOT equal!",
              });
            
         }
        }
        else{
            return res.status(500).json({
                success: false,
                message: "No token For User!",
              });
        }

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Reddis Error!",
          });
    }



   
    try{
       const [result]= await db.query("select * from clients where c_id = ? ",[c_id]);
       if(result.length==0){
        return res.status(500).json({
            success: true,
            message: "Client Doesnt Exist!",
          });

       }
       else{
       const [results1]= await db.query("select * from clients where c_id = ? and u_id = ?",[c_id,req.session.u_id]);
       if(results1.length==0){
        return res.status(500).json({
            success: false,
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


router.put("/",body('name').optional({ checkFalsy: true }).notEmpty().withMessage('Name cannot be empty')
.matches(/^[A-Za-z0-9 ]+$/).withMessage('Name must contain only letters and numbers'),
body('height').optional({ checkFalsy: true }).isFloat().withMessage("Height Must only contain number or period e.g 2.5 "),
body('weight').optional({ checkFalsy: true }).isFloat().withMessage("Weight Must only contain number or period e.g 2.5 "),
body('experience').optional({ checkFalsy: true }).isFloat().withMessage("Experience Must only contain number or period e.g 2.5 "),
body('phone').optional({ checkFalsy: true }).isInt().withMessage("Phone number must only contain numbers no -,.,etc e.g 1234567891"),async(req,res)=>{
    
    let {name,height,weight,phone,experience,token} = req.body;
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        console.log("Input validation error!");
        const firstError = errors.array()[0]; 
        return res.status(422).json({ error: firstError.msg});
    }   

    try{
        let redis_token = await client.get("user:"+req.session.u_id+":token");
        if(redis_token==token){
            console.log("TOKENS ARE EQUAL!");
        }
        else{
            return res.status(401).json({
                success: true,
                message: "Tokens Arent Equal!",
              });
        }
        

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Reddis Error!",
          });
    }


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


router.get("/clientStats", async(req,res)=>{

    let weight=[];
    let height=[];
    let exp=[];
    let name=[];
    let exercise_name=[];
    let rounds=[];
    let time=[];


    [results]= await db.query("select * from clients where u_id = ?",[req.session.u_id]);
    for(let i = 0;i<results.length;i++){
        weight.push(results[i].weight);
        height.push(results[i].height);
        name.push(results[i].name);
        exp.push(results[i].exp);


    }
    [results1]=await db.query("select * from exercises where u_id=?",[req.session.u_id]);
    for(let i =0;i<results1.length;i++){
        exercise_name.push(results1[i].name);
        rounds.push(results1[i].rounds);
        time.push(results1[i].time);


    }
    console.log(weight,height,name,exp);

    console.log(exercise_name,rounds,time);

    return res.status(200).json({
        name:name,
        weight:weight,
        height:height,
        exp:exp,
        exercise_name:exercise_name,
        rounds:rounds,
        time:time
      });

})







module.exports=router;