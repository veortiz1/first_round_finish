

async function assign(){
    let monday=document.getElementById("Monday").value;
    let tuesday=document.getElementById("Tuesday").value;
    let wednesday=document.getElementById("Wednesday").value;
    let thursday=document.getElementById("Thursday").value;
    let friday=document.getElementById("Friday").value;
    let saturday=document.getElementById("Saturday").value;
    let sunday=document.getElementById("Sunday").value;
    let id=document.getElementById("client_input").value;

  console.log(monday,tuesday,wednesday,thursday,friday,saturday,sunday,id);


    const response = await fetch("/assign",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
       },
        body: JSON.stringify({monday:monday,tuesday:tuesday,wednesday:wednesday,thursday:thursday,friday:friday,saturday:saturday,sunday:sunday,id:id})

    })

    const data = await response.json();


    if(!response.ok){
        console.log("error");
    }
    else{
        console.log("Updated!");
    }



}


async function get_workouts(){
  let client=document.getElementById("view_client").value;
  console.log(client);
}