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

    document.getElementById("add").style.display="none";

    document.getElementById("tables").style.display="none";
    document.getElementById("add_client").style.display="flex";
    document.getElementById("title_box").style.display="none";

}

function add_exercise_view(){

    document.getElementById("add").style.display="none";

    document.getElementById("tables").style.display="none";
    document.getElementById("add_exercise").style.display="flex";

    document.getElementById("title_box").style.display="none";

}

function add_workout_view(){
    window.location.href = '/workout';

}