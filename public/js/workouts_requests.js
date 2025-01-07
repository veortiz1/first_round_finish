let workouts = [];

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
    }
    else{
      workouts.splice(final_index,1)
    }

    console.log(workouts);



}


async function create_workout(){
    name=document.getElementById("workout_name").value;

    const response = await fetch("/workouts",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,workouts:workouts})


    })

   const data = await response.json();

   if(!response.ok){
    console.log("Excercise Not added!");
   }
   else{
    console.log("Addeddd!!");
   }
     

}

