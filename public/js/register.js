
// Registration Form Validation 

let registerForm = document.querySelector(".registerForm");

registerForm.addEventListener('submit', (e) => {
     e.preventDefault();

     // Getting Error Div 
     const fullnameError = document.querySelector('.fullnameError');
     const reg_noError = document.querySelector('.reg_noError');
     const phoneError = document.querySelector('.phoneError');
     const emailError = document.querySelector('.emailError');
     const genderError = document.querySelector('.genderError');
     const facultyError = document.querySelector('.facultyError');
     const levelError = document.querySelector('.levelError');
     const deptError = document.querySelector('.deptError');
     const imgError = document.querySelector('.imgError');
     const sessionError = document.querySelector('.sessionError');
     const passwordError = document.querySelector('.passwordError');
     const confirmError = document.querySelector('.confirmError');

     // Returning All the Errors

     fullnameError.innerHTML= "";
     reg_noError.innerHTML= "";
     phoneError.innerHTML= "";
     emailError.innerHTML= "";
     genderError.innerHTML= "";
     facultyError.innerHTML= "";
     levelError.innerHTML= "";
     deptError.innerHTML= "";
     imgError.innerHTML= "";
     sessionError.innerHTML= "";
     passwordError.innerHTML= "";
     confirmError.innerHTML= "";

     // Getting all the value from our inputs

     const fullname = registerForm.fullname.value;
     const reg_no = registerForm.reg_no.value;
     const phone_no = registerForm.phone_no.value;
     const email = registerForm.email.value;
     const gender = registerForm.gender.value;
     const faculty = registerForm.faculty.value;
     const level = registerForm.level.value;
     const dept = registerForm.dept.value;
     const img = registerForm.img;
     const session = registerForm.session.value;
     const password = registerForm.password.value;
     const confirm_password = registerForm.confirm_password.value;

     // Applying Regex For the VAlidation

     const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
     const reg_noReg = /^\d{4}\/[a-zA-Z]{2}\/\d+$/;
     const phoneReg = /^0[1-9]\d{9}$/;
     const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

     // Writing The Validation Logic Using Statement
     
     if (!fullnameReg.test(fullname)) {
          fullnameError.innerHTML = 'Invalid fullname format';
          return 
     }

     if (!reg_noReg.test(reg_no)) {
          reg_noError.innerHTML = "Incorrect input";
          return
     }

     if (!phoneReg.test(phone_no)) {
          phoneError.innerHTML = "Invalid phone number input";
          return
     }

     if (!emailReg.test(email)) {
          emailError.innerHTML = "Invalid email address";
          return
     }

     if (gender == '') {
          genderError.innerHTML = "Select your gender";
          return
     }

     if (faculty == '') {
          facultyError.innerHTML = "Select your Faculty"
          return
     }

     if (level == '') {
          levelError.innerHTML = "Select your Level"
          return
     }

     if (dept == '') {
          deptError.innerHTML = "Select your Department"
          return
     }

     if (img == '') {
          imgError.innerHTML = "Upload your profile picture"
          return
     }

     if (session == '') {
          sessionError.innerHTML = "Select your session"
          return
     }

     if(!passwordReg.test(password)) {
          passwordError.innerHTML = "password not strong"
          return
     }

     if (password !== confirm_password) {
          confirmError.innerHTML = "Password not matched"
     }

     const formData = new FormData();

     formData.append('fullname', fullname);
     formData.append('email', email);
     formData.append('phone_no', phone_no);
     formData.append('reg_no', reg_no);
     formData.append('gender', gender);
     formData.append('faculty', faculty);
     formData.append('dept', dept);
     formData.append('session', session);
     formData.append('level', level);
     formData.append('password', password);
     formData.append('img', img.files[0]);


     fetch('/auth/sign-up', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
          //     'Content-Type': 'application/json'
          },
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
})

