$(document).ready(function() {
    var currentUrl = window.location.href;

    // تابع برای استخراج مقدار status از آدرس فعلی صفحه
    function getStatusFromUrl(url) {
        var params = url.split('?')[1];
        if (params) {
            var paramArray = params.split('&');
            for (var i = 0; i < paramArray.length; i++) {
                var param = paramArray[i].split('=');
                if (param[0] === 'status') {
                    return decodeURIComponent(param[1]);
                }
            }
        }
        return null;
    }

    // فراخوانی تابع و چاپ مقدار status
    var status = getStatusFromUrl(currentUrl);
    if (status == 'true'){
        Swal.fire({
            title: 'موفق',
            text: "با موفقیت انجام شد",
            icon: 'success',
            headers: {
                'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val() // Include the CSRF token in the request headers
            },
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            confirmButtonText: 'باشه',
            buttonsStyling: false
    
          }).then(function (result) {
          
            
          })
    }
    // $('#ReturnTermsForm').submit(function(event) {
    //     event.preventDefault(); // Prevent the default form submission
    //     $.ajax({
    //         type: 'POST',
    //         url: $(this).attr('action'),
    //         data: $(this).serialize(),
    //         success: function(response) {
    //             Swal.fire({
    //                 title: 'موفق',
    //                 text: "با موفقیت انجام شد",
    //                 icon: 'success',
    //                 headers: {
    //                     'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val() // Include the CSRF token in the request headers
    //                 },
    //                 customClass: {
    //                   confirmButton: 'btn btn-primary'
    //                 },
    //                 confirmButtonText: 'باشه',
    //                 buttonsStyling: false
            
    //               }).then(function (result) {
                  
                    
    //               })
    //         },
    //         error: function(xhr, errmsg, err) {
    //             console.log(xhr.status + ": " + xhr.responseText);
    //             // Optionally, you can handle errors here
    //         }
    //     });
    // });
});