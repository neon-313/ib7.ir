

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
    btn.append("ورود")
    var main_btn = document.getElementById(btn_id)
    main_btn.disabled= false;
  }
}
$(document).ready(function(){
    $("#formAuthentication").submit(function(e) {
      e.preventDefault();
      const form_data = $("#formAuthentication")
      var formData = new FormData(this);
      var requesturl = $("#formAuthentication").attr("action")
      $.ajax({
        url :requesturl,
        method :"POST",
        processData: false,
        contentType: false,
        data : formData,
        success: function(response) {
          Swal.fire({
            title: 'موفق',
            text: "ورود شما با موفیت انجام شد",
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            confirmButtonText: 'باشه',
            buttonsStyling: false
    
          }).then(function (result) {
  
            location.href = response['redirect_url'];
          });
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
          BtnStyle(false,"CreateCostumerBtn")
        }

      })
    })
  })