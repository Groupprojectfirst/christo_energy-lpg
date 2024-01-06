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
          console.log(res)
         localStorage.setItem("adminloggedin", "true")
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

  
logoutButton.addEventListener('click', ()=>{
   var result= confirm("Are you sure you want to logout?");
    if(result){
      logout("http://127.0.0.1:8080/api/logoutAdmin")
      window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin";
    }else{
      return
    }
  })

  fetchAdmin("http://127.0.0.1:8080/api/adminside")





