function validation() {
  if(document.FormFill.Username.value === "") {
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
  }
  else if (document.FormFill.CPassword.value === "") {
    document.getElementById("result").innerHTML = "Confirm Password";
    return false;
  }
   else if (document.FormFill.Password.value !== document.FormFill.CPassword.value) {
    document.getElementById("result").innerHTML = "Password doesn't match";
    return false;
  } else if (document.FormFill.Password.value === document.FormFill.CPassword.value) {
    popup.classList.add("open-slide")
    return false;
  }
}

var popup = document.getElementById('popup');

function closeSlide() {
  popup.classList.remove("open-slide")
}