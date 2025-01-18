function add_client_home(){
    window.location.href = '/profile';
}

function assigned_workouts_view(){
    window.location.href = '/assigned_workouts';
}

function assign_view(){
    window.location.href = '/assignView';
}
function add_client_view(){

    document.getElementById("create_send_workouts").style.display="none";
    document.getElementById("chart_frame").style.display="none";
    document.getElementById("choose_table_buttons").style.display="none";
    document.getElementById("tables").style.display="none";

    let titles = document.querySelectorAll(".title_frame");
    for(let i=0;i<titles.length;i++){
        titles[i].style.display="none";
    }

    document.getElementById("add_client").style.display="flex";


}

function add_exercise_view(){

    document.getElementById("create_send_workouts").style.display="none";
    document.getElementById("chart_frame").style.display="none";
    document.getElementById("choose_table_buttons").style.display="none";
    document.getElementById("tables").style.display="none";

    let titles = document.querySelectorAll(".title_frame");
    for(let i=0;i<titles.length;i++){
        titles[i].style.display="none";
    }

    document.getElementById("add_exercise").style.display="flex";

}

function add_workout_view(){
    window.location.href = '/workout';

}