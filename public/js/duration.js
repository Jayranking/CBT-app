// Function to start the exam
function startExam() {
    fetch('/admin/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // You may pass data if needed
    })
    .then(res => res.json())
    .then((data) => {
        if (data.success) {
            iziToast.success({
                title: 'Success',
                message: data.msg,
            });
        } else {
            iziToast.error({
                title: 'Error',
                message: data.error,
            });
        }
    })
    .catch(e => {
        console.log(e);
    });
}

// Function to stop the exam
function stopExam() {
    fetch('/admin/stop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(res => res.json())
    .then((data) => {
        if (data.success) {
            iziToast.success({
                title: 'Success',
                message: data.msg,
            });
        } else {
            iziToast.error({
                title: 'Error',
                message: data.error,
            });
        }
    })
    .catch(e => {
        console.log(e);
    });
}


let timeInterval;

// Function to update the current time
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('currentTime').innerText = timeString;
}

// Function to start the time update
function startTimeUpdate() {
    updateTime(); // Call updateTime initially to set the time immediately
    timeInterval = setInterval(updateTime, 1000); // Update the time every second
}

// Function to stop the time update
function stopTimeUpdate() {
    clearInterval(timeInterval); // Clear the interval to stop updating the time
}

// Attach event listener to the start exam button
document.getElementById('startExamBtn').addEventListener('click', () => {
    startExam();
    startTimeUpdate();
});

// Attach event listener to the stop exam button
document.getElementById('stopExamBtn').addEventListener('click', () => {
    stopExam();
    stopTimeUpdate();
});
