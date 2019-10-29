// Select elements we'll be reusing in the rest of our code
const usernameInput = document.querySelector("#signup__username");
const passwordInput = document.querySelector("#signup__password");
const passwordConfirmInput = document.querySelector(
    "#signup__password_confirm"
);
const submitButton = document.querySelector("button");
const strengthMeter = document.querySelector("#password_strength_meter");
const strengthMeterCode = ["strength-0", "strength-1", "strength-2", "strength-3", "strength-4", "strength-5"];

//添加submit按钮点击事件i
submitButton.addEventListener("click", submitForm);
//添加键盘up事件，回车提交，修改密码强度条，消除警告红框
window.addEventListener("keyup", function (k) {
    //回车提交
    if (k.keyCode === 13) {
        submitForm();
    }
    //消除警告红框
    passwordInput.classList.remove("missing");
    passwordConfirmInput.classList.remove("missing");
    //修改密码强度条，
    strengthMeter.className = strengthMeterCode[getPasswordStrengthFrom0To5(passwordInput.value)];
});
//提交事件
function submitForm() {
    //检查输入是否为空
    if (passwordInput.value === "") {
        passwordInput.classList.add("missing");
    } else if (passwordConfirmInput.value === "") {
        passwordConfirmInput.classList.add("missing");
    } else
    /*
    检查输入一致
     */
    if (passwordInput.value !== passwordConfirmInput.value) {
        window.alert("您的密码输入不一致，请检查一遍并重新输入");
    } else {
        window.alert("welcome!" + usernameInput.value + "!");
    }
}
//根据密码长度检查密码安全强度
function getPasswordStrengthFrom0To5(password) {
    return Math.round((Math.min(12, password.length) / 12) * 5);
}

