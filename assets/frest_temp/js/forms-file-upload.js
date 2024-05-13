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


