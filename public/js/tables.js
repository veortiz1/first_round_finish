let current=0;



function client_table(){
    console.log("clicked");
    document.getElementById("client_table").style.display="flex";
    document.getElementById("exercise_table").style.display="none";
    document.getElementById("workout_table").style.display="none";
   
}


function exercise_table(){
    console.log("clicked");
    document.getElementById("client_table").style.display="none";
    document.getElementById("exercise_table").style.display="flex";
    document.getElementById("workout_table").style.display="none";

}


function workout_table(){
    console.log("clicked");
    document.getElementById("client_table").style.display="none";
    document.getElementById("exercise_table").style.display="none";
    document.getElementById("workout_table").style.display="flex";
  
}
