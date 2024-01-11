const cartValue=document.querySelector(".header-btn-group .badge")
const headerDetailsLoggedOut=document.querySelector('.header-btn-group .profile_form_user')
const headerDetailsLoggedIn=document.querySelector('.header-btn-group .userSignedin')

const foodMenu = document.querySelector('.food-menu-list');
var obj = { status: false};
const addItem=(item)=>{
  obj.status = true;
  obj.imageLink =item.images[0].image_path
  obj.itemName = item.product.product_name
  obj.price = item.product.product_price
  obj.quantity=1
  obj.productId=item.product.product_id
  obj.buyerId=localStorage.getItem("userId")
  
  saveItemToCart("http://127.0.0.1:8080/api/addToCart", obj )
  }



// add to carts
// add to carts
// add to carts
const card_banner=document.querySelectorAll(".food-menu-card .card-banner")
console.log(card_banner)
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
    console.log(item.product.status)
     foodMenu.innerHTML +=`
    <li>
      <div class="food-menu-card">
        <div class="card-banner">
          <img
            src="${item.images[0].image_path}"
            width="300"
            height="300"
            loading="lazy"
            alt="${item.product.alt}"
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
          <h3 class="h3 card-title">${item.product.product_name}</h3>
          <div class="price-wrapper">
            <p class="price-text">Price:</p>
            &#x20A6;<data class="price" value="${item.product.product_price}">${Number(item.product.product_price).toFixed()}</data>
            <del class="del">&#x20A6; ${Number(Number(item.product.product_price)* 0.01).toFixed()}</del>
          </div>
        </div>
      </div>
    </li>
  `  
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
       generateProductsList(res.Goods)
    })
}


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
  
  fetchProducts()

  fetchUser("http://127.0.0.1:8080/api/user")
  
  const menuItems = [
    {
      imgSrc: "/christo_energy-lpg/images/gas_set.jpg",
      alt: "Sets of gas cylinder",
      discount: "-15%",
      title: "Gas Cylinders",
      price: 18000,
      originalPrice: 20000
    },
    {
      imgSrc: "/christo_energy-lpg/images/cylinder.jpg",
      alt: "Cooking 4 burner gas cooker",
      discount: "-10%",
      title: "Gas Cooker",
      price: 85000,
      originalPrice: 100000
    },
    {
      imgSrc: "/christo_energy-lpg/images/electric_gas.jpg",
      alt: "Electric gas cooker",
      discount: "-25%",
      title: "Electric Gas Cooker",
      price: 88000,
      originalPrice: 110000
    },
    {
      imgSrc: "/christo_energy-lpg/images/gas_set.jpg",
      alt: "Sets of gas cylinder",
      discount: "-15%",
      title: "Gas Cylinders",
      price: 18000,
      originalPrice: 20000
    },
    // Add more menu items here...
  ];

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
  

