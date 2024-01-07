const fetchAdmin = (url) => {
    fetch(url, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == "login first") {
          console.log(res)
         alert("login first. Redirecting you now")
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
               generateOrdersList(res);
            })
         }
      });
  };


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

  const ordersListHTML = orders.map((order) => {
    if (order.status === "DELIVERED") {
      return ''; // If the order is delivered, return an empty string
    } else {
      return `
        <div class="order" style="border:2px solid ${order.transactionType === "REFILL" ? 'orange' : "black"}">
          <p style="background:orange;width:fit-content;color:white;font-weight:bold; border-radius:4px; padding:10px; display: ${order.transactionType === "REFILL" ? 'block' : "none"}">Refill</p>
          <p style="background:black;width:fit-content;color:white;font-weight:bold; border-radius:4px; padding:10px;  display: ${order.transactionType === "REFILL" ? 'none' : "block"}">Purchase</p>
          <h2>Order Number: ${order.orderId}</h2>
          <p style="display: ${order.transactionType === "REFILL" ? 'none' : "block"}">Product: ${order.itemName}</p>
          <p style="display: ${order.transactionType === "REFILL" ? 'block' : "none"}">Fuel type: ${order.fuelType}</p>
          <p style="display: ${order.transactionType === "REFILL" ? 'block' : "none"}">Liters: ${order.fuelQuantity} liters</p>
          <p style="display: ${order.transactionType === "REFILL" ? 'none' : "block"}">Quantity: ${order.itemQuantity}</p>
          <p style="display: ${order.transactionType === "REFILL" ? 'block' : "none"}">Amount paid: ${Number(order.amountPaid) * Number(order.fuelQuantity)}</p>
          <p>Address: ${order.address}</p>
          <p style="display: ${order.transactionType === "REFILL" ? 'none' : "block"}">Amount: ${Number(order.amountPaid) * Number(order.itemQuantity)}</p>
          <p>Buyer: ${order.buyer}</p>
          <p>Phone number: ${order.phone}</p>
          <button onclick="orderDelivered('${order.orderId}')" style="padding: 10px; background: green; margin-top:10px; border: 1px solid white; color: white; font-weight: bold; border-radius: 4px; box-shadow: 0 0 3px black">Order delivered</button>
        </div>
      `;
    }
  }).join('');
  
  ordersContainer.innerHTML = ordersListHTML;
   
}


const orderDelivered=(id)=>{
  var result= confirm("Are you sure to confirm order and successful delivery?");
  if(result){
    fetch(`http://127.0.0.1:8080/api/confirmAnOrder`, {
      method: "PUT",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({orderId:id})
    })
      .then((res) => res.json())
      .then((res)=>{
        alert("Delivery confirmed")
        setTimeout(()=>{
          createNewEvent("New delivery", "You delivered an order!")
          window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin/orders.html";
        },1200)
      })
  }else{
    return
  }
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

// Call the function to generate orders list on page load
window.onload = function () {
    fetchAdmin("http://127.0.0.1:8080/api/adminside")
}