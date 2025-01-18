let workouts = [];
let workout_id=-9999;

function add_to_workout(id){

   let  dont_add=0;
   let index=0;
   final_index=0;
    workouts.forEach(workout => {
        if(workout==id){
            dont_add=1;
            final_index=index;
            
            
            
        }
        index=index+1;
    });
    if(dont_add==0){
        workouts.push(id)
        document.getElementById("add_to_workout"+id).style.backgroundColor="#D6CA98";
        document.getElementById("add_to_workout"+id).style.color="#655A7C";
        
    }
    else{
      workouts.splice(final_index,1)
      document.getElementById("add_to_workout"+id).style.backgroundColor="#655A7C";
      document.getElementById("add_to_workout"+id).style.color="#D6CA98";
    }

    console.log(workouts);



}


async function create_workout(token){
    name=document.getElementById("workout_name").value;

    const response = await fetch("/workouts",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,workouts:workouts,token:token})


    })

   const data = await response.json();

   if(!response.ok){
    console.log("Excercise Not added!");
    if(data.error){
        document.getElementById("create_workout_error").innerText=data.error;
    }
    else{
        document.getElementById("create_workout_error").innerText=data.message;
    }
   

   }
   else{
    console.log("Addeddd!!");
    document.getElementById("create_workout_error").innerText="Workout added!";

   }
     

}


async function delete_workout(id,token){

    try{

        const response= await fetch('/workouts/'+id+'/'+token,
        {method: 'DELETE'}
        );
     
        const data= await response.json();
     
        if(!response.ok){
         console.log(data.message);

     
        }
        else{
         console.log("workout deleted!");
         
        }
     
     }
     catch(err){
         console.log("Error: "+err);
     }
     
     
     
}


async function edit_workout(id){
    try{
        const response=await fetch("/workouts/"+id,
        {method: 'put'});
        const data= await response.json();
     
        if(!response.ok){
         console.log(data.message);
     
        }
        else{
         console.log("workout updated!");

     window.location.href='/edit_workout';
         
        }
    

    }
    catch(err){
        console.log(err);
    }
}



function set_w_id(id,name){
    console.log(id);
    console.log(name);
    workout_id=id;
    document.getElementById("currently_editing").textContent="Currently editing workout: "+name;

}

async function delete_from_workout(id,token){
    try{

        const response= await fetch('/workouts/delete_exercise/'+id+"/"+token,
        {method: 'DELETE'}
        );
     
        const data= await response.json();
     
        if(!response.ok){
         console.log(data.message);
         document.getElementById("workout_text").innerText=data.message;
     
        }
        else{
         console.log("workout deleted!");
         document.getElementById("workout_text").innerText="Workout Deleted!";
         
        }
     
     }
     catch(err){
         console.log("Error: "+err);
     }
    

}


async function edit_workout_exercise(id){
    console.log(workout_id);
    let name=document.getElementById("e_name").value;
    let rounds=document.getElementById("rounds").value;
    let time=document.getElementById("time").value;
    let rest=document.getElementById("rest").value;
    let link=document.getElementById("link").value;
    let description=document.getElementById("description").value;
    let token=id;

    try{

        const response = await fetch("/workouts/edit_exercise",{
            method: "put",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name:name,rounds:rounds,time:time,rest:rest,link:link,description:description,id:workout_id,token:token})
    
    
        })
     
        const data= await response.json();
     
        if(!response.ok){
       if(data.error){
        document.getElementById("edit_workout_exercise_error").innerText=data.error;
       }
       else{
        document.getElementById("edit_workout_exercise_error").innerText=data.message;
       }
        
     
        }
        else{
         
                document.getElementById("edit_workout_exercise_error").innerText="Exercise Edited!";
               
         
        }
     
     }
     catch(err){
         console.log("Error: "+err);
     }
    

}