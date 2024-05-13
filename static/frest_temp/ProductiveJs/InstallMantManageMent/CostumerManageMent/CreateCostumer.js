
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
    $("#add-file").on("click",function(){
      console.log("Fuck")
      var div_files = $("#files_inputs")
      var new_div = document.createElement("div")
      new_div.className="col-md-6"
      var new_input_html = `
      <div class="form-password-toggle" >
      <label class="form-label" for="basic-default-upload-file">مدارک</label>
      <input type="file" name="documentss" class="form-control" id="basic-default-upload-file" >
    </div>
      `
      $(new_div).append(new_input_html)
      $(div_files).append(new_div)
    });
    $("#CreateCostumerForm").submit(function(e) {
      e.preventDefault();
      BtnStyle(st=true,btn_id="CreateCostumerBtn")
      const form_data = $("#CreateCostumerForm")
      var filess = document.getElementsByName("documentss")
      console.log($(filess).val())
      var formData = new FormData(this);
      var requesturl = $("#CreateCostumerForm").attr("action")


      $.ajax({
        url :requesturl,
        method :"POST",
        processData: false,
        contentType: false,
        data : formData,
        success: function(response) {
          Swal.fire({
            title: 'موفق',
            text: "مشتری جدید با موفقیت ثبت شد",
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
          BtnStyle(false,"CreateCostumerBtn")
        }

      })
    });

})