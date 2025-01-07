

function create_client(){
    let name=document.getElementById("name").value;
    let height=document.getElementById("height").value;
    let weight=document.getElementById("weight").value;
    let exp=document.getElementById("experience").value;
    let phone=document.getElementById("phone").value;



    fetch("/clients",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify({name:name,height:height,weight:weight,experience:exp,phone:phone})
    })
    .then(response =>{
        if(!response.ok){
            console.log("Client wasnt added sadly");
        } 
        else{
            console.log("Client was added");
        }
    }
        
        )
    .catch(error => {
        
        console.log(error)
    })


}


async function delete_client(id){


    try{

   const response= await fetch('/clients/'+id,
   {method: 'DELETE'}
   );

   const data= await response.json();

   if(!response.ok){
    console.log(data.message);

   }
   else{
    console.log("Client deleted!");
    document.getElementById(`client_${id}`).remove();
   }

}
catch(err){
    console.log("Error: "+err);
}



    
}


async function edit_client(id){
    try{
        console.log("here");

        const response= await fetch('clients/setCID/'+id,
        {method: 'get'},
        );
        console.log("here1");
     
        const data= await response.json();
     
        if(!response.ok){
         console.log(data.message);
     
        }
        else{
         console.log("Client Edit");

     window.location.href='/edit_client';
         
        }
     
     }
     catch(err){
         console.log("Error: "+err);
     }
     

}

async function edit_client_form(){
    let name=document.getElementById("name").value;
    let height=document.getElementById("height").value;
    let weight=document.getElementById("weight").value;
    let exp=document.getElementById("experience").value;
    let phone=document.getElementById("phone").value;

    try{
        const response=await fetch("/clients",{
            method: "put",
            headers: {
                "Content-Type": "application/json"
    
            },
            body: JSON.stringify({name:name,height:height,weight:weight,phone:phone,experience:exp})
        })

        const data= await response.json();
        if(!response.ok){
            console.log("Client Couldnt be updated!");
        }
        else{
            
            document.getElementById("edit_name").innerText="Current Name: "+data.name;
            document.getElementById("edit_height").innerText="Current Height: "+data.height;
            document.getElementById("edit_weight").innerText="Current Weight: "+data.weight;
            document.getElementById("edit_phone").innerText="Current Experience: "+data.phone;
            document.getElementById("edit_experience").innerText="Current Experience: "+data.experience;
        }



    }
    catch(err){
        console.log('Error while editing client: '+err);

}

}