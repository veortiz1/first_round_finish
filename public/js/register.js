
function register(){

    let user=document.getElementById("username").value;
    let pass=document.getElementById("password").value;
    let email=document.getElementById("email").value;
    

    fetch("/users/add",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify({user:user,password:pass,email:email})
    })
    .then(response => response.json())
    .then(data => {

        if(data.message="User Added!"){
            console.log("user_added!!!!");
            window.location.href = '/profile';
            

        }
        else{
            console.log("user not added!!!!");
        }

        
        
      })
    .catch(error => {
        
        console.log(error)
    })
        
    


}


function login(){


    let user=document.getElementById("username").value;
    let pass=document.getElementById("password").value;
 
    

    fetch("/login",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify({user:user,password:pass})
    })
    .then(response => {

        if (!response.ok) {
            console.log("Errrrorr");
            console.log(response.status);


        }
        else{
            window.location.href = '/profile';
        }

  

        
        
      })
    .catch(error => {
        
        console.log(error)
    })
        

}