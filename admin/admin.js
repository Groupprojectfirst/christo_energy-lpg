const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector(".hamBurger");
const closeBtn = document.querySelector("#close-btn");
const themeToggler=document.querySelector(".theme-toggler");
const logoutButton=document.querySelector('.logoutAdmin')


menuBtn.addEventListener('click', ()=>{
    sideMenu.style.transform = "translateX(0%)";
})

closeBtn.addEventListener('click', ()=>{
    sideMenu.style.transform ="translateX(-200%)";


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

  reportsCount.style.display="none"
 customersCount.style.display="none"
 ordersCount.style.display="none"

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

const allSales=document.querySelector("main .insights .sales h1")
const allRefils=document.querySelector("main .insights .expenses h1")
const totalIncome=document.querySelector("main .insights .income h1")

const totalOnlineOrders=document.querySelector(".right .sales-analytics .online  .right .value ")
const totalCustomers=document.querySelector(".right .sales-analytics .custormers  .right .value")

// console.log(recentOrders)


const fetchReports = () => {
  var allArr = [];
  fetch("http://127.0.0.1:8080/api/getAllEvents", {
    method: "GET",
    credentials: "include"
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
    renderNotifications(res)
    allArr = res.filter(item => item.seen === "NOT-SEEN");
    // console.log(allArr);
    reportsCount.textContent = allArr.length;
    reportsCount.style.display = allArr.length > 0 ? "" : "none";
  })
  .catch((error) => {
    // Handle errors or show error messages to the user
    console.error('There was a problem fetching the reports:', error);
  });
};
var salesCount=[]
var refillsCount=[]
var totalAmt=0
const fetchOrders=()=>{
  var allArr=[]
  fetch("http://127.0.0.1:8080/api/fetchAllOrders", {
    method: "GET",
    credentials: "include"
  })
    .then((res) => res.json())
    .then((res) => {
      //  console.log(res)
      generateOrderTable(sortOrdersByTime(res))
       res.forEach((item, i)=>{
        totalAmt += Number(item.amountPaid)
          if(item.transactionType=="REFILL"){
            refillsCount.push(item)
          }else{
            salesCount.push(item)
          }
       })
       totalIncome.textContent = `₦${addCommasToNumber(totalAmt)}`;

       totalOnlineOrders.textContent=res.length
       allSales.textContent=salesCount.length
       allRefils.textContent=refillsCount.length
       console.log(refillsCount)
       console.log(salesCount)
      allArr = res.filter(item => item.seen === "NOT-SEEN");
      // console.log(allArr);
      ordersCount.textContent = allArr.length;
      ordersCount.style.display = allArr.length > 0 ? "" : "none";
      //  console.log(allArr)
    })
}


// var totalCustomersCount=0
const fetchCustomers=()=>{
  var allArr=[]
  fetch("http://127.0.0.1:8080/api/allBuyers", {
            method: "GET",
            credentials: "include"
          })
            .then((res) => res.json())
            .then((res) => {
               console.log(res)
             totalCustomers.textContent=res.length
              allArr = res.filter(item => item.seen === "NOT-SEEN");
              // console.log(allArr);
              customersCount.textContent = allArr.length;
              customersCount.style.display = allArr.length > 0 ? "" : "none";
              // console.log(allArr)
      })
}


function generateOrderTable(array) {
  var ordersArr=[]
  const recentOrders=document.querySelector("main .recent-orders table tbody")
  const container=document.querySelector("main .recent-orders table tbody")

  array.forEach((item, i)=>{
    if(item.status=="DELIVERED"){
      return
    }
    else if(ordersArr.length==4){
      return
    }else{
      ordersArr.push(item)
    }
  })
  if(ordersArr.length==0){
    const noOrdersRow = document.createElement('tr');
    noOrdersRow.innerHTML = `
      <td colspan="4" style="text-align:center; color:gray;margin:15px; background:inherit; font-weight:bold">No Orders available</td>
    `;
    container.appendChild(noOrdersRow);
  }else{
     const htmlContent = `
          ${ordersArr.map(order =>  `
          <tr style="display: ${order.status=="DELIVERED"?"none":""}">
          <td>${order.itemName || order.fuelType}</td>
          <td>${order.orderId}</td>
          <td>Paid</td>
          <td class="warning">Pending</td>
      </tr>`
            ).join('')} `;

            console.log(ordersArr)
 recentOrders.innerHTML = htmlContent;
  }
 
}


function renderNotifications(notifications) {
  var notificationsArr=[]
 sortReportsByTime(notifications).forEach((item, i)=>{
    if(notificationsArr.length==4){
      return
    }else{
      notificationsArr.push(item)
    }
    
  })
  const container=document.querySelector(".right .indiv")
  var image=""

  if(notificationsArr.length===0){
    const noReportsRow = document.createElement('span');
    noReportsRow.style.textAlign="center"
    noReportsRow.style.background="inherit"
    noReportsRow.innerHTML = `
    <b>No reports available</b>
     `;
    container.appendChild(noReportsRow);
  }else{
    notificationsArr.forEach(notification => {
    // let color = '';
    switch (notification.event_type) {
      case 'New user':
        image = 'images/profile 4.jpeg';
        break;
      case 'New visitor':
        image = 'images/profile 3.jpeg';
        break;
      case 'New delivery':
        image = 'images/profile 2.jpeg';
        break;
      case 'New order':
        image = 'images/profile 5.jpeg';
        break;
      default:
        image = 'images/profile 6.jpeg';
        break;
    }
    container.innerHTML += `<div class="recent-updates indiv">
    <div class="updates ups">
        <div class="update">
            <div class="profile-photo">
                <img src="${image}" alt="">
            </div>
            <div class="message">
                <p>${notification.event_data}</p>
                <small class="text-muted">${new Date(notification.event_time).toISOString().split('T')[0]}</small>
            </div>
        </div>
        </div>
        </div>`;
  });
  }
  
}



function sortReportsByTime(arrayOfObjects) {
  arrayOfObjects.sort((a, b) => {
    // Compare the Date objects in reverse order
    return new Date(b.event_time) - new Date(a.event_time);
  });

  return arrayOfObjects;
}

function sortOrdersByTime(arrayOfObjects) {
  arrayOfObjects.sort((a, b) => {
     return new Date(b.createdAt) - new Date(a.createdAt);
   });
 
   return arrayOfObjects;
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






  fetchAdmin("http://127.0.0.1:8080/api/adminside")





