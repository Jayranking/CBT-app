// session Form validation 
const sessionForm = document.getElementById('sessionForm');

sessionForm.addEventListener('submit', (e) =>{
     e.preventDefault()

    //  /Fetching Error Divs
const sessionErr = document.querySelector('.sessionErr');
// const semesterErr = document.querySelector('.semesterErr');


// //Resetting Regex
sessionErr.innerHTML = '';
// semesterErr.innerHTML = '';


//Getting Input Values
const session = sessionForm.session.value;
// const semester = sessionForm.semester.value;



// Regex for the Inputs
const sessionReg = /\b\d{4}-\d{4}\b/;

// If Statements
if (!sessionReg.test(session)) {
    sessionErr.innerHTML = 'Enter a valid input';
};

// if (semester == "") {
//     semesterErr.innerHTML = 'Select semester';
// }


const data = {session}

fetch('/admin/session', {
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