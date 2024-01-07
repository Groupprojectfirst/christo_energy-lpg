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

button.addEventListener('click', () => {
  const allInputs=document.querySelector(".section-content")  
  const inputs = allInputs.querySelectorAll("input");

  const invalidInputs = [];
  inputs.forEach((item) => {
    item.style.border = '1px solid #ccc';

    if (item.value === "") {
      item.style.border = '2px solid red';
      invalidInputs.push(item.name);
    } else if (item.name === "Email" && (!item.value.includes('@') || !item.value.includes('.'))) {
      item.style.border = '2px solid red';
      alert("Please enter a valid email");
      invalidInputs.push(item.name);
    }
  });

  if (invalidInputs.length === 0) {
    const orderType = localStorage.getItem("orderType"); 

    const userData = {
      userId: localStorage.getItem("userId"),
      orderId: generateUniqueID(),
      ref: "",
      transactionType: orderType === "REFILL" ? "refills" : "not-refills",
      phone: allInputs.querySelector(".phone").value,
      buyer: allInputs.querySelector(".name").value,
      email: allInputs.querySelector(".email").value,
      address: allInputs.querySelector(".address").value
    };

    if (orderType === "REFILL") {
      const order=localStorage.getItem("userOrder")
      userData.fuelType = JSON.parse(order).fuelType;
      userData.fuelQuantity = Number(JSON.parse(order).liters);
      userData.amountPaid = Number(JSON.parse(order).amountPerLiter) *Number(JSON.parse(order).liters);
      localStorage.setItem("myOrder", JSON.stringify(userData))
      makePayment('http://127.0.0.1:8080/api/makepayment', userData)
    } else {
      fetch("http://127.0.0.1:8080/api/myCarts", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ buyerId: localStorage.getItem("userId") })
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          userData.order = res.data;
          userData.totalAmountDue = calculateTotalPrice(res.data);
          localStorage.setItem("myOrder", JSON.stringify(userData))
          makePayment('http://127.0.0.1:8080/api/makepayment', userData)
        }
      })
      .catch((error) => console.error("Error fetching cart data:", error));
    }

    alert("Order sent. Redirecting to paystack...");
    // setTimeout(() => {
    //   window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/clientSide/";
    // }, 1000);
  }
});



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



  const makePayment=(url, data)=>{
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Assuming JSON data
      },
      credentials:'include',
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((res)=>{
        console.log(res)
        if(res.status==true){
          localStorage.setItem("ref", res.data.reference)
          localStorage.setItem("access_code", res.data.access_code)
          window.location.href=res.data.authorization_url
        }
        // sendOrder("http://127.0.0.1:8080/api/order", data);
      })
  }

  function calculateTotalPrice(products) {
    let totalPrice = 0;
  
    products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
  
    return totalPrice;
  }