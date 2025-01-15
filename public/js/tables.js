let current=0;



function client_table(){
    console.log("clicked");
    document.getElementById("client_table").style.display="flex";
    document.getElementById("exercise_table").style.display="none";
    document.getElementById("Workout_table").style.display="none";
    document.getElementById("current_table").innerText="Client Table";

}


function exercise_table(){
    console.log("clicked");
    document.getElementById("client_table").style.display="none";
    document.getElementById("exercise_table").style.display="flex";
    document.getElementById("Workout_table").style.display="none";
    document.getElementById("current_table").innerText="Exercise Table";
}


function workout_table(){
    console.log("clicked");
    document.getElementById("client_table").style.display="none";
    document.getElementById("exercise_table").style.display="none";
    document.getElementById("Workout_table").style.display="flex";
    document.getElementById("current_table").innerText="Workout Table";
}
