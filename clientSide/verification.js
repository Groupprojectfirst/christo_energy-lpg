const code=document.querySelector("#verification-code")
const button=document.querySelector("button")

button.addEventListener("click", (e)=>{
  e.preventDefault()
  console.log(code.value)
    if(code.value==""){
        showAuthPopup("Input the code sent to your email", "red")
        return;
    }else{
         sendData("http://127.0.0.1:8080/api/verifyCode", code.value)
    }
   
})


function sendData(url, dataToSend) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assuming JSON data
      },
      credentials:'include',
      body: JSON.stringify({code:dataToSend}),
    })
      .then(response => {
        if (!response.ok) {
          showAuthPopup("Please try again", "red")
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if(data.message=="Incorrect code"){
          showAuthPopup(data.message, "red")
        }else{
          // console.log('Received data:', data);
        showAuthPopup("Verification successful", "rgb(13, 187, 13)")
  
        setTimeout(()=>{
          window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/clientSide/login.html";
        }, 1200)
        }
      })
      .catch(error => {
        showAuthPopup("Please try again", "red")
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  

  function showAuthPopup(type, color) {
    const authPopup = document.getElementById('authPopup');
    const authMessage = document.getElementById('authMessage');
  
    if (type === 'success') {
      authMessage.textContent = 'Login Successful!';
      authMessage.style.border = '1px solid rgb(13, 187, 13);';
      authMessage.style.color = 'rgb(13, 187, 13);';
    } else if (type === 'error') {
      authMessage.textContent = 'Incorrect Password';
      authMessage.style.border = '1px solid red';
      authMessage.style.color = 'red';
    }else{
      authMessage.textContent=type
      authMessage.style.border = `1px solid ${color}`;
      authMessage.style.color = color;
    }
  
    authPopup.style.display = 'flex';
    setTimeout(() => {
      authPopup.style.display = 'none';
    }, 1500);
  }