var password = document.getElementById("pass1"),
  confirm_password = document.getElementById("pass2");

function validatePassword() {
  if (pass1.value != pass2.value) {
    pass2.setCustomValidity("Passwords Don't Match");
  } else {
    pass2.setCustomValidity("");
  }
}

pass1.onchange = validatePassword;
pass2.onkeyup = validatePassword;


function myFunction() {
  var x = document.getElementById("pass1");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


function miFunction() {
  var y = document.getElementById("pass2");
  if (y.type === "password") {
    y.type = "text";
  } else {
    y.type = "password";
  }
}

function checkPass() {
  var pass1 = document.getElementById("pass1");
  var pass2 = document.getElementById("pass2");
  var message = document.getElementById("error-nwl");
  var goodColor = "#66cc66";
  var badColor = "#ff6666";
  if (pass1.value == pass2.value) {
    pass2.style.backgroundColor = goodColor;
    message.style.color = goodColor;
    message.innerHTML = "ok!";
  } else {
    pass2.style.backgroundColor = badColor;
    message.style.color = badColor;
    message.innerHTML = " These passwords don't match";
  }

  if (pass1.value.length > 5) {
    pass1.style.backgroundColor = goodColor;
    message.style.color = goodColor;
    message.innerHTML = "character number is ok!";
  } else {
    pass1.style.backgroundColor = badColor;
    message.style.color = badColor;
    message.innerHTML = " you have to enter at least 6 digit!";
  }
}





