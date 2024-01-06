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
               generateProductsList(res)
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

    products.forEach(product => {
      productsContainer.innerHTML += `
        <div class="product" style="display: flex; flex-direction: column; align-items: center; justify-content:center">
        <img style="width:8em; height:8em" src="http://127.0.0.1:5500/christo_energy-lpg/images/2kg_gas.jpg">
          <h2>${product.product_name}</h2>
          <p>Price: ${product.product_price}</p>
          <p>Quantity available: ${product.product_quantity}</p>
          <div class="product-buttons">
            <button class="add">Add to Homepage</button>
            <button class="remove">Delete Product</button>
          </div>
        </div>
      `;
    });
  }

window.onload = function () {
    fetchAdmin("http://127.0.0.1:8080/api/adminside")
}