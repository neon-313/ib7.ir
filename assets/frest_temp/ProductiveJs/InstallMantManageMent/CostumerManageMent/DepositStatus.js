/**
 * DataTables Extensions (jquery)
 */

'use strict';
function separateNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


$(function () {

  var dt_scrollable_table = $('.dt-scrollableTable');
    // dt_fixedheader_table = $('.dt-fixedheader'),
    // dt_fixedcolumns_table = $('.dt-fixedcolumns'),
    // dt_select_table = $('.dt-select-table');

  // Scrollable

  // --------------------------------------------------------------------

  if (dt_scrollable_table.length) {
    var requestgetdataurl = $("#GetDepositData").val();
    var dt_scrollableTable = dt_scrollable_table.DataTable({
      ajax: requestgetdataurl,
      columns: [
        { data: 'fake_id' },
        { data: "deposit_date" },
        { data: 'dis' },
        { data: '' },
        { data: '' },
       

        { data: '' },

  
        // { data: '' },
        
      ],
      columnDefs: [
  
        {
          // Actions
          targets: 3,
          
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            var textValue = full['price_deposited'];

         
            var number = parseInt(textValue, 10);
        
            var separatedNumber = separateNumber(number);
            return (
          
             
              
              `<span id="price" >${separatedNumber}</span>`
            );
          }
        },
        {
          // Actions
          targets: 4,
          
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            var textValue = full['bestankar_price'];

         
            var number = parseInt(textValue, 10);
        
            var separatedNumber = separateNumber(number);
            return (
          
             
              
              `<span id="price" >${separatedNumber}</span>`
            );
          }
        },
  
        {
          // Actions
          targets: -1,
          title: 'تغییرات',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
         
            return (
          
              `<button  onclick = "DeleteDeposit(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-message-alt-x bx-tada"></i></button>` +
              
              `<button type="button" data-bs-toggle="modal" data-bs-target="#EditDeposit_${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class="bx bx-message-edit bx-tada" ></i></button>`
            );
          }
        },
        // {
        //   // Actions
        //   targets: -2,
        //   title: 'مدارک',
        //   searchable: false,
        //   orderable: false,
        //   render: function (data, type, full, meta) {
         
        //     return (
          
           
              
        //       `<a href="/InstallMent/DocumentImages/${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class='bx bx-show-alt'></i></a>`
        //     );
        //   }
        // },
        // {
        //   // Actions
        //   targets: -3,
        //   title: 'صورت حساب ها',
        //   searchable: false,
        //   orderable: false,
        //   render: function (data, type, full, meta) {
         
        //     return (
          
           
              
        //       `<a href="/InstallMent/FilterFactorCostumer/${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class='bx bx-show-alt'></i></a>`
        //     );
        //   }
        // },
        // {
        //   // Actions
        //   targets: -4,
        //   title: 'وضعیت',
        //   searchable: false,
        //   orderable: false,
        //   render: function (data, type, full, meta) {
        //     if (full['is_active']){

        //       return (
            
             
                
        //         `                        
        //          <label class="switch switch-square">
        //         <input type="checkbox" class="switch-input" checked onchange="ChangeUserStatus(this,${full['user_id']})">
        //         <span class="switch-toggle-slider">
        //           <span class="switch-on"><i class="bx bx-check"></i></span>
        //           <span class="switch-off"><i class="bx bx-x"></i></span>
        //         </span>
              
        //       </label>`
        //       );
        //     }else{
        //       return (
            
             
                
        //         `                        
        //          <label class="switch switch-square">
        //         <input type="checkbox" class="switch-input"  onchange="ChangeUserStatus(this,${full['user_id']})">
        //         <span class="switch-toggle-slider">
        //           <span class="switch-on"><i class="bx bx-check"></i></span>
        //           <span class="switch-off"><i class="bx bx-x"></i></span>
        //         </span>
              
        //       </label>`
        //       );

        //     }
        //   }
        // },
 
      ],
      rowCallback: function(row, data) {
        
      // Customize the style of each row here
      row.setAttribute('id', `row_${data['user_id']}`);
      if (data['is_active'] == true){

        $(row).css('background-color',"#dbf6a1"); // Set the background color
      }else{
        $(row).css('background-color',"#fae9b7"); // Set the background color

      }
      },

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



  var options = {

    parallelUploads: 1,
    maxFilesize: 5,
    addRemoveLinks: true,
    maxFiles: 1,
  };

  Object.assign(options, messages);

  const CheckImage = document.getElementById('CheckImage');

  if (CheckImage) {
    const MyCheckImage = new Dropzone(CheckImage, {

      parallelUploads: 1,
      maxFilesize: 5,
      addRemoveLinks: true,
      maxFiles: 5,

    });
    MyCheckImage.processQueue()
    MyCheckImage.on('sending', function (file, xhr, formData) {

      // این تابع برای هر فایل قبل از ارسال فراخوانی می‌شود
      // file: اطلاعات فایل در حال ارسال
      // xhr: شیء XMLHttpRequest برای درخواست ارسال
      // formData: داده‌های فرم که به درخواست ارسالی اضافه می‌شود


    })
    MyCheckImage.on('removedfile', function (file) {
      // این تابع برای هر فایلی که از Dropzone حذف می‌شود، فراخوانی می‌شود
      // می‌توانید اطلاعات فایل به سمت سرور ارسال کنید و سپس سرور اقدام به حذف فایل کند
      var parentDiv = $("#dropzone-multii");

      // // گرفتن المان input با استفاده از name
      var childInput = parentDiv.find(":input[name='csrfmiddlewaretoken']");
      // // ارسال اطلاعات فایل به سرور
      $.ajax({
        type: 'DELETE',
        url: '/InstallMent/ImageChekPeyDeposit',
        headers: {
          // افزودن توکن CSRF به هدر درخواست
          "X-CSRFToken": childInput.val()
        },
        data: { filename: file.name, status: 1, csrfmiddlewaretoken: childInput.val() },
        success: function (response) {
        },
        error: function (error) {
        }
      });
    });


  }
});

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
      btn.append("ذخیره تغییرات")
      var main_btn = document.getElementById(btn_id)
      main_btn.disabled= false;
    }
  }
$(document).ready(function() {

    

    $("#CreateDepositForm").submit(function(e) {
        e.preventDefault();
        BtnStyle(true,"CreateDepositBtn")
        const form_data = $("#CreateDepositForm")
        var filess = document.getElementsByName("documentss")
  
        var formData = new FormData(this);
        var requesturl = $("#CreateDepositForm").attr("action")
  
  
        $.ajax({
          url :requesturl,
          method :"POST",
          processData: false,
          contentType: false,
          data : formData,
          success: function(response) {
            Swal.fire({
              title: 'موفق',
              text: "واریزی جدید با موفقیت ثبت شد",
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
            BtnStyle(false,"CreateDepositBtn")
          }
  
        })
      });
});
function CreateDepCheck(){
 
  BtnStyle(true,"CreateDepositBtnCheck")
  const form_data = $("#CreateDepositFormCheck")


 
  var requesturl = $("#CreateDepositFormCheck").attr("action")


  $.ajax({
    url :requesturl,
    method :"POST",
   
    data : form_data.serialize(),
    success: function(response) {
      Swal.fire({
        title: 'موفق',
        text: "واریزی جدید با موفقیت ثبت شد",
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
      BtnStyle(false,"CreateDepositBtnCheck")
    }

  })
}


function EditDeposit(deposit_id){
  
  BtnStyle(true,`EditDepositBtn_${deposit_id}`)
  const form_data = $(`#EditDepositForm_${deposit_id}`)

 
  var requesturl = $(`#EditDepositForm_${deposit_id}`).attr("action")


  $.ajax({
    url :requesturl,
    method :"PUT",

    data : form_data.serialize(),
    success: function(response) {
      Swal.fire({
        title: 'موفق',
        text: "واریزی جدید با موفقیت ثبت شد",
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
      BtnStyle(false,`EditDepositBtn_${deposit_id}`)
    }

  })
}

function DeleteDeposit(costumer_id){
  Swal.fire({
    title: 'هشدار!',
    text: ' آیا از حذف این واریزی مطمن هستید؟؟؟',
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
      var requesturl = $("#GetDepositData2").val(); 
      $.ajax({
        url:requesturl + `/${costumer_id}`,
        method :"DELETE",
        headers: {
          // افزودن توکن CSRF به هدر درخواست
          "X-CSRFToken": $("input[name=csrfmiddlewaretoken]").val(),
        },
  
        success:function (response){
          Swal.fire({
            title: 'موفق',
            text: "واریزی مورد نظر با موفقیت حذف شد",
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

var spans = $('span[id="price"]');

// تابعی برای جدا کردن عدد به 3 رقم


$(document).ready(function() {
  var elements = $('[id="flate-picker-edit"]')

  elements.each(function(index) {
  
    const flate = elements[index]
    flate.flatpickr({
      monthSelectorType: 'static',
      locale: 'fa',
      altInput: true,
      altFormat: 'Y/m/d',
      disableMobile: true
    });
    // Do something with each element
  });
  var number = parseInt( $("#total_pricee").text(), 10);
  
  var separatedNumber = separateNumber(number);
  $("#total_pricee").text(separatedNumber)
  
});

$(document).on("click",".form-check-input",function(){
  var selectedValue = $(this).val();
  
  if (selectedValue == '1'){
    $("#cash_pey_label_id").text(" حساب ها")
    $.ajax({
      url:`/InstallMent/peyment_method/1`,
      method:"GET",
      success:function(response){
        $("#cash_pey_id").attr("name","money_recaiver_ib7")
        $("#cash_pey_id").empty();
        for (var i in response){
          var item = response[i]
          var opt = `<option value="${item['id']}" >${item['title']}</option>`
          $("#cash_pey_id").append(opt)
        }

      },
    })
  }else{
    $.ajax({
      url:`/InstallMent/peyment_method/2`,
      method:"GET",
      success:function(response){
        $("#cash_pey_id").attr("name","money_receiver")
        $("#cash_pey_label_id").text("طرف حساب ها")
        $("#cash_pey_id").empty();
        for (var i in response){
          var item = response[i]
          var opt = `<option value="${item['id']}" >${item['first_name']}  ${item['last_name']}</option>`
         
          $("#cash_pey_id").append(opt)
        }

      },
    })
  }
})