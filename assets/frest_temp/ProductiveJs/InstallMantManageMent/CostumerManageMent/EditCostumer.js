(function () {

  var messages = {
    dictDefaultMessage: "فایل‌ها را برای ارسال اینجا رها کنید",
    dictFallbackMessage: "مرورگر شما از ارسال فایل با کشیدن و رها کردن پشتیبانی نمی‌کند.",
    dictFallbackText: "لطفا از فرم زیر برای ارسال فایل های خود مانند دوران های گذشته استفاده کنید.",
    dictFileTooBig: "فایل خیلی بزرگ است ({{filesize}}MiB). حداکثر اندازه فایل: {{maxFilesize}}MiB.",
    dictInvalidFileType: "شما نمی‌توانید فایل‌هایی از این نوع را ارسال کنید.",
    dictResponseError: "سرور با کد {{statusCode}} پاسخ داد.",
    dictCancelUpload: "لغو ارسال",
    dictCancelUploadConfirmation: "آیا از لغو کردن این ارسال اطمینان دارید؟",
    dictRemoveFile: "حذف فایل",
    dictMaxFilesExceeded: "شما نمی‌توانید فایل دیگری ارسال کنید."
  }

  // previewTemplate: Updated Dropzone default previewTemplate
  // ! Don't change it unless you really know what you are doing
  const previewTemplate = `<div class="dz-preview dz-file-preview">
<div class="dz-details">
  <div class="dz-thumbnail">
    <img data-dz-thumbnail>
    <span class="dz-nopreview">No preview</span>
    <div class="dz-success-mark"></div>
    <div class="dz-error-mark"></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <div class="progress">
      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
    </div>
  </div>
  <div class="dz-filename" data-dz-name></div>
  <div class="dz-size" data-dz-size></div>
</div>
</div>`;

  // ? Start your code from here

  // Basic Dropzone
  // --------------------------------------------------------------------
  // var options = {
  //   paramName:"filekiri",
  //   previewTemplate: previewTemplate,
  //   parallelUploads: 1,
  //   maxFilesize: 5,
  //   addRemoveLinks: true,
  //   maxFiles: 1,
  //   url: '/test-upload-endpoint', 
  //   parallelUploads:1,
  //   parallelChunkUploads:true,
  // };
  // Object.assign(options, messages);

  // const dropzoneBasicc = document.getElementById('dropzone-basic');
  // if (dropzoneBasicc) {
  //   const dropzoneBasic = new Dropzone(dropzoneBasicc, {
     
  //     parallelUploads: 1,
  //     maxFilesize: 5,
  //     addRemoveLinks: true,
  //     maxFiles: 1,
    
  //   });
  //   dropzoneBasic.processQueue()
  //   dropzoneBasic.on('sending', function (file, xhr, formData) {

  //       // این تابع برای هر فایل قبل از ارسال فراخوانی می‌شود
  //       // file: اطلاعات فایل در حال ارسال
  //       // xhr: شیء XMLHttpRequest برای درخواست ارسال
  //       // formData: داده‌های فرم که به درخواست ارسالی اضافه می‌شود
      

  //     })
  //     dropzoneBasic.on('removedfile', function (file) {
  //       // این تابع برای هر فایلی که از Dropzone حذف می‌شود، فراخوانی می‌شود
  //       // می‌توانید اطلاعات فایل به سمت سرور ارسال کنید و سپس سرور اقدام به حذف فایل کند
      
  //       // ارسال اطلاعات فایل به سرور
  //       $.ajax({
  //         type: 'GET',
  //         url: '/ShopManageMent/DeleteMainFileProduct',
  //         data: { filename: file.name },
  //         success: function (response) {
  //           console.log('File deleted on server:', response);
  //         },
  //         error: function (error) {
  //           console.error('Error deleting file on server:', error);
  //         }
  //       });
  //     });
      
  // }

  // Multiple Dropzone
  // --------------------------------------------------------------------
  var options = {
   
    parallelUploads: 1,
    maxFilesize: 5,
    addRemoveLinks: true,
    maxFiles: 5,
  };
  Object.assign(options, messages);

  const dropzoneMulti =  document.getElementById('dropzone-multii');
  console.log(dropzoneMulti,"!@4124")
  if (dropzoneMulti) {
    const myDropzoneMulti = new Dropzone(dropzoneMulti, {
     
      parallelUploads: 1,
      maxFilesize: 5,
      addRemoveLinks: true,
      maxFiles: 5,
    
    });
    myDropzoneMulti.processQueue()
    myDropzoneMulti.on("success", function (file, response) {
      // Handle the success response from the server
      console.log(response);
      var img_html = `
      <div class="col-md-3" id="img_${response['image_id']}">
           
                <img src="${response['url']}" alt="" height="100px" width="100px">
                <br>
                <br>
                  <div class="col-sm-9 text-center">

                    <button type="button" class="btn btn-icon rounded-pill btn-google-plus">
                      <i class='bx bx-trash-alt'></i>
                    </button>            
                  </div>
              </div>
      
      `

      $("#docs_images").append(img_html);
  })
    myDropzoneMulti.on('sending', function (file, xhr, formData) {
      
        // این تابع برای هر فایل قبل از ارسال فراخوانی می‌شود
        // file: اطلاعات فایل در حال ارسال
        // xhr: شیء XMLHttpRequest برای درخواست ارسال
        // formData: داده‌های فرم که به درخواست ارسالی اضافه می‌شود
      

      })
      myDropzoneMulti.on('removedfile', function (file) {
        // این تابع برای هر فایلی که از Dropzone حذف می‌شود، فراخوانی می‌شود
        // می‌توانید اطلاعات فایل به سمت سرور ارسال کنید و سپس سرور اقدام به حذف فایل کند
        var parentDiv = $("#dropzone-multii");

        // گرفتن المان input با استفاده از name
        var childInput = parentDiv.find(":input[name='csrfmiddlewaretoken']");
        console.log(childInput.val())
        // ارسال اطلاعات فایل به سرور
        $.ajax({
          type: 'DELETE',
          url: $("#doc_images").val(),
          headers: {
            // افزودن توکن CSRF به هدر درخواست
            "X-CSRFToken": childInput.val()
          },
          data: { filename: file.name,status:1,csrfmiddlewaretoken:childInput.val() },
          success: function (response) {
            console.log(response)
           
            $(`#img_${response['image_id']}`).remove();
          },
          error: function (error) {
            console.error('Error deleting file on server:', error);
          }
        });
      });
 
    
  }
})();


$(document).ready(function(){
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
        BtnStyle(true,"EditCostumerBtn")
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


function delete_image_exsit (image_id){
  console.log(image_id)
  
  var parentDiv = $("#dropzone-multii");

  // گرفتن المان input با استفاده از name
  var childInput = parentDiv.find(":input[name='csrfmiddlewaretoken']");
  console.log(childInput.val())
  // ارسال اطلاعات فایل به سرور
  $.ajax({
    type: 'DELETE',
    url: `/InstallMent/delete_image_doc/${image_id}`,
    headers: {
      // افزودن توکن CSRF به هدر درخواست
      "X-CSRFToken": childInput.val()
    },

    success: function (response) {
      console.log(response)
     
      $(`#img_${image_id}`).remove();
    },
    error: function (error) {
      console.error('Error deleting file on server:', error);
    }
  });
}