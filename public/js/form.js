// const btnNext = document.querySelector('.next');
// const btnPrev = document.querySelector('.prev');
// const indicator = document.querySelector('.indicators .line span');
// const indicatorItems = document.querySelectorAll('.indicators p');
// const form = document.querySelector('.registerForm');
// const allTab = document.querySelectorAll('.tab');

// let i = 0; 

// allTab[i].classList.add('show');
// indicator.style.width = i;
// indicatorItems[i].classList.add('active');

// if (i === 0) {
//      btnPrev.style.display = 'none'
// } else{
//      btnPrev.style.display = 'block'  
// }

// function validateFullName(fullName) {
//      const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
//      return regex.test(fullName);
//  }
 
//  // Function to validate registration number
//  function validateRegNo(reg_no) {
//      const regex = /^\d{4}\/[a-zA-Z]{2}\/\d+$/;
//      return regex.test(reg_no);
//  }
 
//  // Function to validate phone number
//  function validatePhoneNumber(phone_no) {
//      const regex = /^0[1-9]\d{9}$/;
//      return regex.test(phone_no);
//  }
 
//  // Function to validate email
//  function validateEmail(email) {
//      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//      return regex.test(email);
//  }


// btnNext.addEventListener('click', function () {

     

//      if(i == 0){
//           const fullName = document.getElementById('regFullname').value;
//           const regNo = document.getElementById('regNo').value;
//           const phoneNumber = document.getElementById('regNumber').value;
//           const email = document.getElementById('regEmail').value;
     
     
//           // Validate each input field
//           if (!validateFullName(fullName)) {
//                document.querySelector ('.fullnameError').textContent = 'Enter your full name.';
//                return;
//           }  else {
//                document.querySelector('.fullnameError').textContent = '';
//                }


//           if (!validateRegNo(regNo)) {
//                     document.querySelector ('.reg_noError').textContent = 'Enter a valid registration number.';        
//                     return;
//           } else {
//                document.querySelector('.reg_noError').textContent = '';
//                }


//           if (!validatePhoneNumber(phoneNumber)) {
//                     document.querySelector ('.phoneError').textContent = 'Enter phone number.';        
//                     return;
//           } else {
//                document.querySelector('.phoneError').textContent = '';
//                }


//           if (!validateEmail(email)) {
//                     document.querySelector ('.emailError').textContent = 'Enter a valid email address';        
//                     return;
//           }
//           else {
//                document.querySelector('.emailError').textContent = '';
//                }


//      };

//      if (i == 1){   
          
//           const registerForm = document.querySelector('.registerForm');
//           const genderError = document.querySelector('.genderError');
//           const imgError = document.querySelector('.imgError');
//           const facultyError = document.querySelector('.facultyError');
//           const deptError = document.querySelector('.deptError');
           

//           genderError.innerHTML = '';
//           imgError.innerHTML = '';
//           facultyError.innerHTML = '';
//           deptError.innerHTML = '';

//           const gender = registerForm.gender.value;
//           const img = registerForm.img;
//           const faculty = registerForm.faculty.value;
//           const department = registerForm.dept.value;

//           if(gender == ''){
//                genderError.innerHTML = 'Select gender';
//                return
//           };

//           if(img == ''){
//                imgError.innerHTML = "Upload your profile picture";
//                return
//           }

//           if(faculty == ''){
//                facultyError.innerHTML = 'Select your faculty';
//                return
//           }

//           if(department == ''){
//                deptError.innerHTML = 'Select your department';
//                return
//           }


//      };

//      if (i == 2){

//           const registerForm = document.querySelector('.registerForm');
//           const levelError = document.querySelector('.levelError');
//           const sessionError = document.querySelector('.sessionError');
//           const passwordError = document.querySelector('.passwordError');
//           const confirmError = document.querySelector('.confirmError');
          

//           levelError.innerHTML = '';
//           sessionError.innerHTML = '';
//           passwordError.innerHTML = '';
//           confirmError.innerHTML = '';

//           const level = registerForm.level.value;
//           const session = registerForm.session.value;
//           const password = registerForm.password.value;
//           const confirm = registerForm.confirm_password.value;

//           const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

//           if (level == '') {
//                levelError.innerHTML = 'Select your Level';
//                return
//           }

//           if (session == '') {
//                sessionError.innerHTML = 'Select Section';
//                return
//           }

//           if (!passwordReg.test(password)){
//                passwordError.innerHTML = 'Password not strong';
//                return
//           }

//           if (password !== confirm){
//                confirmError.innerHTML = "Password not matched";
//                return
//           }
//      }

     

//      i += 1;
//      if (i >= allTab.length) {
//           form.submit();
//           return false;
//      } else{
//           for (let j = 0; j < allTab.length; j++) {
//                allTab[j].classList.remove('show');
//                indicatorItems[j].classList.remove('active')
//           }

//           for  (let j = 0; j < i; j++){
//                indicatorItems[i].classList.add('active')
//           }
//           allTab[i].classList.add('show');
//           indicator.style.width = `${i * 50}%`;
//           indicatorItems[i].classList.add('active');
//      }

//      if (i === 0) {
//           btnPrev.style.display = 'none'
//      } else{
//           btnPrev.style.display = 'block'  
//      }
     
//      if (i === allTab.length -1) {
//           btnNext.innerHTML = 'Submit'
//      } else{
//           btnNext.innerHTML = 'Next' 
//      }
// });

// btnPrev.addEventListener('click', function () {
//      i -= 1;
//      if (i >= allTab.length) {
          
//      } else{
//           for (let j = 0; j < allTab.length; j++) {
//                allTab[j].classList.remove('show');
//                indicatorItems[j].classList.remove('active')

               
//           }

//           for  (let j = 0; j < i; j++){
//                indicatorItems[i].classList.add('active')
//           }
//           allTab[i].classList.add('show');
//           indicator.style.width = `${i * 50}%`;
//           indicatorItems[i].classList.add('active');

//      }

//      if (i === 0) {
//           btnPrev.style.display = 'none'
//      } else{
//           btnPrev.style.display = 'block'  
//      }
//      if (i === allTab.length -1) {
//           btnNext.innerHTML = 'Submit'
//      } else{
//           btnNext.innerHTML = 'Next' 
//      }

//      const formData = new FormData();

//      formData.append('fullname', fullname);
//      formData.append('email', email);
//      formData.append('phone_no', phone_no);
//      formData.append('reg_no', reg_no);
//      formData.append('gender', gender);
//      formData.append('faculty', faculty);
//      formData.append('dept', dept);
//      formData.append('session', session);
//      formData.append('level', level);
//      formData.append('password', password);
//      formData.append('img', img.files[0]);

//      fetch('/auth/sign-up', {
//           method: 'POST', // *GET, POST, PUT, DELETE, etc.
//           headers: {
//           //     'Content-Type': 'application/json'
//           },
//           body: formData
//       })
//       .then(res => res.json())
//         .then((data) => {
//             if (data.success) {
//                 $(document).ready(() => {
//                     iziToast.success({
//                         title: 'Ok',
//                         message: data.msg,
//                     });
//                 });

//                 setInterval(() => {
//                     window.location.href = data.redirectURL;
//                 }, 2000);
//             }
//             if (data.error) {
//                 // Invoke the toast component
//                 $(document).ready(() => {
//                     iziToast.error({
//                         title: 'Error',
//                         message: data.error,
//                     });
//                 });
//             }
//         })
//         .catch(e => {
//             console.log(e)
//         })


// });


// Step 1: Define variables
const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.prev');
const indicator = document.querySelector('.indicators .line span');
const indicatorItems = document.querySelectorAll('.indicators p');
const form = document.querySelector('.registerForm');
const allTab = document.querySelectorAll('.tab');
let i = 0;

// Step 2: Initialize the first tab
allTab[i].classList.add('show');
indicator.style.width = i;
indicatorItems[i].classList.add('active');

// Step 3: Hide previous button if on first tab
if (i === 0) {
    btnPrev.style.display = 'none';
} else {
    btnPrev.style.display = 'block';
}

// Step 4: Define validation functions
function validateFullName(fullName) {
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    return regex.test(fullName);
}

function validateRegNo(reg_no) {
    const regex = /^\d{4}\/[a-zA-Z]{2}\/\d+$/;
    return regex.test(reg_no);
}

function validatePhoneNumber(phone_no) {
    const regex = /^0[1-9]\d{9}$/;
    return regex.test(phone_no);
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Step 5: Add event listener for "Next" button
btnNext.addEventListener('click', function () {
    // Step 6: Validate fields based on the current tab
    if (i === 0) {
        const fullName = document.getElementById('regFullname').value;
        const regNo = document.getElementById('regNo').value;
        const phoneNumber = document.getElementById('regNumber').value;
        const email = document.getElementById('regEmail').value;

        if (!validateFullName(fullName)) {
            document.querySelector('.fullnameError').textContent = 'Enter your full name.';
            return;
        } else {
            document.querySelector('.fullnameError').textContent = '';
        }

        if (!validateRegNo(regNo)) {
            document.querySelector('.reg_noError').textContent = 'Enter a valid registration number.';
            return;
        } else {
            document.querySelector('.reg_noError').textContent = '';
        }

        if (!validatePhoneNumber(phoneNumber)) {
            document.querySelector('.phoneError').textContent = 'Enter phone number.';
            return;
        } else {
            document.querySelector('.phoneError').textContent = '';
        }

        if (!validateEmail(email)) {
            document.querySelector('.emailError').textContent = 'Enter a valid email address';
            return;
        } else {
            document.querySelector('.emailError').textContent = '';
        }
    } else if (i === 1) {
        const gender = document.getElementById('genderSelect').value;
        const img = document.querySelector('input[type=file]').files[0];
        const faculty = document.getElementById('regFaculty').value;
        const department = document.getElementById('dept').value;

        if (gender === '') {
            document.querySelector('.genderError').textContent = 'Select gender';
            return;
        } else {
            document.querySelector('.genderError').textContent = '';
        }

        if (!img) {
            document.querySelector('.imgError').textContent = 'Upload your profile picture';
            return;
        } else {
            document.querySelector('.imgError').textContent = '';
        }

        if (faculty === '') {
            document.querySelector('.facultyError').textContent = 'Select your faculty';
            return;
        } else {
            document.querySelector('.facultyError').textContent = '';
        }

        if (department === '') {
            document.querySelector('.deptError').textContent = 'Select your department';
            return;
        } else {
            document.querySelector('.deptError').textContent = '';
        }
    } else if (i === 2) {
        const level = document.getElementById('studentLevel').value;
        const session = document.getElementById('session').value;
        const password = document.getElementById('regPassword').value;
        const confirm = document.getElementById('regConfirmPassword').value;

        const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

        if (level === '') {
            document.querySelector('.levelError').textContent = 'Select your Level';
            return;
        } else {
            document.querySelector('.levelError').textContent = '';
        }

        if (session === '') {
            document.querySelector('.sessionError').textContent = 'Select Session';
            return;
        } else {
            document.querySelector('.sessionError').textContent = '';
        }

        if (!passwordReg.test(password)) {
            document.querySelector('.passwordError').textContent = 'Password not strong';
            return;
        } else {
            document.querySelector('.passwordError').textContent = '';
        }

        if (password !== confirm) {
            document.querySelector('.confirmError').textContent = 'Password not matched';
            return;
        } else {
            document.querySelector('.confirmError').textContent = '';
        }
    }

    // Step 7: Move to the next tab
    i += 1;
    if (i >= allTab.length) {
        submitForm();
        return false;
    } else {
        navigateTabs();
    }
});

// Step 8: Add event listener for "Previous" button
btnPrev.addEventListener('click', function () {
    // Step 9: Move to the previous tab
    i -= 1;
    if (i < 0) {
        i = 0;
    }
    navigateTabs();
});

// Step 10: Function to navigate between tabs
function navigateTabs() {
    for (let j = 0; j < allTab.length; j++) {
        allTab[j].classList.remove('show');
        indicatorItems[j].classList.remove('active');
    }

    for (let j = 0; j < i; j++) {
        indicatorItems[j].classList.add('active');
    }
    allTab[i].classList.add('show');
    indicator.style.width = `${i * 50}%`;
    indicatorItems[i].classList.add('active');

    // Step 11: Hide or show previous button based on current tab
    if (i === 0) {
        btnPrev.style.display = 'none';
    } else {
        btnPrev.style.display = 'block';
    }

    // Step 12: Change "Next" button text to "Submit" on last tab
    if (i === allTab.length - 1) {
        btnNext.innerHTML = 'Submit';
    } else {
        btnNext.innerHTML = 'Next';
    }
}

// Step 13: Function to submit the form
function submitForm() {
    const formData = new FormData(form);

    // Step 14: Implement AJAX request for form submission
    fetch('/auth/sign-up', {
        method: 'POST',
        body: formData
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
 
 };
