// Select elements we'll be reusing in the rest of our code
const usernameInput = document.querySelector("#signup__username");
const passwordInput = document.querySelector("#signup__password");
const passwordConfirmInput = document.querySelector(
  "#signup__password_confirm"
);
const submitButton = document.querySelector("button");
const strengthMeter = document.querySelector("#password_strength_meter");
const strengthMeterCode=["strength-0","strength-1","strength-2","strength-3","strength-4","strength-5"];

// PART 1: Show a confirmation message when the user clicks the submit button
submitButton.addEventListener("click", submitForm);
window.addEventListener("keyup", function (k) {
  if(k.keyCode===13){
    submitForm();
  }
  strengthMeter.className=strengthMeterCode[getPasswordStrengthFrom0To5(passwordInput.value)];
});
function submitForm() {
  /* YOUR CODE HERE */
  if(passwordInput.value===""){
    passwordInput.classList.add("missing");
  }else
    if(passwordConfirmInput.value===""){
    passwordConfirmInput.classList.add("missing")
    }else
  if(passwordInput.value!==passwordConfirmInput.value){
    window.alert("您的密码输入不一致，请检查一遍并重新输入")
  }else {
    window.alert("welcome!" + usernameInput.value + "!")
  }
}
/* YOUR CODE HERE */



// PART 2: Check if the password and password confirmation values match

/* YOUR CODE HERE (might not be necessary) */



// PART 3: Submit the form on "enter" key press

/* YOUR CODE HERE */



// PART 4: Highlight missing fields in the form on invalid submission

/* YOUR CODE HERE */



// PART 5: Check password strength as the user types
function getPasswordStrengthFrom0To5(password) {
  return Math.round((Math.min(12, password.length) / 12) * 5);
}

/* YOUR CODE HERE */
