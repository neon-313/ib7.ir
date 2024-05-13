
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
    $("#states").on("change",function(){
        var state_code = $(this).val();
        var requesturl = $("#StateDetail").val();
        console.log("Fuck Yes")
        if (state_code ==  "fuck"){
          var city_select = $("#cities")
          city_select.empty();
          $(city_select).append(`<option value ="fuck" >"لطفا یک استان را انتخاب کنید"</option>`);
        }else{
          $.ajax({
            url:requesturl,
            method:"GET",
            data:{"state_code":state_code},
            success:function(response){
              var city_select = $("#cities")
              city_select.empty();
              for (var city in response){
                var name = response[city]['name']
                var code = response[city]['code']
              
                
                $(city_select).append(`<option value =${code} >${name}</option>`);
              }
            }
          })  
        };
    
      });
      $("#EditCostumerForm").submit(function(e) {
        e.preventDefault();
        BtnStyle(st=true,btn_id="EditCostumerBtn")
        const form_data = $("#EditCostumerForm")
        var formData = new FormData(this);
        const form = $("#EditCostumerForm")
        var requesturl = $("#EditCostumerForm").attr("action")
  
  
        $.ajax({
          url :requesturl,
          method :"PUT",
 
          data : form.serialize(),
          success: function(response) {
            Swal.fire({
              title: 'موفق',
              text: "آپدیت مشتری با موفقیت انجام شد",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              confirmButtonText: 'باشه',
              buttonsStyling: false
      
            }).then(function (result) {
    
              location.href = "/InstallMent/CostumerList";
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
            BtnStyle(false,"CreateTailorBtn")
          }
  
        })
      });
});