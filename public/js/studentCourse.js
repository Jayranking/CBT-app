
// Form validation 
const courseForm = document.getElementById('courseForm');

courseForm.addEventListener('submit', (e) =>{
     e.preventDefault()

//  /Fetching Error Divs
const titleErr = document.querySelector('.titleErr');



// //Resetting Regex
titleErr.innerHTML = '';



// Getting checked checkboxes with name 'title'
const checkedTitleCheckboxes = document.querySelectorAll('input[name="title"]:checked');

// Extracting values from checked checkboxes into an array
const courses = Array.from(checkedTitleCheckboxes).map(checkbox => checkbox.value);
if (courses.length === 0) {
    titleErr.innerHTML = 'Please select at least one course';
}



const data = { courses }
console.log(data);

fetch('/student/register-course', {
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