const changePwdForm = document.getElementById('changePwdForm');

changePwdForm.addEventListener('submit', (e) =>{
e.preventDefault()

///Fetching Error Divs
const oldPwdErr = document.querySelector('.oldPwdErr');
const newPwdErr = document.querySelector('.newPwdErr');
const confirmNewPwdErr = document.querySelector('.confirmNewPwdErr');


// //Resetting Regex
oldPwdErr.innerHTML = '';
newPwdErr.innerHTML = '';
confirmNewPwdErr.innerHTML = '';


//Getting Input Values
const oldPwd = changePwdForm.oldPwd.value;
const newPwd = changePwdForm.newPwd.value; 
const confirmPwd = changePwdForm.confirmPwd.value; 

// Regex for the Inputs
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+\[\]{}|;:,.<>?]).{8,}$/;

// If Statements
if (!passwordPattern.test(oldPwd)) {
    oldPwdErr.innerHTML = 'Incorrect password pattern'
};

if (!passwordPattern.test(newPwd)) {
    newPwdErr.innerHTML = 'Incorrect password pattern'
};
if (!passwordPattern.test(confirmPwd)) {
    confirmNewPwdErr.innerHTML = 'Please comfirm Password'
    
}
else if (confirmPwd != newPwd) {
    confirmNewPwdErr.innerHTML = 'Password not match'

}



const data = {oldPwd, newPwd}

fetch('/tutor/change-password', {
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