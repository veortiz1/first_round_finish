

async function create_client(){
    let name=document.getElementById("name").value;
    let height=document.getElementById("height").value;
    let weight=document.getElementById("weight").value;
    let exp=document.getElementById("experience").value;
    let phone=document.getElementById("phone").value;
    let token=document.getElementById("csrf_add").value;

    console.log(token);

    try{

    const response = await fetch("/clients",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify({name:name,height:height,weight:weight,experience:exp,phone:phone,token:token})
    });

  
        const data= await response.json();



        if(!response.ok){
       
         if(!data.error){
            error=data.message;
         }
         else{
            error="Client Not Added "+data.error;
         }
            document.getElementById("error").innerText=error;
            document.getElementById("error").style.color="red";
          
        } 
        else{
            console.log("Client was added");
            document.getElementById("error").innerText="Client Added refresh page to see changes!";
            document.getElementById("error").style.color="green";
            
        }
    
    }

    catch(err){
        console.log("Error creating client: "+err);
    }


        
        




}


async function delete_client(id,token){


    try{

   const response= await fetch('/clients/'+id+"/"+token,
   {method: 'DELETE'}
   );

   const data= await response.json();

   if(!response.ok){
    console.log(data.message);

   }
   else{
    console.log("Client deleted!");
 
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
    let token=document.getElementById("csrf_add_edit").value;

    try{
        const response=await fetch("/clients",{
            method: "put",
            headers: {
                "Content-Type": "application/json"
    
            },
            body: JSON.stringify({name:name,height:height,weight:weight,phone:phone,experience:exp,token:token})
        })

        const data= await response.json();
        if(!response.ok){
            if(!data.error){
                console.log("Client Couldnt Be Updated! "+data.message);

            }
            else{
                console.log("Client Couldnt Be Updated! "+data.error);
            }
           
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