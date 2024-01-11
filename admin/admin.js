const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler=document.querySelector(".theme-toggler");
const logoutButton=document.querySelector('.logoutAdmin')


menuBtn.addEventListener('click', ()=>{
    sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click', ()=>{
    sideMenu.style.display = 'none';


})


themeToggler.addEventListener('click', () =>{
    document.body.classList.toggle('dark-theme-variables');


    themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
    themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
} )

// orders.forEach(order =>{
//     const tr = document.createElement('tr');
//     const trContent = ` <td>${order.productName}</td>
//                     <td>${order.productNumber}</td>
//                     <td>${order.paymentStatus}</td>
//                     <td class="${order.shipping ===
//                     'Declined'? 'danger' : order.shipping ===  'pending' ? 'warning' : 'primary'} ">${order.shipping}</td>
//                     <td class="primary">Details</td>
//                     `;

//                     tr.innerHTML = trContent;
//                     document.querySelector('table tbody').appendChild(tr);


// })


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
          fetchCustomers()
          fetchOrders()
          fetchReports()
         localStorage.setItem("adminloggedin", "true")
         }
      });
  };

  const reportsCount=document.querySelector(".sidebar .reports_ .message-count")
  const customersCount=document.querySelector(".sidebar .customers_ .message-count")
  const ordersCount=document.querySelector(".sidebar .orders_ .message-count")

//   reportsCount.style.display="none"
//  customersCount.style.display="none"
//  ordersCount.style.display="none"

  console.log(reportsCount, customersCount, ordersCount)

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

  
logoutButton.addEventListener('click', ()=>{
  showQuestionPopup("Are you sure you want to logout?")
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

// Function to handle confirmation in question prompt popup
function confirmAction() {
  closeQuestionPopup(); 
  logout("http://127.0.0.1:8080/api/logoutAdmin")
  window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin";
}

const fetchCustomers=()=>{
  var allArr=[]
  fetch("http://127.0.0.1:8080/api/allBuyers", {
            method: "GET",
            credentials: "include"
          })
            .then((res) => res.json())
            .then((res) => {
              //  console.log(res) 
              res.map((item, i)=>{
               if(item.seen=="NOT-SEEN"){
                customersCount.style.display=""
                allArr.push(item)
               }else{
                customersCount.style.display="none"
                return;
               }
              })
              // console.log(allArr)
              customersCount.textContent=allArr.length
      })
}
const fetchOrders=()=>{
  var allArr=[]
  fetch("http://127.0.0.1:8080/api/fetchAllOrders", {
    method: "GET",
    credentials: "include"
  })
    .then((res) => res.json())
    .then((res) => {
      //  console.log(res)
      res.map((item, i)=>{
        if(item.seen=="NOT-SEEN"){
          ordersCount.style.display=""
         allArr.push(item)
        }else{
          ordersCount.style.display="none"
         return;
        }
       })
      //  console.log(allArr)
       ordersCount.textContent=allArr.length
    })
}


const fetchReports = () => {
  var allArr = [];
  fetch("http://127.0.0.1:8080/api/getAllEvents", {
    method: "GET",
    credentials: "include"
  })
  .then((res) => res.json())
  .then((res) => {
    allArr = res.filter(item => item.seen === "NOT-SEEN");
    console.log(allArr);
    reportsCount.textContent = allArr.length;
    reportsCount.style.display = allArr.length > 0 ? "" : "none";
  })
  .catch((error) => {
    // Handle errors or show error messages to the user
    console.error('There was a problem fetching the reports:', error);
  });
};

  fetchAdmin("http://127.0.0.1:8080/api/adminside")





