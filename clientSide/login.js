const userDetails=document.querySelector("form")
const submitBut=userDetails.querySelector("button")

submitBut.addEventListener("click", (e)=>{
  e.preventDefault()
    var user = {
        email: userDetails.querySelector("#email").value,
        password: userDetails.querySelector("#password").value
       };
sendData("http://127.0.0.1:8080/api/login", user)
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
        alert(data.message + ". Redirecting you back to the site")
       
        setTimeout(()=>{
          window.location.href = "http://127.0.0.1:5500/lpg-christo-website/";
        }, 1000)   
        }  
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  



  // since the frontend is not saving cookies
  //its working now!
  // function setCookie(name, value, days) {
  //   var expires = "";
  //   if (days) {
  //     var date = new Date();
  //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  //     expires = "; expires=" + date.toUTCString();
  //   }
  //   document.cookie =
  //     name + "=" + (value || "") + expires + "; path=/";
  // }
