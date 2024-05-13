function BtnStyle(st,btn_id){
    if (st){
      var btn = $(`#${btn_id}`);
      btn.empty();
      btn.append("درحال بارگزاری")
      btn.append(' <span class="spinner-border align-middle" role="status" aria-hidden="true"></span>')
      var main_btn = document.getElementById(btn_id)
      main_btn.disabled= true;
    }else{
      console.log("fuck")
      var btn = $(`#${btn_id}`);
      btn.empty();
      btn.append("ذخیره تغییرات")
      var main_btn = document.getElementById(btn_id)
      main_btn.disabled= false;
    }
  }
  

$(document).ready(function(){

    $('#CreatePeymentDateForm').submit(function(event) {
        event.preventDefault();

        var formData = $(this).serialize();
        BtnStyle(st=true,btn_id="CreatePeymentDateBtn")
        var requesturl = $("#CreatePeymentDateForm").attr("action")
        var isFormValid = true;
        $(this).find('input').each(function() {
            if ($(this).val() === '') {
              isFormValid = false;
              return false; // خروج از حلقه در صورت خالی بودن یک ورودی
            }
          });
        if(isFormValid){

            $.ajax({
                url :requesturl ,
                method :"POST",
      
                data : formData,
                success: function(response) {
                    Swal.fire({
                        title: 'موفق',
                        text: response['message'],
                        icon: 'success',
                        customClass: {
                          confirmButton: 'btn btn-primary'
                        },
                        confirmButtonText: 'باشه',
                        buttonsStyling: false
                
                      }).then(function (result) {
                        location.href= response['redirect_url']
                      })
                },
                error: function(xhr, status, error) {
        
                  var responseJson = JSON.parse(xhr.responseText);
             
                  Swal.fire({
                    title:"هشدار",
                    text: responseJson['message'],
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary'
                    },
                    confirmButtonText: 'باشه',
                    buttonsStyling: false
                  });
                  BtnStyle(false,"CreatePeymentDateBtn")
                }
        
              })
        }else{
                         
            Swal.fire({
                title:"هشدار",
                text:"هیچکدام از تاریخ ها نمیتواند خالی باشد",
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary'
                },
                confirmButtonText: 'باشه',
                buttonsStyling: false
              });
              BtnStyle(false,"CreatePeymentDateBtn")
        }
    });
});