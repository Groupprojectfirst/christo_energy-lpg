'use strict';

/* navbar toggle*/

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


document.getElementById('button').addEventListener('click',
function(){
  document.querySelector(".contr").style.display= 'flex';
});

document.querySelector('.close').addEventListener('click',
function(){
  document.querySelector('.contr').style.display = 'none';
});



document.getElementById('zip1').addEventListener("click", function () {
  document.querySelector(".sec").style.display = "flex";
});

document.querySelector('.clos').addEventListener("click",
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
