
const decrease="decrease"
const increase="increase"
// Function to render items in the cart
function renderCart(arr) {
  cartItemsSection.innerHTML = '';
  let totalItems = 0;
  let totalPrice = 0;

  arr.forEach((cartItem, index) => {
    const cartItemElem = document.createElement('div');
    cartItemElem.classList.add('cart-item');
    cartItemElem.innerHTML = `
      <img src="http://127.0.0.1:5500/christo_energy-lpg/images/2kg_gas.jpg" alt="${cartItem.itemName}" class="item-image">
      <div class="item-details">
        <h3>${cartItem.itemName}</h3>
        <p>$${Number(cartItem.price).toFixed(2)}</p>
      </div>
      <div class="item-actions">
        <button onclick="removeItem('${cartItem.item_id}',' ${cartItem.buyerId}')"><i class="material-icons">remove_shopping_cart</i></button>
        <p>${cartItem.quantity}</p>
        <button onclick="updateCart(decrease, '${cartItem.quantity}', '${cartItem.item_id}', '${cartItem.productId}')"><i class="material-icons">remove</i></button>
        <button onclick="updateCart(increase,'${cartItem.quantity}','${cartItem.item_id}', '${cartItem.productId}')"><i class="material-icons">add</i></button>
      </div>
    `;
    cartItemsSection.appendChild(cartItemElem);

    totalItems += cartItem.quantity;
    totalPrice += cartItem.price * cartItem.quantity;
  });

  totalItemsSpan.textContent = totalItems;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

//fetching from carts
//fetching from carts
//fetching from carts
//fetching from carts
var buyerId=localStorage.getItem("userId")

console.log(buyerId)
const fetchCartItems = async(url, buyerId) => {
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', // Assuming JSON data
    },
    credentials:'include',
    body: JSON.stringify({ buyerId: buyerId})
  })
    .then((res) => res.json())
    .then((res) => {
     console.log(res.data)
     renderCart(res.data)
    });
};

fetchCartItems('http://127.0.0.1:8080/api/myCarts', buyerId)


// Sample items data
const items = [
    { name: 'Gasoline', price: 50.00, quantity:3, image: 'gasoline.jpg' },
    { name: 'Diesel', price: 40.00, quantity:1, image: 'diesel.jpg' },
    { name: 'Oil', price: 30.00, quantity:2, image: 'oil.jpg' },
    { name: 'Kerosene', price: 35.00, quantity:6, image: 'kerosene.jpg' },
    { name: 'Propane', price: 60.00, quantity:4, image: 'propane.jpg' }
  ];
  
  const cartItemsSection = document.querySelector('.cart-items');
  const totalItemsSpan = document.getElementById('totalItems');
  const totalPriceSpan = document.getElementById('totalPrice');
  
  let cart = []; // Empty cart to start
  

  
  // Function to remove an item from the cart
  function removeItem(id, buyerId) {
    var result= confirm("Are you sure you want to remove this item?");
  if(result){
    fetch(`http://127.0.0.1:8080/api/deleteitem/${id}`, {
      method: "delete",
      headers: {
        'Content-Type': 'application/json', // Assuming JSON data
      },
      credentials:'include'
    })
      .then((res) => res.json())
      .then((res) => {
       fetchCartItems('http://127.0.0.1:8080/api/myCarts', buyerId)
       });
    window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/clientSide/carts.html";
  }else{
    return
  }
  }
  
  // Function to update item quantity in the cart
 function updateCart(status, quantity, itemId, productId) {
  if(status=="decrease" && quantity==1){
    alert("how farr")
  }else{
    fetch(`http://127.0.0.1:8080/api/updateitem`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Assuming JSON data
      },
      credentials:'include',
      body:JSON.stringify({
        quantity:quantity,
        buyerId:buyerId,
        item_id:itemId,
        productId:productId,
        status: status
      })
    })
      .then((res) => res.json())
      .then((res) => {
       fetchCartItems('http://127.0.0.1:8080/api/myCarts', buyerId)
       });
  }
  }


  const checkoutBtn=document.querySelector("#checkoutBtn")
  checkoutBtn.addEventListener('click', ()=>{
    localStorage.setItem("orderType", "NOT-REFILL")
    window.open("http://127.0.0.1:5500/christo_energy-lpg/clientSide/checkout.html");
  })
  
