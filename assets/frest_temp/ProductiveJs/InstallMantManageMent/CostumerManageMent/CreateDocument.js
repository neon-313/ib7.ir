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
  function DeleteDocument(document_id){
    Swal.fire({
      title: 'هشدار!',
      text: ' آیا از حذف این عکس مطمن هستید؟؟؟',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger'
      },
      cancelButtonText: "نه , لغو",
      confirmButtonText: 'باشه',
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        var requesturl = "/InstallMent/delete_document"
        $.ajax({
          url:requesturl + `/${document_id}`,
          method :"DELETE",
          success:function (response){
            Swal.fire({
              title: 'موفق',
              text: "عکس مورد نظر با موفقیت حذف شد",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              confirmButtonText: 'باشه',
              buttonsStyling: false
      
            }).then(function (result) {
              location.reload();
            })
  
          },
        })
      }
    })
  }
  function CreateDocument(costumer_id) {  }
  $(document).ready(function(){
      $("#add-file").on("click",function(){
        console.log("Fuck")
        var div_files = $("#files_inputs")
        var new_div = document.createElement("div")
        new_div.className="col-md-6"
        var new_input_html = `
        <div class="form-password-toggle" >
        <label class="form-label" for="basic-default-upload-file">مدارک</label>
        <input type="file" name="documentss" class="form-control" id="basic-default-upload-file" required>
      </div>
        `
        $(new_div).append(new_input_html)
        $(div_files).append(new_div)
      });
      $("#CreateDocumentForm").submit(function(e) {
        e.preventDefault();
        BtnStyle(st=true,btn_id="CreateDocumentBtn")
        const form_data = $("#CreateDocumentForm")
        var filess = document.getElementsByName("documentss")
        console.log($(filess).val())
        var formData = new FormData(this);
        var requesturl = $("#CreateDocumentForm").attr("action")
  
  
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
    
              location.reload();
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