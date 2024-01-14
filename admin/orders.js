const fetchAdmin = (url) => {
    fetch(url, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == "login first") {
          // console.log(res)
         showAuthPopup("Login first. Redirecting you now",  "rgb(13, 187, 13)")
         setTimeout(()=>{
            window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin";
         }, 1000)
          localStorage.setItem("adminloggedin", "false")
        } else {
          console.log(res)
         localStorage.setItem("adminloggedin", "true")
         fetch("http://127.0.0.1:8080/api/fetchAllOrders", {
            method: "GET",
            credentials: "include"
          })
            .then((res) => res.json())
            .then((res) => {
              //  console.log(res)
               generateOrdersList(sortByTime(res));
               updateSeen("http://127.0.0.1:8080/api/updateOrdersSeen")
            })
         }
      });
  };


  
  function updateSeen(url){
    fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json', // Set the content type if sending JSON data
      },
      credentials: 'include', // Include credentials such as cookies, authorization headers
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json(); // Return the parsed JSON promise
    })
    .then((data) => {
      console.log(data); // Access and handle the parsed JSON data
      // Perform actions with the data received from the server
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      // Handle errors or show error messages to the user
    });
  }

  

const orders = [
  // An array of product orders for testing
  // You can populate this array with your order data
  // Format: { orderNumber: 'Order Number', product: 'Product Name', quantity: 2 }
  // Example data below
  { orderNumber: '1234', product: 'LPG Cylinder', quantity: 3 },
  { orderNumber: '5678', product: 'LPG Regulator', quantity: 1 },
  { orderNumber: '1234', product: 'LPG Cylinder', quantity: 3 },
  { orderNumber: '5678', product: 'LPG Regulator', quantity: 1 },
  { orderNumber: '1234', product: 'LPG Cylinder', quantity: 3 },
  { orderNumber: '5678', product: 'LPG Regulator', quantity: 1 },
  { orderNumber: '1234', product: 'LPG Cylinder', quantity: 3 },
  // Add more orders here... 
];

// Function to generate orders list HTML
function generateOrdersList(orders) {
  const ordersContainer = document.getElementById('orders-container');
  console.log(orders)
  if(orders.length===0){
   const ordersListHTML=`<div style="background:whitesmoke; padding:10px; text-align:center; font-weight:bold; border-radius:7px; box-shadow:0 0 4px black">No pending orders</div>`
   ordersContainer.innerHTML = ordersListHTML;
  }else{
    const pendingOrders = orders.filter(order => order.status !== "DELIVERED");
    if (pendingOrders.length === 0) {
      const ordersListHTML = `
        <div style="background:whitesmoke; padding:10px; text-align:center; font-weight:bold; border-radius:7px; box-shadow:0 0 4px black">
          No pending orders
        </div>
      `;
      ordersContainer.innerHTML = ordersListHTML;
    }else{
      const ordersListHTML = orders.map((order, index) => {
        if (order.status === "DELIVERED") {
          return ''; // If the order is delivered, return an empty string
        } else {
          console.log(order)
          return `
            <div class="order" style="border:2px solid ${order.transactionType === "REFILL" ? 'orange' : "black"}">
              <p style="background:orange;width:fit-content;color:white;font-weight:bold; border-radius:4px; padding:10px; display: ${order.transactionType === "REFILL" ? 'block' : "none"}">Refill</p>
              <p style="background:black;width:fit-content;color:white;font-weight:bold; border-radius:4px; padding:10px;  display: ${order.transactionType === "REFILL" ? 'none' : "block"}">Purchase</p>
              <h2>Order Number: ${order.orderId}</h2>
              <p style="display: ${order.transactionType === "REFILL" ? 'none' : "block"}">Product: ${order.itemName}</p>
              <p style="display: ${order.transactionType === "REFILL" ? 'block' : "none"}">Fuel type: ${order.fuelType}</p>
              <p style="display: ${order.transactionType === "REFILL" ? 'block' : "none"}">Liters: ${order.fuelQuantity} liters</p>
              <p style="display: ${order.transactionType === "REFILL" ? 'none' : "block"}">Quantity: ${order.itemQuantity}</p>
              <p style="display: ${order.transactionType === "REFILL" ? 'block' : "none"}">Amount paid: &#x20A6;${addCommasToNumber(Number(order.amountPaid))}</p>
              <p>Address: ${order.address}</p>
              <p style="display: ${order.transactionType === "REFILL" ? 'none' : "block"}">Amount:&#x20A6; ${addCommasToNumber(Number(order.amountPaid) * Number(order.itemQuantity))}</p>
              <p>Buyer: ${order.buyer}</p>
              <p>Phone number: ${order.phone}</p>
              <button onclick="orderDelivered('${order.orderId}')" style="padding: 10px; background: green; margin-top:10px; border: 1px solid white; color: white; font-weight: bold; border-radius: 4px; box-shadow: 0 0 3px black">Order delivered</button>
            </div>
           
          `;
        }
      }).join('');
      ordersContainer.innerHTML = ordersListHTML;
    }
 }
   
}


const orderDelivered=(id)=>{
  showQuestionPopup("Are you sure to confirm order and successful delivery?")
  localStorage.setItem("ID_",id)
}



const createNewEvent=(eventType, eventData)=>{
  fetch("http://127.0.0.1:8080/api/newEvent", {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json', // Assuming JSON data
    },
    credentials:'include',
    body: JSON.stringify({ event_type:eventType, event_data:eventData}),
    })
    .then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then((res)=>{
      console.log(res)
    })
}


const loadingPopup = document.getElementById('loadingPopup');
loadingPopup.style.display = 'none';

// Function to show loading popup
function showLoadingPopup() {
 loadingPopup.style.display = 'flex';
}

// Function to show question prompt popup
function showQuestionPopup(writtenText) {
  const text = document.querySelector('#questionPopup p');
  const questionPopup = document.getElementById('questionPopup');
  questionPopup.style.display = 'flex';
  text.textContent=writtenText
}

// Function to close question prompt popup
function closeQuestionPopup() {
  const questionPopup = document.getElementById('questionPopup');
  questionPopup.style.display = 'none';
}

// Function to handle confirmation in question prompt popup
function confirmAction() {
  closeQuestionPopup();
  showLoadingPopup();

  fetch(`http://127.0.0.1:8080/api/confirmAnOrder`, {
    method: "PUT",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId: localStorage.getItem("ID_") })
  })
    .then((res) => res.json())
    .then((res) => {
     createNewEvent("New delivery", "You delivered an order!");

      // Delay the redirection slightly to ensure other operations complete
      setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin/orders.html";
      }, 100); // You can adjust the delay time as needed
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      // Handle the error condition here, if necessary
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

function sortByTime(arrayOfObjects) {
  arrayOfObjects.sort((a, b) => {
     return new Date(b.createdAt) - new Date(a.createdAt);
   });
 
   return arrayOfObjects;
 }


 
function addCommasToNumber(num) {
  // Convert the number to a string
  let numString = num.toString();

  // Split the integer and decimal parts
  let parts = numString.split('.');

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts back together
  let result = parts.join('.');

  return result;
}



// Call the function to generate orders list on page load
window.onload = function () {
    fetchAdmin("http://127.0.0.1:8080/api/adminside")
} 