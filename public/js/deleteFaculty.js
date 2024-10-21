function deleteFaculty(faculty_id) {
    console.log(faculty_id);

    // console.log(faculty_id);
    if (faculty_id === '') {
        $(document).ready(() => {
            iziToast.error({
                title: 'Error',
                message: 'Invalid Data',
            });
        })
    }
    const data = { faculty_id }
    fetch('/admin/delete-faculty', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ faculty_id })
    })
    .then(res => res.json())
    .then(data => {
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
    })
}