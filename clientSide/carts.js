
const decrease="decrease"
const increase="increase"
const loadingPopup = document.getElementById('loadingPopup');
loadingPopup.style.display = 'none';
// Function to render items in the cart
function renderCart(arr) {
  cartItemsSection.innerHTML = '';
  let totalItems = 0;
  let totalPrice = 0;

  if(!arr || arr.length===0){
    cartItemsSection.innerHTML = '<div style="padding:10px; width:100%; height:15em; display:flex; align-items:center; justify-content:center; text-align:center; font-weight:bold; border-radius:7px; ">No cart items</div>';
  }else{
    arr.forEach((cartItem, index) => {
    const cartItemElem = document.createElement('div');
    cartItemElem.classList.add('cart-item');
    cartItemElem.innerHTML = `
      <img src="${cartItem.imageLink}" alt="${cartItem.itemName}" class="item-image">
      <div class="item-details">
        <h3>${cartItem.itemName}</h3>
        <p>&#x20A6;${addCommasToNumber(Number(cartItem.price).toFixed(2))}</p>
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
  totalPriceSpan.textContent = addCommasToNumber(totalPrice.toFixed(2));
  }


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
  //   var result= confirm("Are you sure you want to remove this item?");
  // if(result){
    showQuestionPopup("Are you sure you want to remove this item?")
    localStorage.setItem("ID_1", id)
    localStorage.setItem("ID_2", buyerId)
  // }else{
  //   return
  // }
  }
  
  // Function to update item quantity in the cart
 function updateCart(status, quantity, itemId, productId) {
  if(status=="decrease" && quantity==1){
    return; 
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
    showLoadingPopup()
    localStorage.setItem("orderType", "NOT-REFILL")
    setTimeout(()=>{
      window.location.href="http://127.0.0.1:5500/christo_energy-lpg/clientSide/checkout.html"
    },2000)
  })
  

  
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

// Function to handle delete cart item
function confirmAction() {
  fetch(`http://127.0.0.1:8080/api/deleteitem/${localStorage.getItem("ID_1")}`, {
      method: "delete",
      headers: {
        'Content-Type': 'application/json', // Assuming JSON data
      },
      credentials:'include'
    })
      .then((res) => res.json())
      .then((res) => {
       fetchCartItems('http://127.0.0.1:8080/api/myCarts', localStorage.getItem("ID_2"))
       });
    window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/clientSide/carts.html";
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

// Function to show loading popup
function showLoadingPopup() {
 loadingPopup.style.display = 'flex';
  setTimeout(() => {
    loadingPopup.style.display = 'none';
  }, 4000);
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
