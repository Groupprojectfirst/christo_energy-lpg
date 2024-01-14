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
      });
  };


const products = [
      { name: 'Product A', quantity: 20, category: 'Category 1' },
      { name: 'Product B', quantity: 15, category: 'Category 2' },
      { name: 'Product A', quantity: 20, category: 'Category 1' },
      { name: 'Product B', quantity: 15, category: 'Category 2' },
    ];

    function generateProductsList(products) {
    const productsContainer = document.getElementById('products-container');
    if(!products || products.length===0){
      productsContainer.innerHTML = `<div style="background:whitesmoke; padding:10px; text-align:center;width:100%; font-weight:bold; border-radius:7px; box-shadow:0 0 4px black">No products available</div>`
    }else{
      products.forEach(product => {
      productsContainer.innerHTML += `
        <div class="product" style="display: flex; flex-direction: column; align-items: center; justify-content:center">
        <img style="width:8em; height:8em" src="${product.images[0].image_path}">
          <h2>${product.product.product_name}</h2>
          <p>Price:&#x20A6;${addCommasToNumber(product.product.product_price)}</p>
          <p>Quantity available: ${product.product.product_quantity}</p>
          <div class="product-buttons">
            <button style="background:red; display: ${product.product.status==='1'? 'block':'none'}" class="add" onclick=removeProductsFromHomePage('${product.product.product_id}')>Remove from Homepage</button>
            <button style="background:blue; display: ${product.product.status==='0'? 'block':'none'}" class="add" onclick=addProductsToHomePage('${product.product.product_id}')>Add to Homepage</button>
            <button class="remove" onclick=deleteProduct('${product.product.product_id}')>Delete Product</button>
          </div>
        </div>
      `;
    });
    }
    
  }


// add products to the homepage
// add products to the homepage
// add products to the homepage
// add products to the homepage

const addProductsToHomePage=(id)=>{
  fetch(`http://127.0.0.1:8080/api/updateHomepage/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({status:"1"})
  })
    .then((res) => res.json())
    .then((res)=>{
      window.location.href="http://127.0.0.1:5500/christo_energy-lpg/admin/products.html"
    })
}
const removeProductsFromHomePage=(id)=>{
  fetch(`http://127.0.0.1:8080/api/updateHomepage/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({status:"0"})
  })
    .then((res) => res.json())
    .then((res)=>{
      window.location.href="http://127.0.0.1:5500/christo_energy-lpg/admin/products.html"
    })
}

const deleteProduct=(id)=>{
  console.log(id)
  fetch(`http://127.0.0.1:8080/api/deleteProduct/${id}`, {
    method: "DELETE", 
    credentials: "include"
  })
    .then((res) => res.json())
    .then((res)=>{
      console.log(res)
      window.location.href="http://127.0.0.1:5500/christo_energy-lpg/admin/products.html"
    })
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



window.onload = function () {
    fetchAdmin("http://127.0.0.1:8080/api/adminside")
}