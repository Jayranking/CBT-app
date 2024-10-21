 // Sidebar Toggler
//  $('.sidebar-toggler').click(function () {
//     $('.sidebar, .content').toggleClass("open");
//     return false;
// })



// admin registration 
const adminRegForm = document.getElementById('adminRegForm');

adminRegForm.addEventListener('submit', (e) =>{

e.preventDefault();

const fullname = adminRegForm.fullname.value;
const email = adminRegForm.email.value;
const phone_no = adminRegForm.phone_no.value;
const gender = adminRegForm.gender.value;
const adminId = adminRegForm.adminId.value;


const fullnameErr = document.querySelector('.fullnameErr');
const emailErr = document.querySelector('.emailErr');
const phone_noErr = document.querySelector('.phone_noErr');
const genderErr = document.querySelector('.genderErr');



fullnameErr.innerHTML = '';
emailErr.innerHTML = '';
phone_noErr.innerHTML = '';
genderErr.innerHTML = '';


const fullnameReg  = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phone_noReg = /^0[1-9]\d{9}$/;


if (!fullnameReg.test(fullname)) {
    fullnameErr.innerHTML = 'Enter a valid fullname';
    throw Error ('Terminating')
}

if (!emailReg.test(email)) {
    emailErr.innerHTML = 'Enter a valid email address';
    throw Error ('Terminating')
}

if (!phone_noReg.test(phone_no)) {
    phone_noErr.innerHTML = 'Enter a valid phone number';
    throw Error ('Terminating')
}

if (gender == "") {
    genderErr.innerHTML = 'Select gender';
    throw Error('Terminating')
}

const data = {adminId, fullname, email, phone_no, gender};

fetch('/admin/edit-admin', {
    method: 'Post',
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









