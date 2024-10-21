// Department Form validation 
const assignForm = document.getElementById('assignForm');

assignForm.addEventListener('submit', (e) =>{
     e.preventDefault()

//  /Fetching Error Divs
const lecturerErr = document.querySelector('.lecturerErr');
const titleErr = document.querySelector('.titleErr');
const sessionErr = document.querySelector('.sessionErr');
const dateErr = document.querySelector('.dateErr');




// //Resetting Regex
lecturerErr.innerHTML = '';
titleErr.innerHTML = '';
sessionErr.innerHTML = '';
dateErr.innerHTML = '';


//Getting Input Values
const lecturer = assignForm.lecturer.value;
const session = assignForm.session.value;
const date = assignForm.date.value;
const coursesAssigenedId = assignForm.coursesAssigenedId.value;



// Getting checked checkboxes with name 'title'
const checkedTitleCheckboxes = document.querySelectorAll('input[name="title"]:checked');

// Extracting values from checked checkboxes into an array
const courses = Array.from(checkedTitleCheckboxes).map(checkbox => checkbox.value);
if (courses.length === 0) {
    titleErr.innerHTML = 'Please select at least one course';
}

// If Statements
if (lecturer == "") {
    lecturerErr.innerHTML = 'Select Course Lecturer/Cordinator';
};


if (session == "") {
    sessionErr.innerHTML = 'Select session';
}

if (date == "") {
    dateErr.innerHTML = 'Date required';
}


const data = {coursesAssigenedId, lecturer, courses, session, date }
console.log(data);

fetch('/admin/edit-assign-course', {
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