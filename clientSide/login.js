const userDetails=document.querySelector("form")
const submitBut=userDetails.querySelector("button")

const allInputs=document.querySelectorAll(".login-form input")


submitBut.addEventListener("click", (e)=>{
  e.preventDefault()
const invalidInputs = [];
allInputs.forEach((item) => {
  item.style.border = '1px solid #ccc';

  if (item.value === "") {
    item.style.border = '1px solid red';
    invalidInputs.push(item.name);
    showAuthPopup("fill in all details", "red")
  } else if (item.name === "email" && (!item.value.includes('@') || !item.value.includes('.'))) {
    item.style.border = '1px solid red';
    showAuthPopup("Please enter a valid email", "red")
    invalidInputs.push(item.name);
  }
  else if (item.name === "password" && (item.value.length <= 6)) {
    item.style.border = '1px solid red';
    showAuthPopup("Password must be up to 7 chars", "red")
    invalidInputs.push(item.name);
  }
})

if(invalidInputs.length==0){
  var user = {
    email: userDetails.querySelector("#email").value,
    password: userDetails.querySelector("#password").value
   };
sendData("http://127.0.0.1:8080/api/login", user)
}
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
        showAuthPopup("Please try again", "red")
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if(data.status==false){
            console.log('Received data:', data);
            // alert(data.message)
            return
        }else{
         console.log('Received data:', data);
         showAuthPopup("Login successful", "green")
        //  setCookie("jwt", data.data.token, 10)
        // alert("Welcome back. Redirecting you back to the site")
        setTimeout(()=>{
          window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/clientSide";
        }, 1000)   
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
      authMessage.style.border = '1px solid color';
      authMessage.style.color = color;
    }
  
    authPopup.style.display = 'flex';
    setTimeout(() => {
      authPopup.style.display = 'none';
    }, 1500);
  }

  const loadingPopup = document.getElementById('loadingPopup');
  loadingPopup.style.display = 'none';
  function showLoadingPopup() {
    loadingPopup.style.display = 'flex';
     setTimeout(() => {
       loadingPopup.style.display = 'none';
     }, 4000);
   }
   