var i=0;


function change_slide(option){
    console.log("clicked");
    if(option==1){
        i=i+1;
        if(i>6){
            i=0;
        }
    }
    else{
    
            i=i-1;
      
        if(i<0){
            i=6;
        }

    }

 
    document.getElementById("monday").style.display = "none";
document.getElementById("tuesday").style.display = "none";
document.getElementById("wednesday").style.display = "none";
document.getElementById("thursday").style.display = "none";
document.getElementById("friday").style.display = "none";
document.getElementById("saturday").style.display = "none";
document.getElementById("sunday").style.display = "none";

if(i==0){
    document.getElementById("monday").style.display = "flex";
    document.getElementById("todays_workout").innerText="Monday's Workout";
}
if(i==1){
    document.getElementById("tuesday").style.display = "flex";
    document.getElementById("todays_workout").innerText="Tuesday's Workout";
}
if(i==2){
    document.getElementById("wednesday").style.display = "flex";
    document.getElementById("todays_workout").innerText="Wednesdays's Workout";
}
if(i==3){
    document.getElementById("thursday").style.display = "flex";
    document.getElementById("todays_workout").innerText="Thursday's Workout";
}
if(i==4){
    document.getElementById("friday").style.display = "flex";
    document.getElementById("todays_workout").innerText="Friday's Workout";
}
if(i==5){
    document.getElementById("saturday").style.display = "flex";
    document.getElementById("todays_workout").innerText="Saturday's Workout";
}
if(i==6){
    document.getElementById("sunday").style.display = "flex";
    document.getElementById("todays_workout").innerText="Sunday's Workout";
}



}