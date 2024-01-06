
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
         }
      });
  };



fetchAdmin("http://127.0.0.1:8080/api/adminside")


const allForm = document.querySelector('#add-product-form');
const addProductButton = document.querySelector('#add-product-form button');
const product_image=document.querySelector("#product-image")
const product_name=document.querySelector("#product-name")
const product_quantity=document.querySelector("#product-quantity")
const product_price=document.querySelector("#product-price")
var files = [];
var imageArray = [];

product_image.addEventListener("change", (e) => {
    imageArray=[]
    if (e.target.files.length > 4) {
        alert("You can only select 4 images");
    } else {
        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i]);
        }
        files.forEach((file, i) => {
            setFileToBase(file, (dataURI) => {
              // Add the data URI to the image array
              imageArray.push(dataURI);
            });
          })
    }
});


const setFileToBase = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const dataURI = reader.result;
    callback(dataURI); // Call the callback with the data URI
  };
};

addProductButton.addEventListener("click", (e) => {
    e.preventDefault();
      var product = {
        images:imageArray,
        productName:product_name.value,
        productPrice:product_price.value,
        quantity:product_quantity.value
       };
      sendData("http://127.0.0.1:8080/api/postProduct", product)
      imageArray=[]
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
        if(data.message=="loggin first"){
        alert("login first")
        setTimeout(()=>{
            window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/";
        }, 1000)
        }else{
            console.log('Received data:', data);
            alert("product uploaded! click to refresh")
            setTimeout(()=>{
              window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin/postProducts.html";
            }, 1000)
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  

  
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
  