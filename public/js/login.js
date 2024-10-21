
//Showing and Hiding Password
const showHidePassword = document.querySelectorAll('.showHidePassword');
const password = document.querySelectorAll('.passwordeye');

showHidePassword.forEach(eyeshow => {
     eyeshow.addEventListener('click', () => {
          password.forEach(passwd => {
               if (passwd.type === "password") {
                    passwd.type = "text";
                    ////Change icon
                    showHidePassword.forEach(icon => {
                         icon.classList.replace('uil-eye', 'uil-eye-slash')
                    });
               } else{
                    passwd.type = 'password';
                    showHidePassword.forEach(icon => {
                         icon.classList.replace('uil-eye-slash', 'uil-eye')
                    });
               }
          });
     })
});

//Login Form VAlidation

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) =>{
     e.preventDefault()

     ///Fetching Error Divs
const reg_noErr = document.querySelector('.reg_noErr');
const passwordErr = document.querySelector('.passwordErr');

// //Resetting Regex
reg_noErr.innerHTML = '';
passwordErr.innerHTML = '';

//Getting Input Values
const reg_no = loginForm.reg_no.value;
const password = loginForm.password.value; 

// Regex for the Inputs

const reg_noReg = /^\d{4}\/[a-zA-Z]{2}\/\d+$/;
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+\[\]{}|;:,.<>?]).{8,}$/;

// If Statements
if (!reg_noReg.test(reg_no)) {
     reg_noErr.innerHTML = 'Incorrect Registration Number'
};

if (!passwordReg.test(password)) {
     passwordErr.innerHTML = 'Incorrect Password'
}

const data = {reg_no, password}

fetch('/auth/sign-in', {
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     headers: {
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
 })
 .then(res => res.json())
   .then((data) => {
       if (data.success) {
           $(document).ready(() => {
               iziToast.success({
                   title: 'Ok',
                   message: data.msg,
               });
           });

           setInterval(() => {
               window.location.href = data.redirectURL;
           }, 2000);
       }
       if (data.error) {
           // Invoke the toast component
           $(document).ready(() => {
               iziToast.error({
                   title: 'Error',
                   message: data.error,
               });
           });
       }
   })
   .catch(e => {
       console.log(e)
   })

});



