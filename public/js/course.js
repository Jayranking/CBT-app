// Department Form validation 
const courseForm = document.getElementById('courseForm');

courseForm.addEventListener('submit', (e) =>{
     e.preventDefault()

//  /Fetching Error Divs
const titleErr = document.querySelector('.titleErr');
const codeErr = document.querySelector('.codeErr');
const unitErr = document.querySelector('.unitErr');
const facultyErr = document.querySelector('.facultyErr');
const deptErr = document.querySelector('.deptErr');
const levelErr = document.querySelector('.levelErr');
const semesterErr = document.querySelector('.semesterErr');


// //Resetting Regex
titleErr.innerHTML = '';
codeErr.innerHTML = '';
unitErr.innerHTML = '';
facultyErr.innerHTML = '';
deptErr.innerHTML = '';
levelErr.innerHTML = '';
semesterErr.innerHTML = '';


//Getting Input Values
const title = courseForm.title.value;
const code = courseForm.code.value;
const unit = courseForm.unit.value;
const faculty = courseForm.faculty.value;
const dept = courseForm.dept.value;
const level = courseForm.level.value;
const semester = courseForm.semester.value;


// Regex for the Inputs
const titleReg = /^[A-Za-z\s]+$/;
const codeReg = /^[A-Za-z0-9\s]+$/;
const unitReg = /^\d+$/;

// If Statements
if (!titleReg.test(title)) {
     titleErr.innerHTML = 'Enter a valid course title';
};

if (!codeReg.test(code)) {
    codeErr.innerHTML = 'Enter a valid course code';
};

if (!unitReg.test(unit)) {
    unitErr.innerHTML = 'Enter a valid course unit';
};

if (faculty == "") {
    facultyErr.innerHTML = 'Select Faculty';
}

if (dept == "") {
    deptErr.innerHTML = 'Select Department';
}

if (level == "") {
    levelErr.innerHTML = 'Select Level';
}

if (semester == "") {
    semesterErr.innerHTML = 'Select Semester';
}


const data = { title, code, unit, faculty, dept, level, semester }

fetch('/admin/course', {
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