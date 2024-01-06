const userDetails=document.querySelector("form")
const submitBut=userDetails.querySelector(".button")

submitBut.addEventListener("click", (e)=>{
  e.preventDefault()
    var admin = {
        username: userDetails.querySelector("#username").value,
        password: userDetails.querySelector("#password").value,
        secretKey: userDetails.querySelector("#secretKey").value
       };
sendData("http://127.0.0.1:8080/api/adminLogin", admin)
})


function sendData(url, dataToSend) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assuming JSON data
      },
      credentials:'include',
      body: JSON.stringify(dataToSend)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if(data.status==false){
            console.log('Received data:', data);
            alert(data.message)
            return
        }else{
         console.log('Received data:', data);
        //  setCookie("jwt", data.data.token, 10)
        setTimeout(()=>{
          window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin/admin.html";
        }, 1000)   
        }  
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
