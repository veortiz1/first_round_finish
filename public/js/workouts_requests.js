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

    try{

        const response= await fetch('/excercise/'+id,
        {method: 'POST'}
        );
     
        const data= await response.json();
     
        if(!response.ok){
         console.log(data.message);
     
        }
        else{
         console.log("excercise deleted!");
         
        }
     
     }
     catch(err){
         console.log("Error: "+err);
     }
     

}

