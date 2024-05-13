/**
 * File Upload
 */

'use strict';

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
  var options = {
    paramName:"filekiri",
    previewTemplate: previewTemplate,
    parallelUploads: 1,
    maxFilesize: 5,
    addRemoveLinks: true,
    maxFiles: 1,
    url: '/test-upload-endpoint', 
    parallelUploads:1,
    parallelChunkUploads:true,
  };
  Object.assign(options, messages);

  const dropzoneBasicc = document.getElementById('dropzone-basic');
  if (dropzoneBasicc) {
    const dropzoneBasic = new Dropzone(dropzoneBasicc, {
     
      parallelUploads: 1,
      maxFilesize: 5,
      addRemoveLinks: true,
      maxFiles: 1,
    
    });
    dropzoneBasic.processQueue()
    dropzoneBasic.on('sending', function (file, xhr, formData) {

        // این تابع برای هر فایل قبل از ارسال فراخوانی می‌شود
        // file: اطلاعات فایل در حال ارسال
        // xhr: شیء XMLHttpRequest برای درخواست ارسال
        // formData: داده‌های فرم که به درخواست ارسالی اضافه می‌شود
      

      })
      dropzoneBasic.on('removedfile', function (file) {
        // این تابع برای هر فایلی که از Dropzone حذف می‌شود، فراخوانی می‌شود
        // می‌توانید اطلاعات فایل به سمت سرور ارسال کنید و سپس سرور اقدام به حذف فایل کند
      
        // ارسال اطلاعات فایل به سرور
        $.ajax({
          type: 'GET',
          url: '/ShopManageMent/DeleteMainFileProduct',
          data: { filename: file.name },
          success: function (response) {
            console.log('File deleted on server:', response);
          },
          error: function (error) {
            console.error('Error deleting file on server:', error);
          }
        });
      });
      
  }

  // Multiple Dropzone
  // --------------------------------------------------------------------
  var options = {
   
    parallelUploads: 1,
    maxFilesize: 5,
    addRemoveLinks: true,
    maxFiles: 5,
  };
  Object.assign(options, messages);

  const dropzoneMulti =  document.getElementById('dropzone-multi');
  if (dropzoneMulti) {
    const myDropzoneMulti = new Dropzone(dropzoneMulti, {
     
      parallelUploads: 1,
      maxFilesize: 5,
      addRemoveLinks: true,
      maxFiles: 5,
    
    });
    myDropzoneMulti.processQueue()
    myDropzoneMulti.on('sending', function (file, xhr, formData) {
        console.log("FUck ")
        // این تابع برای هر فایل قبل از ارسال فراخوانی می‌شود
        // file: اطلاعات فایل در حال ارسال
        // xhr: شیء XMLHttpRequest برای درخواست ارسال
        // formData: داده‌های فرم که به درخواست ارسالی اضافه می‌شود
      

      })
      myDropzoneMulti.on('removedfile', function (file) {
        // این تابع برای هر فایلی که از Dropzone حذف می‌شود، فراخوانی می‌شود
        // می‌توانید اطلاعات فایل به سمت سرور ارسال کنید و سپس سرور اقدام به حذف فایل کند
      
        // ارسال اطلاعات فایل به سرور
        $.ajax({
          type: 'GET',
          url: '/ShopManageMent/GaleryImageProduct',
          data: { filename: file.name },
          success: function (response) {
            console.log('File deleted on server:', response);
          },
          error: function (error) {
            console.error('Error deleting file on server:', error);
          }
        });
      });
 
    
  }
})();
function BtnStyle(st,btn_id){
    if (st){
      var btn = $(`#${btn_id}`);
      btn.empty();
      btn.append("درحال بارگزاری")
      btn.append(' <span class="spinner-border align-middle" role="status" aria-hidden="true"></span>')
      var main_btn = document.getElementById(btn_id)
      main_btn.disabled= true;
    }else{
     
      var btn = $(`#${btn_id}`);
      btn.empty();
      btn.append("ثبت")
      var main_btn = document.getElementById(btn_id)
      main_btn.disabled= false;
    }
  }

  function separateNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  //   var number = parseInt(price_koll, 10);

  // var separatedNumber = separateNumber(number);



  $(document).ready(function () {
  
    $("#price_id").on("input", function (){
      var number = parseInt($(this).val(), 10);
      var separatedNumber = separateNumber(number);
      $("#product_price").text(` ${separatedNumber} تومان`)
    })
    
    $("#CreateProductBtn").on('click', function(){
        BtnStyle(true,"CreateProductBtn");

        const property_list = [];
        $(".list_property").each(function(index) {
            var title_pr = $(this).find('.title_pr').val();
            var dis_pr = $(this).find('.dis_pr').val();
            const dic ={
                title: title_pr,
                dis: dis_pr
            };
            property_list.push(dic);
        });

        const specification_list = [];
        $(".sp_list").each(function(index) {
            var title_sp = $(this).find('.title_sp').val();
            var dis_sp = $(this).find('.dis_sp').val();
            const dic ={
                title: title_sp,
                dis: dis_sp
            };
            specification_list.push(dic);
        });

        var requesturl = $("#CreateProduct_Form").attr("action");
        var form_data = new FormData($("#CreateProduct_Form")[0]);
        var spe_list = JSON.stringify(specification_list);
        var pr_list = JSON.stringify(property_list);
        form_data.append('sp_list', spe_list);
        form_data.append('pr_list', pr_list);

        $.ajax({
            url: requesturl,
            method: "POST",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
                Swal.fire({
                    title: 'موفق',
                    text: "محصول جدید با موفقیت ثبت شد",
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    confirmButtonText: 'باشه',
                    buttonsStyling: false
                }).then(function (result) {
                    location.href = "/ShopManageMent/ProductList";
                });
            },
            error: function(xhr, status, error) {
                var responseJson = JSON.parse(xhr.responseText);
                Swal.fire({
                    title: "هشدار",
                    text: responseJson['message'],
                    icon: 'error',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    confirmButtonText: 'باشه',
                    buttonsStyling: false
                });
                BtnStyle(false,"CreateCostumerBtn");
            }
        });
    });
});
