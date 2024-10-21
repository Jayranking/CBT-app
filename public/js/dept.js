// Department Form validation 
const deptForm = document.getElementById('deptForm');

deptForm.addEventListener('submit', (e) =>{
     e.preventDefault()

    //  /Fetching Error Divs
const deptErr = document.querySelector('.deptErr');
const facultyErr = document.querySelector('.facultyErr');


// //Resetting Regex
deptErr.innerHTML = '';
facultyErr.innerHTML = '';


//Getting Input Values
const dept_name = deptForm.dept_name.value;
const faculty_name = deptForm.faculty_name.value;



// Regex for the Inputs
const deptReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

// If Statements
if (!deptReg.test(dept_name)) {
     deptErr.innerHTML = 'Enter a Valid dept name';
};

if (faculty_name == "") {
    facultyErr.innerHTML = 'Select Faculty';
}


const data = {dept_name, faculty_name}

fetch('/admin/dept', {
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