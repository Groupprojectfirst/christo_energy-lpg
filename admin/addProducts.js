
const fetchAdmin = (url) => {
    fetch(url, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == "login first") {
          console.log(res)
        //  alert("login first. Redirecting you now")
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

  
  const fuelsData = [
    { name: "Petrol", price: 700, availability: "Available" },
    { name: "Diesel", price: 700, availability: "Available" },
    { name: "Kerosene", price: 700, availability: "Available" },
    { name: "Cooking gas", price: 700, availability: "Available" },
  ];

  
  const fetchFuels=()=>{
    fetch("http://127.0.0.1:8080/api/allfuels",{
      method:"GET",
      credentials:'include'
    })
    .then((res)=>{
     return res.json()
    })
    .then((res)=>{
      console.log(res)
      generateFuelTable(res)
    })
  }

  fetchFuels()



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
  
  const loadingPopup = document.getElementById('loadingPopup');
  loadingPopup.style.display = 'none';
  
  // Function to show loading popup
  function showLoadingPopup() {
   loadingPopup.style.display = 'flex';
  }
  


 
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
    if (e.target.files.length > 1) {
        showAuthPopup("you can only select 1 image", "red")
       return;
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
  // Check if any input is empty
  const inputsEmpty = Array.from(allForm.querySelectorAll("input")).some(item => item.value === "");
  if (inputsEmpty || imageArray.length===0) {
    // alert("Please fill in all fields");
    showAuthPopup("Pls fill in all fields", "red")
    return; // Stop further execution if any input is empty
  }
const product = {
    images: imageArray,
    productName: product_name.value,
    productPrice: product_price.value,
    quantity: product_quantity.value,
  };

  showLoadingPopup()

  sendData("http://127.0.0.1:8080/api/postProduct", product);
  imageArray = []; // Reset imageArray
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
          showAuthPopup("An error occured", "red")
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if(data.message=="login first"){ 
        // alert("login first")
        setTimeout(()=>{
            window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/";
        }, 1000)
        }else{
            console.log('Received data:', data);
            showAuthPopup("Product uploaded!", "green")
            setTimeout(()=>{
              window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin/postProducts.html";
            }, 1000)
        }
      })
      .catch(error => {
        showAuthPopup("An error occured", "red")
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

 
  function generateFuelTable(array) {
    const container = document.querySelector("#fuelTableContainer table");

    const htmlContent = `
            ${array.map(fuel => `
              <tr>
                <td>${fuel.fuel}</td>
                <td>${fuel.amount_per_liter}</td>
                <td>${new Date(fuel.updatedAt).toISOString().split('T')[0]}</td>
                <td>${fuel.availability}</td>
              </tr>`).join('')}
    `;

    container.innerHTML = htmlContent;
  }


   // handling popups
  // handling popups
  const editPopup=document.querySelector(".postProductCont .fuelPopupCont")
  const addNewPopup=document.querySelector(".postProductCont .fuelPopupCont2")
  const wrapper=document.querySelector(".postProductCont .wrapper")
  
  const okClose1=document.querySelector(".postProductCont .fuelPopupCont .fuelPopup .closeBut")
  const okClose2=document.querySelector(".postProductCont .fuelPopupCont2 .fuelPopup .closeBut")
 
 
  const enterButton1=document.querySelector(".postProductCont .fuelPopupCont .fuelPopup .enterButton")
  const enterButton2=document.querySelector(".postProductCont .fuelPopupCont2 .fuelPopup .enterButton")


  const addFuel=document.querySelector(".postProductCont .buttons .addNewFuel")
  const editFuel=document.querySelector(".postProductCont .buttons .editFuel")

  wrapper.style.display="none"

  addFuel.addEventListener("click", ()=>{
    addNewPopup.style.display="flex"
    // wrapper.style.display="flex"
  })

  editFuel.addEventListener("click", ()=>{
    editPopup.style.display="flex"
    // wrapper.style.display="flex"
  })
  
  okClose1.addEventListener("click", ()=>{
    editPopup.style.display="none"
    // wrapper.style.display="none"
  })
  okClose2.addEventListener("click", ()=>{
    addNewPopup.style.display="none"
    // wrapper.style.display="none"
  })
  // wrapper.addEventListener("click", ()=>{
  //   addNewPopup.style.display="none"
  //   editPopup.style.display="none"
  //   // wrapper.style.display="none"
  // })


  //makeFuelEdits
  enterButton1.addEventListener('click', (e)=>{
   e.preventDefault()
     const fuelName=document.querySelector(".fuelPopupCont .fuelPopup #chooseFuel").value
     const amount=document.querySelector(".fuelPopupCont .fuelPopup .fuel_amt").value
     const availability=document.querySelector(".fuelPopupCont .fuelPopup #set_availability").value
   
     if(fuelName=="" || amount=="" || availability==""){
      return;
     }else{
      editFuelHandler(fuelName, availability, amount)
     }
  })

  //add new fuel
  enterButton2.addEventListener('click', (e)=>{
   e.preventDefault()
     const fuelName=document.querySelector(".fuelPopupCont2 .fuelPopup .enterNew").value
     const amount=document.querySelector(".fuelPopupCont2 .fuelPopup .fuel_amt").value
     
     if(fuelName=="" || amount=="" ){
      return;
     }else{
      addFuelHandler(fuelName, amount)
     }
  })



  
function addFuelHandler( fuel,amount_per_liter) {
  fetch("http://127.0.0.1:8080/api/postFuel", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Assuming JSON data
    },
    credentials:'include',
    body: JSON.stringify({
      fuel:fuel,
      amount_per_liter:amount_per_liter
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
     if(data.message=="success"){
      alert("Added!")
      setTimeout(()=>{
        window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin/postProducts.html";
      }, 1000)   
     }else{
      console.log(data)
     }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}


  const editFuelHandler=(name, availability, price)=>{
    fetch("http://127.0.0.1:8080/api/makeFuelUpdates", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Assuming JSON data
      },
      credentials:'include',
      body: JSON.stringify({name:name,
         new_amount_per_liter:price,
          availability:availability})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if(data.message=="fuel updated"){
          alert("Updated!")
          setTimeout(()=>{
            window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin/postProducts.html";
          }, 1000)   
         }else{
          console.log(data)
         }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
