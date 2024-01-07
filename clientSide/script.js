'use strict';

// JavaScript to check for cookie and show/close the visit prompt with sliding animation
window.onload = function() {
  const visitPrompt = document.getElementById('visitPrompt');
  checkNewVisit()
};

function closePrompt() {
  createNewSession(localStorage.getItem("userId") || "")
  const visitPrompt = document.getElementById('visitPrompt');
  visitPrompt.classList.remove('show'); // Remove 'show' class to slide out
}


// function for user visiting the site
// function for user visiting the site
const checkNewVisit=()=>{
  fetch("http://127.0.0.1:8080/api/newVisit", {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json', // Assuming JSON data
    },
    credentials:'include'
    })
    .then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then((res)=>{
      console.log(res)
      if(res.message=="New user"){
         setTimeout(()=>{
          visitPrompt.classList.add('show');
         },1000)
      }
    })
}

const createNewSession=(id)=>{
  fetch("http://127.0.0.1:8080/api/newSession", {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json', // Assuming JSON data
    },
    credentials:'include',
    body: JSON.stringify({userId: id}),
    })
    .then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then((res)=>{
      console.log(res)
      setTimeout(()=>{
        createNewEvent("New visitor", "You have a new visit today!")
      },2000)
    })
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


/* navbar toggle*/
const cartValue=document.querySelector(".header-btn-group .badge")
const headerDetailsLoggedOut=document.querySelector('.header-btn-group .profile_form_user')
const headerDetailsLoggedIn=document.querySelector('.header-btn-group .userSignedin')
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
     console.log(res)
     if(!res.data){
      localStorage.setItem("cartLength", 0)
      var cartsNum=localStorage.getItem("cartLength")
      cartValue.textContent=cartsNum
     }else{
      localStorage.setItem("cartLength", res.data.length)
      var cartsNum=localStorage.getItem("cartLength")
      cartValue.textContent=cartsNum
     }});
};

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
        console.log(headerDetailsLoggedOut)
        headerDetailsLoggedOut.style.display="none"
        headerDetailsLoggedIn.style.display="block"
        headerDetailsLoggedIn.querySelector(".name").textContent=res.user.email
        headerDetailsLoggedIn.querySelector("img").src="/images/2kg_gas.jpg"
       localStorage.setItem("userId", res.user.id)
       fetchCartItems('http://127.0.0.1:8080/api/myCarts', localStorage.getItem("userId"))
      }
    });
};


const logout=(url)=>{
  fetch(url, {
    method: "GET",
    credentials: "include"
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
}

headerDetailsLoggedIn.querySelector("button").addEventListener('click', ()=>{
 var result= confirm("Are you sure you want to logout?");
  if(result){
    logout("http://127.0.0.1:8080/api/logout")
    window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/clientSide/index.html";
  }else{
    return
  }
})



const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-nav-toggle-btn]");
menuToggleBtn.addEventListener("click", function (){
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for(let i = 0; i < navbarLinks.length; i++){
  navbarLinks[i].addEventListener("click", function (){
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}

/* header sticky & back to top*/
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function (){
  if (window.scrollY >= 100) {
       header.classList.add("active");
       backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/* search box toggle*/

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for(let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function (){
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}


/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function(){
   let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

   if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250){
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos){
      deliveryBoyMove++;
    } else {
      deliveryBoyMove--;
    }

    lastScrollPos = activeScrollPos;

    deliveryBoy.style.transform = `translate(${deliveryBoyMove}px)`; 


   }
});


// document.getElementById('button').addEventListener('click',
// function(){
//   document.querySelector(".contr").style.display= 'flex';
// });

// document.querySelector('.close').addEventListener('click',
// function(){
//   document.querySelector('.contr').style.display = 'none';
// });



document.getElementById('zip1').addEventListener("click", function () {
  document.querySelector(".sec").style.display = "flex";
});
document.querySelector('.about-content .btn-hover').addEventListener("click", function () {
  document.querySelector(".sec").style.display = "flex";
});
document.querySelector('.cta-content .btn-hover').addEventListener("click", function () {
  document.querySelector(".sec").style.display = "flex";
});

document.querySelector('.clos').addEventListener("click",
 function () {
  document.querySelector(".sec").style.display = "none";
});
document.querySelector('.wrapperForPopup').addEventListener("click",
 function () {
  document.querySelector(".sec").style.display = "none";
});


function validation() {
  if (document.FormFill.Username.value === "") {
    document.getElementById("result").innerHTML = "Enter Your Username";
    return false;
  } else if (document.FormFill.Email.value === "") {
    document.getElementById("result").innerHTML = "Enter Your Email";
    return false;
  } else if (document.FormFill.Password.value === "") {
    document.getElementById("result").innerHTML = "Enter Your Password";
    return false;
  } else if (document.FormFill.Password.value.length < 8) {
    document.getElementById("result").innerHTML = "Password must b 8 digits";
    return false;
  } else if (document.FormFill.CPassword.value === "") {
    document.getElementById("result").innerHTML = "Confirm Password";
    return false;
  } else if (
    document.FormFill.Password.value !== document.FormFill.CPassword.value
  ) {
    document.getElementById("result").innerHTML = "Password doesn't match";
    return false;
  } else if (
    document.FormFill.Password.value === document.FormFill.CPassword.value
  ) {
    popup.classList.add("open-slide");
    return false;
  }
}

var popup = document.getElementById("popup");

function closeSlide() {
  popup.classList.remove("open-slide");
}



// logic for booking now
// logic for booking now
// logic for booking now

const booking = document.querySelector('.sec .con .inner');
const quantityInput = booking.querySelector('input');

booking.querySelector('.bookRefillBut').addEventListener("click", (e) => {
 e.preventDefault();
 const selectedOption = booking.querySelector('#prod');
 const fuel = selectedOption.value;
 const amountPerLiter = selectedOption.selectedOptions[0].dataset.amount;
 const quantity = quantityInput.value;  
 if(!fuel || !quantity){
   alert("input the details!")
   return
 }else{
  const refilOrder={
  fuelType: fuel,
  liters: quantity,
  amountPerLiter:amountPerLiter 
 }

 localStorage.setItem("userOrder", JSON.stringify(refilOrder))
 localStorage.setItem("orderType", "REFILL")
 alert("order recieved")
 setTimeout(()=>{
  window.location.href="http://127.0.0.1:5500/christo_energy-lpg/clientSide/checkout.html"
 }, 1000)
 }
 
});




// user signup
// user signup
// user signup
// user signup

const userFormDetails=document.querySelector('.footer form')
const submitDetails=document.querySelector(".footer form button")

submitDetails.addEventListener("click", (e) => {
  e.preventDefault();
  var image = userFormDetails.querySelector(".userImg").files[0];

  setFileToBase(image, (dataURI) => {
    var user = {
      fullName: userFormDetails.querySelector(".userName").value,
      email: userFormDetails.querySelector(".userEmail").value,
      password: userFormDetails.querySelector(".userPass").value,
      date: userFormDetails.querySelector(".userDate").value,
      image: "dataURI",
      code: generateUniqueID()
     };

    console.log(user);
    sendData("http://127.0.0.1:8080/api/signup", user)
  });
});


function sendData(url, dataToSend) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Assuming JSON data
    },
    credentials:'include',
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
      alert("logging you in")

      setTimeout(()=>{
        createNewEvent("New user", "You have a new user today!")
        window.location.href = "http://127.0.0.1:5500/lpg-christo-website/login.html";
      }, 1200)
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}


const setFileToBase = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const dataURI = reader.result;
    callback(dataURI); // Call the callback with the data URI
  };
};

function generateUniqueID() {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const idLength = 6;
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



function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}



// add to carts
// add to carts
// add to carts
const foodMenu = document.querySelector('.food-menu-list');
var obj = { status: false};
const addItem=(item)=>{
  obj.status = true;
  obj.imageLink ="http://127.0.0.1:5501/christo_energy-lpg/images/cylinder.jpg";
  obj.itemName = item.product_name
  obj.price = item.product_price
  obj.quantity=1
  obj.productId=item.product_id
  obj.buyerId=localStorage.getItem("userId")
  
  saveItemToCart("http://127.0.0.1:8080/api/addToCart", obj )
  }

const saveItemToCart=(url, dataToSend)=>{
    fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json', // Assuming JSON data
    },
    credentials:'include',
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
    if(data.message=="login first"){
    alert("Login to add items to the cart")
    }else if(data.message=="Item already exists in the cart"){
      alert(data.message)
      return;
    } else{
    console.log(data)
    }
    fetchCartItems('http://127.0.0.1:8080/api/myCarts', localStorage.getItem("userId"))
    })
    .catch(error => {
    console.error('There was a problem with adding to carts:', error);
    });
}


const generateProductsList=(array)=>{
  array.forEach((item, i)=>{
    console.log(item.status)
    if(item.status=='0'){
      return;
    }else{
     foodMenu.innerHTML +=`
    <li>
      <div class="food-menu-card">
        <div class="card-banner">
          <img
            src="http://127.0.0.1:5500/christo_energy-lpg/images/2kg_gas.jpg"
            width="300"
            height="300"
            loading="lazy"
            alt="${item.alt}"
            class="w-100"
          />
          <div class="badge">15</div>
          <button class="btn food-menu-btn" onclick='addItem(${JSON.stringify(item)})'>add to cart</button>
          <div class="wrapper">
            <div class="rating-wrapper">
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
            </div>
          </div>
          <h3 class="h3 card-title">${item.product_name}</h3>
          <div class="price-wrapper">
            <p class="price-text">Price:</p>
            &#x20A6;<data class="price" value="${item.product_price}">${Number(item.product_price).toFixed()}</data>
            <del class="del">&#x20A6; ${Number(Number(item.product_price)* 0.01).toFixed()}</del>
          </div>
        </div>
      </div>
    </li>
  `  
    }
   
  })

}


const fetchProducts=()=>{
  fetch("http://127.0.0.1:8080/api/allProducts", {
    method: "GET",
    credentials: "include"
  })
    .then((res) => res.json())
    .then((res) => {
       console.log(res)
       generateProductsList(res)
    })
}


fetchUser("http://127.0.0.1:8080/api/user")
fetchProducts()
