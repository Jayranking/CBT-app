
// faculty Form validation 
const facultyForm = document.getElementById('facultyForm');

facultyForm.addEventListener('submit', (e) =>{
     e.preventDefault()

    //  /Fetching Error Divs
const facultyErr = document.querySelector('.facultyErr');

// //Resetting Regex
facultyErr.innerHTML = '';

//Getting Input Values
const faculty_name = facultyForm.faculty_name.value;

// Regex for the Inputs
const facultyReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

// If Statements
if (!facultyReg.test(faculty_name)) {
     facultyErr.innerHTML = 'Enter a Valid faculty name'
};



const data = {faculty_name}

fetch('/admin/faculty', {
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

