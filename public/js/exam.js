// Get the form element
const examForm = document.getElementById('examForm');
const courseId = document.getElementsByName("courseId")[0].value;
const studentId = document.getElementsByName("studentId")[0].value;

// Function to submit the form
async function submitExamForm() {
    try {
        // Access context data
        const courseQuestions = context.courseQuestions;

        // Gather selected answers
        const selectedAnswers = [];
        for (let i = 0; i < courseQuestions.length; i++) {
            const selectedAnswer = document.querySelector(`input[name="question${i + 1}"]:checked`);
            if (selectedAnswer) {
                selectedAnswers.push({
                    questionId: courseQuestions[i]._id, // Assuming each question object has _id property
                    selectedOption: selectedAnswer.value,
                    isCorrect: false // You might need to determine if the answer is correct based on your logic
                });
            }
        }

        // Prepare data object for POST request
        const data = {
            studentId,
            courseId,
            answers: selectedAnswers
        };
        console.log(data)
        // Send POST request to server
        const response = await fetch('/tutor/result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Handle response
        const responseData = await response.json();
        if (responseData.success) {
            // Show success message and redirect after 2 seconds
            iziToast.success({
                title: 'Success',
                message: responseData.msg
            });
            setTimeout(() => {
                window.location.href = responseData.redirectURL;
            }, 2000);
        } else if (responseData.error) {
            // Show error message
            iziToast.error({
                title: 'Error',
                message: responseData.error
            });
            // If the error message indicates the user has already taken the exam, redirect them immediately
            if (responseData.redirectURL === '/login') {
                // Redirect the user to the login page
                window.location.href = responseData.redirectURL;
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add event listener for form submission
examForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitExamForm(); // Call the submitExamForm function when the submit button is clicked
});

// Function to start countdown timer
function startCountdown(time) {
    const countdownElement = document.getElementById('countdown');
    let totalSeconds = parseInt(time.hours) * 3600 + parseInt(time.minutes) * 60 + parseInt(time.seconds);

    const timer = setInterval(() => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        countdownElement.textContent = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (totalSeconds <= 0) {
            clearInterval(timer);
            submitExamForm(); // Call the submitExamForm function when time elapses
        } else {
            totalSeconds--;
            // Store remaining time in sessionStorage
            sessionStorage.setItem('remainingTime', totalSeconds);
        }
    }, 1000);
}


