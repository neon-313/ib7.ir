
$(document).ready(function() {
    $("#showPassKey_1").on("click", function(){
        var class_name =  $("#eye_icon_1").attr("class");
        if (class_name == "bx bxs-show"){
    
            $("#eye_icon_1").removeClass("bx bxs-show").addClass("bx bxs-low-vision");
            $("#password").attr("type","text");
        }else{
            $("#eye_icon_1").removeClass("bx bxs-low-vision").addClass("bx bxs-show");
            $("#password").attr("type","password");
    
        }
    })
    $("#showPassKey_2").on("click", function(){
        var class_name =  $("#eye_icon_2").attr("class");
        if (class_name == "bx bxs-show"){
    
            $("#eye_icon_2").removeClass("bx bxs-show").addClass("bx bxs-low-vision");
            $("#confirmpassword").attr("type","text");
        }else{
            $("#eye_icon_2").removeClass("bx bxs-low-vision").addClass("bx bxs-show");
            $("#confirmpassword").attr("type","password");
    
        }
    })
    $("#CreateOrChanePssForm").on("submit", function(e){
        var requesturl = $(this).attr("action");
        const main_data= {
            "password":$("#password").val(),
            "confirmpassword":$("#confirmpassword").val(),
            "token":$("#token").val(),
        }
        e.preventDefault();
        $("#loaderButton").prop('disabled', true);
        // Hide the button text and show the loader icon
        $('#buttonText').text("منتظر بمانید....")
        $('#loaderIcon').removeClass('hidden');
        var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
        $.ajax({
            url: requesturl,
            type: 'PUT',
            data: JSON.stringify(main_data),
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            success: function(response) {
                Swal.fire({
                    title: 'موفق',
                    text: response['message'],
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn-primary w-40 py-3'
                    },
                    confirmButtonText: 'باشه',
                    buttonsStyling: false

                }).then(function (result) {
                    location.href = "/"

                });
                // Handle success response from the server
            },
            error: function(xhr, status, error) {
                var responseJson = JSON.parse(xhr.responseText);
                Swal.fire({
                    title: 'خطا',
                    text: responseJson['message'],
                    icon: 'error',
                    customClass: {
                        confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                    },
                    confirmButtonText: 'باشه',
                    // buttonsStyling: false

                })
            }
        });

        setTimeout(() => {
            // Enable the button
            $('#loaderButton').prop('disabled', false);
            // Show the button text and hide the loader icon
            $('#buttonText').text("ثبت")
            $('#loaderIcon').addClass('hidden');
          }, 2000);
    });
});
