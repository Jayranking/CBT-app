// // time Form validation 
// const timeForm = document.getElementById('timeForm');

// timeForm.addEventListener('submit', (e) =>{
//      e.preventDefault()

//     // Fetching Error Divs
// const hourErr = document.querySelector('.hourErr');
// const minErr = document.querySelector('.minErr');
// const secsErr = document.querySelector('.secsErr');

// // Resetting Regex
// hourErr.innerHTML = '';
// minErr.innerHTML = '';
// secsErr.innerHTML = '';


// //Getting Input Values
// const hours = timeForm.hours.value;
// const minutes = timeForm.hours.value;
// const seconds = timeForm.hours.value;


// // Regex for the Inputs
// const timeReg = /^\d(?:\d)?$/;

// // If Statements
// if (!timeReg.test(hours)) {
//     hourErr.innerHTML = 'Enter a valid input';
// };

// if (!timeReg.test(minutes)) {
//     minErr.innerHTML = 'Enter a valid input';
// };

// if (!timeReg.test(seconds)) {
//     secsErr.innerHTML = 'Enter a valid input';
// };


// const data = {hours, minutes,seconds}

// fetch('/tutor/duration', {
//      method: 'POST', // *GET, POST, PUT, DELETE, etc.
//      headers: {
//          'Content-Type': 'application/json'
//      },
//      body: JSON.stringify(data)
//  })
//  .then(res => res.json())
//    .then((data) => {
//        if (data.success) {
//            $(document).ready(() => {
//                iziToast.success({
//                    title: 'Ok',
//                    message: data.msg,
//                });
//            });

//            setInterval(() => {
//                window.location.href = data.redirectURL;
//            }, 2000);
//        }
//        if (data.error) {
//            // Invoke the toast component
//            $(document).ready(() => {
//                iziToast.error({
//                    title: 'Error',
//                    message: data.error,
//                });
//            });
//        }
//    })
//    .catch(e => {
//        console.log(e)
//    })

// });


// Selecting the form and input fields
const timeForm = document.getElementById('timeForm');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

// Event listener for form submission
timeForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    // Fetching Error Divs
    const hourErr = document.querySelector('.hourErr');
    const minErr = document.querySelector('.minErr');
    const secsErr = document.querySelector('.secsErr');

    // Resetting error messages
    hourErr.innerHTML = '';
    minErr.innerHTML = '';
    secsErr.innerHTML = '';

    // Getting Input Values
    const hours = hoursInput.value;
    const minutes = minutesInput.value;
    const seconds = secondsInput.value;

    // Regex for the Inputs
    const timeReg = /^\d{1,2}$/;

    // Validation for hours
    if (!timeReg.test(hours) || parseInt(hours) > 23 || parseInt(hours) < 0) {
        hourErr.innerHTML = 'Enter a valid input (0-23)';
    }

    // Validation for minutes and seconds
    if (!timeReg.test(minutes) || parseInt(minutes) > 59 || parseInt(minutes) < 0) {
        minErr.innerHTML = 'Enter a valid input (0-59)';
    }

    if (!timeReg.test(seconds) || parseInt(seconds) > 59 || parseInt(seconds) < 0) {
        secsErr.innerHTML = 'Enter a valid input (0-59)';
    }

    // If any error messages exist, prevent form submission
    if (hourErr.innerHTML || minErr.innerHTML || secsErr.innerHTML) {
        return;
    }

    // If no errors, proceed with form submission
    const data = { hours, minutes, seconds };

    fetch('/tutor/duration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Success notification
            iziToast.success({
                title: 'Ok',
                message: data.msg
            });

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = data.redirectURL;
            }, 2000);
        } else {
            // Error notification
            iziToast.error({
                title: 'Error',
                message: data.error
            });
        }
    })
    .catch(err => console.error('Error:', err));
});

// Event listeners for input fields
hoursInput.addEventListener('input', validateInput);
minutesInput.addEventListener('input', validateInput);
secondsInput.addEventListener('input', validateInput);

// Function to validate input
function validateInput() {
    const inputValue = this.value.trim(); // Trim whitespace

    if (!inputValue.match(/^\d*$/)) {
        this.value = ''; // Clear input if non-numeric characters are entered
    }
}
