const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');
const users = require('./routes/users');
const login = require('./routes/login');
const clients = require('./routes/clients');
const excercise = require('./routes/excercise');
const workouts= require('./routes/workouts');


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
      maxAge: 24 * 60 * 60 * 1000 
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
       console.log(results);
       res.render("profile", {clients: results,excercises:results1});


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
        res.render("edit_client",{name: results[0].name, height: results[0].height, weight: results[0].weight,phone: results[0].phone ,experience: results[0].exp, id:results[0].c_id});
        

    }
 
}
catch(err){
    console.log("Edit Client Router error: "+err);
}

})


app.get("/workout", async(req,res)=>{

    try{
        [results]= await db.query("select * from exercises where u_id=?",[req.session.u_id]);

        res.render("create_workout",{results:results});

    }
    catch(err){


    }

    

})



app.get("/edit_exercise", async(req,res) => {
    try{
        [results]=await db.query("select * from exercises where e_id=?",[req.session.e_id]);

        res.render("edit_excercise",{name:results[0].name,rounds:results[0].rounds,time:results[0].time,rest:results[0].rest,link:results[0].link,description:results[0].description});

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
  



  