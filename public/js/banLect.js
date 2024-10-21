function banLect(lect_id) {
    console.log(lect_id);

    if (lect_id === '') {
        $(document).ready(() => {
            iziToast.error({
                title: 'Error',
                message: 'Invalid Data',
            });
        });
        return; // Return early if lect_id is empty
    }

    const data = { lect_id };
    fetch('/admin/ban-lect', { // Use a dedicated ban-lect route for ban operation
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            $(document).ready(() => {
                iziToast.success({
                    title: 'Success',
                    message: data.msg,
                });
            });

            setTimeout(() => {
                window.location.href = data.redirectURL;
            }, 2000);
        } else {
            $(document).ready(() => {
                iziToast.error({
                    title: 'Error',
                    message: data.error,
                });
            });
        }
    })
    .catch(error => {
        console.error('Error banning department:', error);
        $(document).ready(() => {
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while banning department',
            });
        });
    });
}
