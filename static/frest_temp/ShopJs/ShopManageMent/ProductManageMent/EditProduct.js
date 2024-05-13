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
    dropzoneBasic.on("success", function (file, response) {
        // Handle the success response from the server
        console.log(response);
        var img_html = `
        
        <div class="image-container">
        <button class="btn-primary" type="button" onclick="DeleteMainImage(${$("#pro_id").val()})">
          <img src="${response['url']}" alt="Your Image" class="img-fluid">
        </button>
        <i class="fas fa-trash trash-icon"></i>
      </div>
        
        `
        $("#main_image_div").empty();
        $("#main_image_div").append(img_html);
    })
    dropzoneBasic.on('sending', function (file, xhr, formData) {
        console.log("FUck ")
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
          url: `/ShopManageMent/DeleteMainImagePro/${$("#pro_id").val()}`,
          data: { filename: file.name },
          success: function (response) {
            console.log('File deleted on server:', response);
            $("#main_image_div").empty();
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

    myDropzoneMulti.on("success", function (file, response) {
        // Handle the success response from the server
        console.log(response);
        var img_html = `
   
        <div class="col-3" id="row_${response['id']}">

        <div class="image-container">
            <button class="btn-primary" type="button" onclick="DeleteGalImage(${response['id']})">
              <img src="${response['url']}" alt="Your Image" class="img-fluid">
            </button>
            <i class="fas fa-trash trash-icon"></i>
          </div>

        

    </button>
    </div>
        
        `
       
        $("#galery_image").append(img_html);
    })
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
          url: '/ShopManageMent/delete_galery_image',
          data: { filename: file.name },
          success: function (response) {
            $(`#row_${response['id']}`).remove();
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
      console.log("fuck")
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

  function editProperty(property_id){

    const form_data= $(`#PropertyForm_${property_id}`)
    var req_url =$(`#PropertyForm_${property_id}`).attr("action")
    console.log(req_url)
    Swal.fire({
      title: 'هشدار!',
      text: ' آیا از ویرایش این ویژگی اطمینان دارید؟',
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
        var csrftoken =form_data.find('input[name="csrfmiddlewaretoken"]').val();
        console.log(csrftoken)
        $.ajax({
          url:req_url,
          method :"PUT",
          data:form_data.serialize(),
          beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);  // Set CSRF token in the request header
          },
          success:function (response){
            Swal.fire({
              title: 'موفق',
              text: "ویژگی مورد نظر با موفقیت آپدیت شد",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              confirmButtonText: 'باشه',
              buttonsStyling: false
      
            })
  
          },
        })
      }
    })
    // $.ajax({})
  };
  function editSpeciFication(sp_id){

    const form_data= $(`#SpeForm_${sp_id}`)
    var req_url =$(`#SpeForm_${sp_id}`).attr("action")
    console.log(req_url)
    Swal.fire({
      title: 'هشدار!',
      text: ' آیا از ویرایش این مشخصات اطمینان دارید؟',
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
        var csrftoken =form_data.find('input[name="csrfmiddlewaretoken"]').val();
        console.log(csrftoken)
        $.ajax({
          url:req_url,
          method :"PUT",
          data:form_data.serialize(),
          beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);  // Set CSRF token in the request header
          },
          success:function (response){
            Swal.fire({
              title: 'موفق',
              text: "مشخصات مورد نظر با موفقیت آپدیت شد",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              confirmButtonText: 'باشه',
              buttonsStyling: false
      
            })
  
          },
        })
      }
    })
    // $.ajax({})
  };
  function deleteProperty(property_id){

    const form_data= $(`#PropertyForm_${property_id}`)
    var req_url =$(`#PropertyForm_${property_id}`).attr("action")
    console.log(req_url)
    Swal.fire({
      title: 'هشدار!',
      text: ' آیا از حذف این ویژگی اطمینان دارید؟',
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
        var csrftoken =form_data.find('input[name="csrfmiddlewaretoken"]').val();
        console.log(csrftoken)
        $.ajax({
          url:req_url,
          method :"DELETE",
         
          beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);  // Set CSRF token in the request header
          },
          success:function (response){
            $(`#prop_item_${property_id}`).empty(); 
            $(`#prop_item_${property_id}`).remove(); 
            Swal.fire({
              title: 'موفق',
              text: "ویژگی مورد نظر با موفقیت حذف شد",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              confirmButtonText: 'باشه',
              buttonsStyling: false
      
            })
  
          },
        })
      }
    })
    // $.ajax({})
  };
  function deleteSpeciFication(spe_id){

    const form_data= $(`#SpeForm_${spe_id}`)
    var req_url =$(`#SpeForm_${spe_id}`).attr("action")
    console.log(req_url)
    Swal.fire({
      title: 'هشدار!',
      text: ' آیا از حذف این مشخصات اطمینان دارید؟',
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
        var csrftoken =form_data.find('input[name="csrfmiddlewaretoken"]').val();
        console.log(csrftoken)
        $.ajax({
          url:req_url,
          method :"DELETE",
         
          beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);  // Set CSRF token in the request header
          },
          success:function (response){
            $(`#sep_item_${spe_id}`).empty(); 
            $(`#sep_item_${spe_id}`).remove(); 
            Swal.fire({
              title: 'موفق',
              text: "ویژگی مورد نظر با مشخصات حذف شد",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              confirmButtonText: 'باشه',
              buttonsStyling: false
      
            })
  
          },
        })
      }
    })
    // $.ajax({})
  };
$(document).ready(function () {
    var number = parseInt($("#product_price").text(), 10);
    var separatedNumber = separateNumber(number);
    $("#product_price").text(`${separatedNumber} تومان`);
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
          method: "PUT",
          data: form_data,
          processData: false,
          contentType: false,
          success: function(response) {
              Swal.fire({
                  title: 'موفق',
                  text: "محصول مورد نظر با موفقیت ویرایش شد",
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


function DeleteMainImage(id){
    $.ajax({
        url :`/ShopManageMent/delete_main_image/${id}`,
        method :"GET",
    

        success: function(response) {
            $("#main_image_div").empty();
        },


      })

}

function DeleteGalImage(id){
    $.ajax({
        url :`/ShopManageMent/delete_g_image/${id}`,
        method :"GET",
    

        success: function(response) {
            $(`#row_${id}`).remove();
        },


      })

}