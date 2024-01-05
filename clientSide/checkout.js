// JavaScript functionality related to checkout page
// Add event listeners, handle form submission, etc.
document.addEventListener("DOMContentLoaded", function() {
    // Add your JavaScript logic here
  });

const fetchUser = (url) => {
fetch(url, {
method: "GET",
credentials: "include"
})
.then((res) => res.json())
.then((res) => {
  if (res.message == "login first") {
    console.log(res)
    localStorage.setItem("userId", "")
  } else {
    console.log(res)
    localStorage.setItem("userId", res.user.id)
  }
});
};

fetchUser("http://127.0.0.1:8080/api/user")



 
const allInputs=document.querySelector(".section-content")  
const button=document.querySelector(".checkout-button")

const orderType=localStorage.getItem("orderType")


const order=JSON.parse(localStorage.getItem("userOrder"))

const sendOrder=(url, orderData)=>{
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', // Assuming JSON data
    },
    credentials:'include',
    body: JSON.stringify(orderData)
  })
    .then((res) => res.json())
    .then((res) => {
     console.log(res)
    })
}

button.addEventListener('click', ()=>{
  if(orderType=="REFILL"){
  var userData={
    userId:localStorage.getItem("userId"),
    orderId:generateUniqueID(),
    ref:"",
    transactionType:"refills",
    phone:allInputs.querySelector(".phone").value,
    fuelType:order.fuelType,
    amountPaid:Number(order.amountPerLiter) * Number(order.liters),
    fuelQuantity:order.liters,
    buyer:allInputs.querySelector(".name").value,
    email:allInputs.querySelector(".email").value,
    address:allInputs.querySelector(".address").value
  }
  sendOrder("http://127.0.0.1:8080/api/order", userData)
  alert("order sent. Check your email")
  setTimeout(()=>{
    window.location.href="http://127.0.0.1:5500/lpg-christo-website"
   }, 1000)
  }else{
    fetch("http://127.0.0.1:8080/api/myCarts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Assuming JSON data
      },
      credentials:'include',
      body: JSON.stringify({ buyerId: localStorage.getItem("userId")})
    })
      .then((res) => res.json())
      .then((res) => {
       if(!res.data){
          return
       }else{
        console.log(res.data)
        var userData={
          order:res.data,
          orderId:generateUniqueID(),
          userId:localStorage.getItem("userId"),
          ref:"",
          transactionType:"not-refills",
          phone:allInputs.querySelector(".phone").value,
          buyer:allInputs.querySelector(".name").value,
          email:allInputs.querySelector(".email").value,
          address:allInputs.querySelector(".address").value
        }
        console.log(userData)
        sendOrder("http://127.0.0.1:8080/api/order", userData)
        alert("order sent. Check your email")
        setTimeout(()=>{
          window.location.href="http://127.0.0.1:5500/lpg-christo-website"
         }, 1000)
       }});
  }
})


  function generateUniqueID() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const idLength = 15;
    let id = '';
  
    if (window.crypto && window.crypto.getRandomValues) {
      const values = new Uint32Array(idLength);
      window.crypto.getRandomValues(values);
  
      for (let i = 0; i < idLength; i++) {
        id += charset[values[i] % charset.length];
      }
    } else {
      // Fallback to Math.random() for less secure randomness
      for (let i = 0; i < idLength; i++) {
        id += charset.charAt(Math.floor(Math.random() * charset.length));
      }
    }
  
    return id;
  }

        
  function sendData(url, dataToSend) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assuming JSON data
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }


  fetchUser("http://127.0.0.1:8080/api/user")