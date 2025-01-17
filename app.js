const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');
const users = require('./routes/users');
const login = require('./routes/login');
const clients = require('./routes/clients');
const excercise = require('./routes/excercise');
const workouts= require('./routes/workouts');

const assign= require('./routes/assign');


const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key', 
    resave: false,           
    saveUninitialized: false,   
    cookie: {
      secure: false,
      httpOnly: true,         
      maxAge: 2 * 60 * 60 * 1000
    }
  }));


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', users);
app.use('/login', login);
app.use('/clients', clients);
app.use('/excercise', excercise);
app.use('/workouts', workouts);
app.use('/assign', assign);



  
  app.get('/', (req,res) => {

    res.render("index");

})

app.get('/login', (req,res) => {

   res.render("login");


})

app.get('/register', (req,res) => {

    res.render("register");
    
 
 })
 






app.get('/profile', async(req,res) => {


    console.log("user_id!!!!!!");
    console.log(req.session.u_id);


    try{
       let [results] = await db.query("select * from clients where u_id=? ",[req.session.u_id]);
       let [results1] = await db.query("select * from exercises where u_id=? ",[req.session.u_id]);
       let [results2] = await db.query("select * from workouts where u_id=? ",[req.session.u_id]);

       
       console.log(results);
       res.render("profile", {clients: results,excercises:results1,workouts:results2,csrf:req.session.csrf});


    }
    catch(err){
        console.log(err);

    }


   


    console.log("user_id!!!!!!");

})



app.get("/edit_client", async(req,res) => {



try{
    console.log("in edit_client route");
    console.log(req.session.c_id);
    const [results] = await db.query("select * from clients where c_id = ?",[req.session.c_id]);
    if(results==0){
        console.log("no clients found with id");
    }
    else{
        console.log(results);
        res.render("edit_client",{name: results[0].name, height: results[0].height, weight: results[0].weight,phone: results[0].phone ,experience: results[0].exp, id:results[0].c_id,csrf:req.session.csrf});
        

    }
 
}
catch(err){
    console.log("Edit Client Router error: "+err);
}

})


app.get("/workout", async(req,res)=>{

    try{
        [results]= await db.query("select * from exercises where u_id=?",[req.session.u_id]);

        res.render("create_workout",{results:results,csrf:req.session.csrf});

    }
    catch(err){


    }

    

})

app.get("/assignView",async(req,res)=> {

    try{
        [results]=await db.query("select * from workouts where u_id=?",[req.session.u_id]);
        [results1]= await db.query("select * from clients where u_id=?",[req.session.u_id]);
        res.render("assign",{results:results,results1:results1});

    }
    catch(err){

    }

   
})

app.get("/assigned_workouts",async(req,res)=>{
    try{
    [results]=await db.query("select * from assigned_workouts where u_id = ? ", [req.session.u_id]);
    [results1]= await db.query("select * from clients where u_id = ?",[req.session.u_id]);
    res.render("assigned_workouts",{results:results,results1:results1});
    }
    catch(err){
    console.log(err);
    }
})



app.get("/edit_exercise", async(req,res) => {
    try{
        [results]=await db.query("select * from exercises where e_id=?",[req.session.e_id]);

        res.render("edit_excercise",{name:results[0].name,rounds:results[0].rounds,time:results[0].time,rest:results[0].rest,link:results[0].link,description:results[0].description,csrf:req.session.csrf});

    }
    catch(err){
        console.log(err);
    }

})

app.get("/edit_workout", async(req,res) => {
    try{
    
        let [results]= await db.query("select * from workouts where w_id=?",req.session.w_id);
       let  [results1]= await db.query("select * from workout_exercises where w_id = ?",[req.session.w_id]);
        console.log(results1);


        

        res.render("edit_workout",{workout_name:results[0].name,exercises:results1,csrf:req.session.csrf});

    }
    catch(err){
        console.log(err);
    }

})

app.get("/client_example", async(req,res) =>{
   
    try{
      let [results]= await db.query("select * from assigned_workouts where c_id = ?",[req.session.client_example]);

     if(results.length ==0){
        console.log("error");
     }
     else{
        let [monday]=await db.query("select * from workout_exercises where w_id = ?",[results[0].monday]);
        let [tuesday]=await db.query("select * from workout_exercises where w_id = ?",[results[0].tuesday]);
        let [wednesday]=await db.query("select * from workout_exercises where w_id = ?",[results[0].wednesday]);
        let [thursday]=await db.query("select * from workout_exercises where w_id = ?",[results[0].thursday]);
        let [friday]=await db.query("select * from workout_exercises where w_id = ?",[results[0].friday]);
        let [saturday]=await db.query("select * from workout_exercises where w_id = ?",[results[0].saturday]);
        let [sunday]=await db.query("select * from workout_exercises where w_id = ?",[results[0].sunday]);
        console.log(monday);
        res.render("client_view",{monday:monday,tuesday:tuesday,wednesday:wednesday,thursday:thursday,friday:friday,saturday:saturday,sunday:sunday});

     }
     
    }
    catch(err){
        console.log(err);
    }
})


app.get("/test", async(req,res) => {

res.render("edit_client");
})




app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  



  