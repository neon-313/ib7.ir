/**
 * DataTables Extensions (jquery)
 */


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
          url: '/ShopManageMent/AddSliderImageSession',
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
'use strict';

$(function () {

  var dt_scrollable_table = $('.dt-scrollableTable');
    // dt_fixedheader_table = $('.dt-fixedheader'),
    // dt_fixedcolumns_table = $('.dt-fixedcolumns'),
    // dt_select_table = $('.dt-select-table');

  // Scrollable
  // --------------------------------------------------------------------

  if (dt_scrollable_table.length) {
    var requestgetdataurl = $("#SliderImageManager").val();
    var dt_scrollableTable = dt_scrollable_table.DataTable({
      ajax: requestgetdataurl,
      columns: [
        { data: 'id' },
        { data: '' },


  
        { data: '' },
        
      ],
      columnDefs: [
   
        {
          // Actions
          targets: -1,
          title: 'تغییرات',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
         
            return (
          
              `<button  onclick = "DeleteProduct(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-message-alt-x bx-tada"></i></button>` 
              
              
            );
          }
        },
        {
          // Actions
          targets: -2,
          title: 'تصویر',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
         
            return (
                `<a href="${full['image_url']}" target="_blank"><img src="${full['image_url']}" alt="" width="50px" height="50px"></a>` 
              
              
            );
          }
        },


 
      ],
    //   rowCallback: function(row, data) {
    //     console.log(data['status_color'])
    //   // Customize the style of each row here
    //   row.setAttribute('id', `row_${data['user_id']}`);
    //   if (data['is_active'] == true){

    //     $(row).css('background-color',"#dbf6a1"); // Set the background color
    //   }else{
    //     $(row).css('background-color',"#fae9b7"); // Set the background color

    //   }
    //   },
      // Scroll options
      scrollY: '300px',
      scrollX: true,
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>'
    });
  }


  
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 200);
});


function DeleteProduct(Product_id){
  Swal.fire({
    title: 'هشدار!',
    text: ' آیا از حذف این تصویر اطمینان دارید؟؟؟',
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
      var requesturl = $("#SliderImageManager").val(); 
      $.ajax({
        url:requesturl + `/${Product_id}`,
        method :"DELETE",
        success:function (response){
          Swal.fire({
            title: 'موفق',
            text: "تصویر مورد نظر با موفقیت حذف شد",
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


function ChangeUserStatus(status,user_id){
  if (status.checked){
    var status = true;
    var row= document.getElementById(`row_${user_id}`)
    row.style= "background-color:#dbf6a1;"
  
    $.ajax({
      url:`/InstallMent/ChangeStatusUser/${user_id}?status=${status}`,
      method:"GET"
    })
  }else{
    var status = false;
    var row= document.getElementById(`row_${user_id}`)
    row.style= "background-color:#fae9b7;"
    $.ajax({
      url:`/InstallMent/ChangeStatusUser/${user_id}?status=${status}`,
      method:"GET"
    })

  }
}

$(document).ready(function() {
  $("#CreateSliderImageBtn").on("click",function(){
    $.ajax({
      url:$("#SliderImageManager").val(),
      method:"POST",
      success:function (response){
        Swal.fire({
          title: 'موفق',
          text: "با  موفقیت انجام شد",
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
  });
});