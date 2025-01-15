async function create_excercise(){
    let name=document.getElementById("e_name").value;
    console.log(name);
    let rounds=document.getElementById("rounds").value;
    let time=document.getElementById("time").value;
    let rest=document.getElementById("rest").value;
    let link=document.getElementById("link").value;
    let description=document.getElementById("description").value;
    let token=document.getElementById("csrf_add").value;


   const response = await fetch("/excercise",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,rounds:rounds,time:time,rest:rest,link:link,description:description,token:token})


    })

   const data = await response.json();

   if(!response.ok){
    if(!response.error){
        console.log("Excercise Not added!");
        document.getElementById("error1").innerText=data.error;
    }
    else{
        console.log("Excercise Not added!");
        document.getElementById("error1").innerText=data.message;
    }
   
   }
   else{
    console.log("Addeddd!!");
    document.getElementById("error1").innerText="Exercise Added!";
    window.location.href = '/profile';

   }

}

async function edit_excercise(id){
    const response= await fetch('excercise/setEID/'+id,
    {method: 'get'},
    );

    const data = await response.json();
    if(!response.ok){
        console.log("not set");

    }
    else{
        window.location.href='/edit_exercise';

    }

}

async function edit_excercise_form(){
    let name=document.getElementById("name").value;
    let rounds=document.getElementById("rounds").value;
    let time=document.getElementById("time").value;
    let rest=document.getElementById("rest").value;
    let link=document.getElementById("link").value;
    let description=document.getElementById("description").value;
    let token=document.getElementById("csrf_edit_exercise" ).value;

   const response = await fetch("/excercise",{
        method: "put",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,rounds:rounds,time:time,rest:rest,link:link,description:description,token:token})


    })

   const data = await response.json();

   if(!response.ok){
    console.log("Excercise Not added!");
    if(data.error){
        document.getElementById("exercise_form_error").innerText=data.error;
    }
    else{
        document.getElementById("exercise_form_error").innerText=data.message;
    }
   }
   else{
    document.getElementById("edit_exercise_name").innerText="Current Name: "+data.name;
    document.getElementById("edit_rounds").innerText="Current Rounds: "+data.rounds;
    document.getElementById("edit_time").innerText="Current Time: "+data.time;
    document.getElementById("edit_rest").innerText="Current Rest: "+data.rest;
    document.getElementById("edit_link").innerText="Current Link: "+data.link;
    document.getElementById("edit_description").innerText="Current Description: "+data.description;
    console.log("Addeddd!!");
    document.getElementById("exercise_form_error").innerText="Client Updated";
   }
    
}



async function delete_exercise(id,token){


    try{

   const response= await fetch('/excercise/'+id+"/"+token,
   {method: 'DELETE'}
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
