$(document).ready(function() {
    $('#ReturnTermsForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function(response) {
                Swal.fire({
                    title: 'موفق',
                    text: "با موفقیت انجام شد",
                    icon: 'success',
                    customClass: {
                      confirmButton: 'btn btn-primary'
                    },
                    confirmButtonText: 'باشه',
                    buttonsStyling: false
            
                  }).then(function (result) {
                    
                  })
            },
            error: function(xhr, errmsg, err) {
                console.log(xhr.status + ": " + xhr.responseText);
                // Optionally, you can handle errors here
            }
        });
    });
});