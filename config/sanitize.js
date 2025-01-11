
function isLettersAndNumbers(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}


function formatResponse(data) {
    return {
      success: true,
      data,
    };
  }
  

  function calculateSum(a, b) {
    return a + b;
  }

  console.log("Helpers");
  
 
  module.exports = {
    formatResponse,
    calculateSum,
  };