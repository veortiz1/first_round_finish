

let weight=[];
let height=[];
let exp=[];
let names=[];
let time=[];
let rounds=[];
let exercise_names=[];

async function get_clients_stats(){
    try{

        const response = await fetch("/clients/clientStats",{
            method:"GET"
        });
    
      
            const data= await response.json();
    
    
    
            if(!response.ok){
                console.log("Error gettin Data");
           

              
            } 
            else{
            
              names=data.name;
              height=data.height;
              weight=data.weight;
              exp=data.exp;
              exercise_names=data.exercise_name;
              rounds=data.rounds;
              time=data.time;
              console.log(names,height,weight,exp);
              console.log(rounds,time,exercise_names);
            }
        
        }
    
        catch(err){
            console.log("Error creating client: "+err);
        }
    

}


async function call_get_cleint_stats(){
   await  get_clients_stats();
    console.log("Height: "+height);
    let height_weight=[];
    let round_time=[];
    for(let i=0;i<height.length;i++){
    height_weight.push({x:height[i], y:weight[i],label:names[i]});
    }

    for(let i=0;i<exercise_names.length;i++){
        round_time.push({x:rounds[i],y:time[i],label:exercise_names[i]});
    }


    console.log(height_weight);
    console.log(round_time);
    const graph1 = document.getElementById('height_weight_graph').getContext('2d');
    const graph2 = document.getElementById('experience_graph').getContext('2d');
    const graph3 = document.getElementById('round_time_graph').getContext('2d');
    const graph4 = document.getElementById('height_graph').getContext('2d');
    const graph5 = document.getElementById('weight_graph').getContext('2d');
    const graph6 = document.getElementById('rounds_graph').getContext('2d');
    



new Chart(graph1, {
  type: 'scatter', 
  data: {
    labels: names, 
    datasets: [{
      label: 'Client Height/Weight',
      data: height_weight, 
      backgroundColor: '#655A7C', 
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
        x:{
            title:{
                display:true,
                text:'Weight(Lbs)'
            }
        },

        y:{
            title:{
                display:true,
                text:'Height(Inches)'
            }
        }

    }
  }
});


new Chart(graph2,{
    type: 'bar',
    data :{
        labels:names,
        datasets:[{
        label: 'Client Experience',
        data:exp,
        backgroundColor:'#655A7C'
        }]
            
        
      
    },
    options: {
        maintainAspectRatio: false,
        scales:{
            x:{
                title:{
                    display:true,
                    text:"Client Name"
                }
            },
            y:{
                title:{
                    display:true,
                    text:"Years of Expereince"
                }
            }
        }
    }
})


new Chart(graph3, {
    type: 'scatter', 
    data: {
      labels: exercise_names, 
      datasets: [{
        label: 'Exercise Round/Time',
        data: round_time, 
        backgroundColor: '#655A7C', 
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
          x:{
              title:{
                  display:true,
                  text:'Rounds'
              }
          },
  
          y:{
              title:{
                  display:true,
                  text:'Time(seconds)'
              }
          }
  
      }
    }
  });



new Chart(graph4,{
    type: 'bar',
    data :{
        labels:names,
        datasets:[{
        label: 'Client Height',
        data:height,
        backgroundColor:'#655A7C'
        }]
            
        
      
    },
    options: {
        maintainAspectRatio: false,
        scales:{
            x:{
                title:{
                    display:true,
                    text:"Client Name"
                }
            },
            y:{
                title:{
                    display:true,
                    text:"Height (inches)"
                }
            }
        }
    }
})



new Chart(graph5,{
    type: 'bar',
    data :{
        labels:names,
        datasets:[{
        label: 'Weight Graph',
        data:weight,
        backgroundColor:'#655A7C'
        }]
            
        
      
    },
    options: {
        maintainAspectRatio: false,
        scales:{
            x:{
                title:{
                    display:true,
                    text:"Client Name"
                }
            },
            y:{
                title:{
                    display:true,
                    text:"Weight(Lbs)"
                }
            }
        }
    }
})

new Chart(graph6,{
    type: 'bar',
    data :{
        labels:exercise_names,
        datasets:[{
        label: 'Rounds Per Exercise',
        data:rounds,
        backgroundColor:'#655A7C'
        }]
            
        
      
    },
    options: {
        maintainAspectRatio: false,
        scales:{
            x:{
                title:{
                    display:true,
                    text:"Exercise Name"
                }
            },
            y:{
                title:{
                    display:true,
                    text:"Rounds"
                }
            }
        }
    }
})







}

call_get_cleint_stats();


