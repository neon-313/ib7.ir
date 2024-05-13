function BtnStyle(st, btn_id) {
  if (st) {
    var btn = $(`#${btn_id}`);
    btn.empty();
    btn.append("درحال بارگزاری")
    btn.append(' <span class="spinner-border align-middle" role="status" aria-hidden="true"></span>')
    var main_btn = document.getElementById(btn_id)
    main_btn.disabled = true;
  } else {
    var btn = $(`#${btn_id}`);
    btn.empty();
    btn.append("ذخیره تغییرات")
    var main_btn = document.getElementById(btn_id)
    main_btn.disabled = false;
  }
}
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


  var options = {

    parallelUploads: 1,
    maxFilesize: 5,
    addRemoveLinks: true,
    maxFiles: 1,
  };
  Object.assign(options, messages);

  const dropzoneMulti = document.getElementById('dropzone-multii');

  if (dropzoneMulti) {
    const myDropzoneMulti = new Dropzone(dropzoneMulti, {

      parallelUploads: 1,
      maxFilesize: 5,
      addRemoveLinks: true,
      maxFiles: 5,

    });
    myDropzoneMulti.processQueue()
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
      // ارسال اطلاعات فایل به سرور
      $.ajax({
        type: 'DELETE',
        url: '/InstallMent/FactorImageManageMent',
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
        url: '/InstallMent/CheckImageManager',
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
})();


// function separateNumber(number) {
//   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
// $(function () {

//   var dt_scrollable_table = $('.dt-scrollableTable');
//   var  dt_fixedheader_table = $('.dt-fixedheader');
//     // dt_fixedcolumns_table = $('.dt-fixedcolumns'),
//     // dt_select_table = $('.dt-select-table');

//   // Scrollable
//   // --------------------------------------------------------------------

//   // if (dt_scrollable_table.length) {
//   //   var requestgetdataurl = $("#getproduct_data").val();
//   //   var dt_scrollableTable = dt_scrollable_table.DataTable({
//   //     ajax: requestgetdataurl,
//   //     columns: [
//   //       { data: '' },
//   //       { data: "" },

//   //       { data: '' },
//   //       { data: 'title' },
//   //       { data: 'price' },





//   //     ],
//   //     columnDefs: [
//   //               {
//   //         className: 'control',
//   //         orderable: false,
//   //         targets: 0,
//   //         responsivePriority: 3,
//   //         render: function (data, type, full, meta) {
//   //           return '';
//   //         }
//   //       },
//   //       {
//   //         // For Checkboxes
//   //         targets: 1,
//   //         orderable: false,
//   //         render: function () {
//   //           return '<input type="checkbox" class="dt-checkboxes form-check-input mt-0 align-middle">';
//   //         },
//   //         checkboxes: {
//   //           selectAllRender: '<input type="checkbox" class="form-check-input mt-0 align-middle">'
//   //         },
//   //         responsivePriority: 4
//   //       },
//   //       {
//   //         // Actions
//   //         targets: 2,

//   //         searchable: false,
//   //         orderable: false,
//   //         render: function (data, type, full, meta) {

//   //           return (



//   //             `<img src="${full['main_image']}" width="50px" heigh="50px">`
//   //           );
//   //         }
//   //       },
//   //       {
//   //         // Actions
//   //         targets: 2,

//   //         searchable: false,
//   //         orderable: false,
//   //         render: function (data, type, full, meta) {
//   //           if (full['product_code']){

//   //             return full['product_code']





//   //           }else{
//   //             return "None"



//   //           }
//   //         }
//   //       },


//   //     ],
//   //     // Scroll options
//   //     scrollY: '300px',
//   //     scrollX: true,
//   //     dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>'
//   //   });
//   // }
//   if (dt_fixedheader_table.length) {
//     var requestgetdataurl = $("#getproduct_data").val();
//     var dt_fixedheader = dt_fixedheader_table.DataTable({
//       ajax: requestgetdataurl,
//       columns: [
//         { data: '' },
//         { data: 'id' },
//         { data: 'id' },
//         { data: 'id' },
//         { data: 'title' },
//         { data: 'product_code' },
//         { data: '' },
//         { data: '' },
//         { data: '' }
//       ],
//       columnDefs: [
//         {
//           className: 'control',
//           orderable: false,
//           targets: 0,
//           responsivePriority: 3,
//           render: function (data, type, full, meta) {
//             return '';
//           }
//         },
//         {
//           // For Checkboxes
//           targets: 1,
//           orderable: false,
//           render: function (data, type, full, meta) {
//             return `<input type="checkbox" class="dt-checkboxes form-check-input mt-0 align-middle" onclick="CheckPro(this,${full['id']})" value="${full['id']}" id="check_pro">`;
//           },

//           responsivePriority: 4
//         },
//         {
//           targets: 2,
//           visible: false
//         },
//         {
//           // Avatar image/badge, Name and post
//           targets: 3,
//           render: function (data, type, full, meta) {
//             if (full['main_image']){

//               var output =
//               `<img src="${full['main_image']}" alt="Product" width="50px" height="50px">`
//               return output;
//             }else{
//               var output =
//                 `<img src="" alt="Product" width="50px" height="50px">`
//               return output;

//             }
//           },
//           responsivePriority: 5
//         },
//         {
//           responsivePriority: 1,
//           targets: 4
//         },

//         {
//           responsivePriority: 2,
//           targets: 6,
//           render: function (data, type, full, meta) {

//             var number = parseInt(full['price'], 10);

//             var separatedNumber = separateNumber(number);
//             var output =
//             `<span id="price_${full['id']}" >${full['price']}</span>`
//             return output;

//         },
//         },

//         {
//           // Avatar image/badge, Name and post
//           targets: 7,
//           render: function (data, type, full, meta) {


//               var output =
//               `<input class="form-control" type="number" onchange="ChangeNum(this,${full['id']})" id="quantity_${full['id']}" disabled min="1" value="1" id="html5-number-input">`
//               return output;

//           },
//           responsivePriority: 5
//         },
//         {
//           // Avatar image/badge, Name and post
//           targets: 8,
//           render: function (data, type, full, meta) {


//               var output =
//               `<span id="price_joze_${full['id']}" style="color:red">0 تومان</span>`
//               return output;

//           },
//           responsivePriority: 5
//         },
//         // {
//         //   // Label
//         //   targets: -2,
//         //   render: function (data, type, full, meta) {
//         //     // var $rand_num = Math.floor(Math.random() * 5) + 1;
//         //     var $status_number = full['status'];
//         //     var $status = {
//         //       1: { title: 'کنونی', class: 'bg-label-primary' },
//         //       2: { title: 'حرفه‌ای', class: ' bg-label-success' },
//         //       3: { title: 'رد شده', class: ' bg-label-danger' },
//         //       4: { title: 'استعفا داده', class: ' bg-label-warning' },
//         //       5: { title: 'درخواست داده', class: ' bg-label-info' }
//         //     };
//         //     if (typeof $status[$status_number] === 'undefined') {
//         //       return data;
//         //     }
//         //     return (
//         //       '<span class="badge rounded-pill ' +
//         //       $status[$status_number].class +
//         //       '">' +
//         //       $status[$status_number].title +
//         //       '</span>'
//         //     );
//         //   }
//         // },
//         // {
//         //   // Actions
//         //   targets: -1,
//         //   title: 'عمل‌ها',
//         //   orderable: false,
//         //   render: function (data, type, full, meta) {
//         //     return (
//         //       '<div class="d-inline-block">' +
//         //       '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
//         //       '<div class="dropdown-menu dropdown-menu-end m-0">' +
//         //       '<a href="javascript:;" class="dropdown-item">جزئیات</a>' +
//         //       '<a href="javascript:;" class="dropdown-item">بایگانی</a>' +
//         //       '<div class="dropdown-divider"></div>' +
//         //       '<a href="javascript:;" class="dropdown-item text-danger delete-record">حذف</a>' +
//         //       '</div>' +
//         //       '</div>' +
//         //       '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="bx bxs-edit"></i></a>'
//         //     );
//         //   }
//         // }
//       ],
//       rowCallback: function(row, data) {

//       // Customize the style of each row here
//       row.setAttribute('id', `row_${data['id']}`);

//       },
//       order: [[2, 'desc']],
//       dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
//       displayLength: 7,
//       lengthMenu: [7, 10, 25, 50, 75, 100],
//       responsive: {
//         details: {
//           display: $.fn.dataTable.Responsive.display.modal({
//             header: function (row) {
//               var data = row.data();
//               return 'جزئیات ' + data['full_name'];
//             }
//           }),
//           type: 'column',
//           renderer: function (api, rowIdx, columns) {
//             var data = $.map(columns, function (col, i) {
//               return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
//                 ? '<tr data-dt-row="' +
//                     col.rowIndex +
//                     '" data-dt-column="' +
//                     col.columnIndex +
//                     '">' +
//                     '<td>' +
//                     col.title +
//                     ':' +
//                     '</td> ' +
//                     '<td>' +
//                     col.data +
//                     '</td>' +
//                     '</tr>'
//                 : '';
//             }).join('');

//             return data ? $('<table class="table"/><tbody />').append(data) : false;
//           }
//         }
//       }
//     });
//     // Fixed header
//     if (window.Helpers.isNavbarFixed()) {
//       var navHeight = $('#layout-navbar').outerHeight();
//       new $.fn.dataTable.FixedHeader(dt_fixedheader).headerOffset(navHeight);
//     } else {
//       new $.fn.dataTable.FixedHeader(dt_fixedheader);
//     }

//   }

//   setTimeout(() => {
//     $('.dataTables_filter .form-control').removeClass('form-control-sm');
//     $('.dataTables_length .form-select').removeClass('form-select-sm');
//   }, 200);
// });



// $(document).ready(function() {
//     $('#persianInput').on('keyup', function() {
//         var inputValue = $(this).val();
//         var persianPattern = /^[\u0600-\u06FF\s]+$/; // منظم‌سازی برای حروف فارسی و فاصله

//         if (!persianPattern.test(inputValue)) {
//           Swal.fire({
//             title: 'هشدار!',
//             text: 'لطفا از کلمات فارسی استفاده کنید',
//             icon: 'warning',

//             customClass: {
//               confirmButton: 'btn btn-primary',

//             },

//             confirmButtonText: 'باشه',
//             buttonsStyling: false,
//           })
//           var inp = document.getElementById("persianInput")
//           inp.value= null
//           }
//     });
//     $("#CreateFactorBtn").on("click",function(e) {
//         e.preventDefault();
//         BtnStyle(st=true,btn_id="CreateFactorBtn")
//         const form_data = $("#CreateFactorForm")

//         // const formData = $(this).serialize();
//         var requesturl = $("#CreateFactorForm").attr("action")
//         var selectedValue = $('#states').val();
//         var checkboxes = $('input[type="checkbox"]');

//         // بررسی هر چک‌باکس و چک کردن وضعیت checked آن
//         const products=[]
//         checkboxes.each(function() {

//           if (this.checked) {

//             var quantity= $(`#quantity_${this.value}`).val();

//            products.push({
//             id: this.value,
//             quantity: quantity,

//            })

//           } 
//         });

//         var dis = document.getElementById("dis").value;
//         console.log($("input[name='csrfmiddlewaretoken']").val(),);
//         var datatosend={
//           products : products,
//           discription:dis,
//           csrfmiddlewaretoken:$("input[name='csrfmiddlewaretoken']").val(),
//         }
//         console.log(products)
//         $.ajax({
//           url :requesturl + `?costumer=${selectedValue}`,
//           method :"GET",

//           data : JSON.stringify(datatosend),
//           success: function(response) {
//             // BtnStyle(false,"CreateFactorBtn")
//             var input = `<input type="hidden" value="${response['factor_id']}" name="factorid">`
//             $("#SummeryForm").append(input)
//             var title_text= document.getElementById("backDropModalTitle")
//             title_text.innerText=`قیمت نهایی محصولات ${response['total_price']}`
//             
//           },
//           error: function(xhr, status, error) {

//             var responseJson = JSON.parse(xhr.responseText);

//             Swal.fire({
//               title:"هشدار",
//               text: responseJson['message'],
//               icon: 'error',
//               customClass: {
//                 confirmButton: 'btn btn-primary'
//               },
//               confirmButtonText: 'باشه',
//               buttonsStyling: false
//             });
//             BtnStyle(false,"CreateFactorBtn")
//           }

//         })
//       });
//     $("#CreateTimeFactorBtn").on("click",function() {
//       BtnStyle(st=true,btn_id="CreateTimeFactorBtn")
//       const form = $("#CreateTimeFactorForm")
//       var requesturl= $("#CreateTimeFactorForm").attr("action")
//       console.log("FUCKKK")
//       console.log(requesturl)
//       console.log(form.serialize())
//       $.ajax({
//         url:requesturl,
//         method:"POST",
//         data:form.serialize(),
//         success: function(response) {
//           Swal.fire({
//             title: 'موفق',
//             text: response['message'],
//             icon: 'success',
//             customClass: {
//               confirmButton: 'btn btn-primary'
//             },
//             confirmButtonText: 'باشه',
//             buttonsStyling: false

//           }).then(function (result) {
//             location.href= response['redirect_url']
//           })

//         },
//         error: function(xhr, status, error) {
//           Swal.fire({
//             title:"هشدار",
//             text: "مشکلی پیش آمده لطفا دوباره امتحان کنید",
//             icon: 'error',
//             customClass: {
//               confirmButton: 'btn btn-primary'
//             },
//             confirmButtonText: 'باشه',
//             buttonsStyling: false
//           });
//           BtnStyle(false,"CreateTimeFactorBtn")

//         }
//       })
//     });
//     $("#CreateInput").on('click',function(){
//       var count = $("#Count").val();
//       $("#main_div").empty();
//       for (var i = 1; i <= Number(count); i++) {
//         $("#main_div").append(
//           `
//         <div class="col mb-0">
//         <label class="form-label" for="num_print">تاریخ پرداخت پیش پرداخت </label>
//         <div class="input-group input-group-merge">
//           <span id="basic-icon-default-fullname2" class="input-group-text"><i class='bx bx-window-open'></i></span>
//           <input type="text" class="form-control" name="prepayment_date" placeholder="YYYY/MM/DD" id="flatpickr-date_${i}">
//         </div>
//         </div>
//     `

//         )
//       }
//     })



// });







// function CheckPro(check,product_id){
//   if (check.checked){
//     $(`#quantity_${product_id}`).prop('disabled', false);
//     var quantity= $(`#quantity_${product_id}`).val();
//     var price= $(`#price_${product_id}`).text();
//     var price_kol= Number(quantity) * Number(price)

//     var number = parseInt(price_kol, 10);

//     var separatedNumber = separateNumber(number);
//     $(`#price_joze_${product_id}`).text(`${separatedNumber} تومان`)
//     $(`#price_joze_${product_id}`).attr("color","black");
//     var checkboxes = $('input[type="checkbox"]');

//     // بررسی هر چک‌باکس و چک کردن وضعیت checked آن
//     var price_koll=0
//     checkboxes.each(function() {

//       if (this.checked) {

//         var quantity= $(`#quantity_${this.value}`).val();
//         var price= $(`#price_${this.value}`).text();
//         var price_kol= Number(quantity) * Number(price)
//         price_koll+=price_kol
//       } 
//     });
//     var number = parseInt(price_koll, 10);

//     var separatedNumber = separateNumber(number);
//     $("#price_kol").text(`${separatedNumber} تومان`)
//   }else{
//     $(`#quantity_${product_id}`).prop('disabled', true);
//     $(`#price_joze_${product_id}`).text(`0 تومان`)
//     $(`#price_joze_${product_id}`).attr("color","red");
//     var checkboxes = $('input[type="checkbox"]');
//     var price_koll=0
//     checkboxes.each(function() {

//       if (this.checked) {

//         var quantity= $(`#quantity_${this.value}`).val();
//         var price= $(`#price_${this.value}`).text();
//         var price_kol= Number(quantity) * Number(price)
//         price_koll+=price_kol
//       }
//     });
//     var number = parseInt(price_koll, 10);

//     var separatedNumber = separateNumber(number);
//     $("#price_kol").text(`${separatedNumber} تومان`)
//   }

// }

// function ChangeNum(inp,product_id){
//   var price= $(`#price_${product_id}`).text();
//   var price_kol= Number(inp.value) * Number(price)
//   var number = parseInt(price_kol, 10);

//   var separatedNumber = separateNumber(number);
//   $(`#price_joze_${product_id}`).text(`${separatedNumber} تومان`)
//   var checkboxes = $('input[type="checkbox"]');
//   var price_koll=0
//   checkboxes.each(function() {

//     if (this.checked) {

//       var quantity= $(`#quantity_${this.value}`).val();
//       var price= $(`#price_${this.value}`).text();
//       var price_kol= Number(quantity) * Number(price)
//       price_koll+=price_kol
//     }
//   });
//   var number = parseInt(price_koll, 10);

//   var separatedNumber = separateNumber(number);
//   $("#price_kol").text(`${separatedNumber} تومان`)
// }

// var datetime_input = `
// <div class="col mb-0">
// <label class="form-label" for="num_print">تاریخ پرداخت پیش پرداخت </label>
// <div class="input-group input-group-merge">
//   <span id="basic-icon-default-fullname2" class="input-group-text"><i class='bx bx-window-open'></i></span>
//   <input type="text" class="form-control" name="prepayment_date" placeholder="YYYY/MM/DD" id="flatpickr-date_2">
// </div>
// </div>
// `

// var installment_count = `
// <div class="col mb-0">
// <label for="emailBackdrop" class="form-label">تعداد اقساط </label>
// <input type="text" id="emailBackdrop" name="installment_count" class="form-control" placeholder="لطفا تعداد اقساط مورد نظر را وارد کنید">
// </div>
// <div class="col mb-0">

// <div class="input-group input-group-merge">
//   <button type="button" class="btn btn-dark">ثبت </button>
// </div>
// </div>
// `


function separateNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(function () {
  $("#select_costumer").on("change", function () {

    $.ajax({
      url: `/InstallMent/CostumerDetail/${$(this).val()}`,
      method: "GET",
      success: function (response) {

        $('#fullname_p').text(response['fullname']),
          $("#phone_p").text(response['phone'])
        $("#state_city").text(response['state_city'])

      }

    })
  })
})





/**
 * App Invoice - Add
 */

'use strict';

(function () {
  const invoiceItemPriceList = document.querySelectorAll('.invoice-item-price'),
    invoiceItemQtyList = document.querySelectorAll('.invoice-item-qty'),
    invoiceDateList = document.querySelectorAll('.date-picker');


  // Price


  if (invoiceItemPriceList) {
    invoiceItemPriceList.forEach(function (invoiceItemPrice) {
      new Cleave(invoiceItemPrice, {
        delimiter: '',
        numeral: true
      });
    });
  }

  // Qty
  if (invoiceItemQtyList) {
    invoiceItemQtyList.forEach(function (invoiceItemQty) {
      new Cleave(invoiceItemQty, {
        delimiter: '',
        numeral: true
      });
    });
  }

  // Datepicker
  if (invoiceDateList) {
    invoiceDateList.forEach(function (invoiceDateEl) {
      invoiceDateEl.flatpickr({
        monthSelectorType: 'static',
        locale: 'fa',
        altInput: true,
        altFormat: 'Y/m/d',
        disableMobile: true
      });
    });
  }
})();

// repeater (jquery)
$(function () {
  var applyChangesBtn = $('.btn-apply-changes'),
    discount,
    tax1,
    tax2,
    discountInput,
    tax1Input,
    tax2Input,
    sourceItem = $('.source-item'),
    adminDetails = {
      'App Design': 'طراحی ابزار UI و صفحات برنامه.',
      'App Customization': 'سفارشی سازی و رفع ایراد.',
      'ABC Template': 'قالب مدیریت بوت‌استرپ 4.',
      'App Development': 'توسعه برنامه بومی.'
    };

  // Prevent dropdown from closing on tax change
  $(document).on('click', '.tax-select', function (e) {
    e.stopPropagation();
  });

  // On tax change update it's value value
  function updateValue(listener, el) {
    listener.closest('.repeater-wrapper').find(el).text(listener.val());
  }

  // Apply item changes btn
  if (applyChangesBtn.length) {
    $(document).on('click', '.btn-apply-changes', function (e) {
      var $this = $(this);
      tax1Input = $this.closest('.dropdown-menu').find('#taxInput1');
      tax2Input = $this.closest('.dropdown-menu').find('#taxInput2');
      discountInput = $this.closest('.dropdown-menu').find('#discountInput');
      tax1 = $this.closest('.repeater-wrapper').find('.tax-1');
      tax2 = $this.closest('.repeater-wrapper').find('.tax-2');
      discount = $('.discount');

      if (tax1Input.val() !== null) {
        updateValue(tax1Input, tax1);
      }

      if (tax2Input.val() !== null) {
        updateValue(tax2Input, tax2);
      }

      if (discountInput.val().length) {
        $this
          .closest('.repeater-wrapper')
          .find(discount)
          .text(discountInput.val() + '%');
      }
    });
  }

  // Repeater init
  if (sourceItem.length) {
    sourceItem.on('submit', function (e) {
      e.preventDefault();
    });
    sourceItem.repeater({
      show: function () {
        $(this).slideDown();

        $(".select2").each(function () {

          var $this = $(this);
          $this.wrap('<div class="position-relative"></div>').select2({
            placeholder: 'انتخاب',
            dropdownParent: $this.parent()
          });
        })

        // Initialize tooltip on load of each item
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
      },
      hide: function (e) {
        $(this).slideUp();
      }
    });
  }
  // Repeater init
  // if (sourceItem.length) {
  //   sourceItem.on('submit', function (e) {
  //     e.preventDefault();

  //     // اجرای توابع مربوط به افزودن ایتم

  //     // افزودن Select2 به هر المان select
  //     $(this).find('select2').each(function () {
  //       var $this = $(this);
  //    
  //       $this.wrap('<div class="position-relative"></div>').select2({
  //         placeholder: 'انتخاب',
  //         dropdownParent: $this.parent()
  //       });
  //     });

  //     // Initialize tooltip on load of each item
  //     const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  //     tooltipTriggerList.map(function (tooltipTriggerEl) {
  //       return new bootstrap.Tooltip(tooltipTriggerEl);
  //     });
  //   });
  //   sourceItem.repeater({
  //     show: function () {
  //       $(this).slideDown();
  //     },
  //     hide: function (e) {
  //       $(this).slideUp();
  //     }
  //   });
  // }

  // Item details select onchange
  function make_total_price(price, qnty) {
    var total_price = 0
    $(price).each(function () {

      total_price += Number($(this).val());
    })
    var total_num = 0
    $(qnty).each(function () {

      total_num += Number($(this).val());

    })
    main_price = total_price * total_num
    var number = parseInt(Number(main_price), 10);
    var separatedNumber = separateNumber(number);

    $(".joze").text(` تومان  ${separatedNumber}`)
    $(".total").text(` تومان  ${separatedNumber}`)
  };
  $(document).on('change', '.item-details', function () {
    var $this = $(this),
      value = $this.val()
    var repeaterForm = $this.closest('.repeater-wrapper');


    var otherInput1 = repeaterForm.find('.invoice-item-price');
    var otherInput2 = repeaterForm.find('.invoice-item-qty');

    otherInput1.prop('disabled', false);
    otherInput2.prop('disabled', false);
    var span_price_vahed = repeaterForm.find('.span_price_vahed');
    var span = repeaterForm.find('.price');

    // اعمال تغییرات بر روی دیگر المان‌های ورودی


    $.ajax({
      url: `/InstallMent/ProductDetail/${value}`,
      method: "GET",
      success: function (response) {
        otherInput1.val(response['price']);
        var number = parseInt(Number(response['price']), 10);
        otherInput2.val(1);
        var separatedNumber = separateNumber(number);
        span.text(`تومان  ${separatedNumber}`);
        span_price_vahed.text(`  ${separatedNumber}`);
        var price = $this.closest('form').find('.invoice-item-price');
        var qnty = $this.closest('form').find('.invoice-item-qty');

        make_total_price(price, qnty)
      }
    })
    // دسترسی به دیگر المان‌های ورودی داخل فرم

  });

  $(document).on('input', '.invoice-item-qty', function () {

    var $this = $(this),
      value = $this.val()
    var repeaterForm = $this.closest('.repeater-wrapper');
    var price = $this.closest('form').find('.invoice-item-price');
    var qnty = $this.closest('form').find('.invoice-item-qty');

    make_total_price(price, qnty)

    var quantity = repeaterForm.find('.invoice-item-price');
    var span = repeaterForm.find('.price');


    var total_price = Number($(quantity).val()) * Number(value)
    var number = parseInt(Number(total_price), 10);

    var separatedNumber = separateNumber(number);
    span.text(`تومان  ${separatedNumber}`)
    // اعمال تغییرات بر روی دیگر المان‌های ورودی



    // دسترسی به دیگر المان‌های ورودی داخل فرم

  });

  $(document).on('input', '.invoice-item-price', function () {
    var $this = $(this),
      value = $this.val()
    var repeaterForm = $this.closest('.repeater-wrapper');

    var price = $this.closest('form').find('.invoice-item-price');
    var qnty = $this.closest('form').find('.invoice-item-qty');

    make_total_price(price, qnty)

    var quantity = repeaterForm.find('.invoice-item-qty');
    var span_price_vahed = repeaterForm.find('.span_price_vahed');

    var span = repeaterForm.find('.price');


    var total_price = Number($(quantity).val()) * Number(value)
    var number = parseInt(Number(total_price), 10);

    var separatedNumber = separateNumber(number);
    span.text(`تومان  ${separatedNumber}`)
    span_price_vahed.text(`${separatedNumber}`)
    // اعمال تغییرات بر روی دیگر المان‌های ورودی



    // دسترسی به دیگر المان‌های ورودی داخل فرم

  });
});

//


$(document).on('click', '#CreateFactorBtn', function () {
  BtnStyle(true, 'CreateFactorBtn');
  Swal.fire({
    title: 'هشدار!',
    text: ' آیا از ثبت این صورت حساب اطمینان دارید؟؟؟',
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

      var form_element = $(".source-item")
      var items = form_element.find(".repeater-wrapper")
      const products = []
      end_price = 0
      items.each(function () {
        var quantiy = $(this).find(".invoice-item-qty").val();
        var price = $(this).find(".invoice-item-price").val();
        var product_id = $(this).find(".item-details ").val();
        products.push({
          product_id: product_id,
          price: price,
          quantiy: quantiy
        })
        end_price+= Number(price) * Number(quantiy)
      });
     
      
      var factor_date = $("#factor_date").val();
      var order_code = $("#order_code").val();
      var select_costumer = $("#select_costumer").val();
      var peyment_type = $("#peyment_type").val();
      var note = $("#dis").val();
      var csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();
      const main_data = {
        factor_date: factor_date,
        order_code: order_code,
        select_costumer: select_costumer,
        peyment_type: peyment_type,
        products: products,
        dis: note,
        csrfmiddlewaretoken: csrfmiddlewaretoken
      }
      if (peyment_type == 'نقد') {
        BtnStyle(false, 'CreateFactorBtn');
        var modal = $("#CashPeymentModal")
        var number = parseInt(Number(end_price), 10);

        var separatedNumber = separateNumber(number);
        modal.modal('show')
        modal.find('#backDropModalTitle').text(`قیمت کل فاکتور ${separatedNumber}`)

        modal.find("#order_id").val(response['factor_id'])
      }else if (peyment_type == 'اقساط'){
        

        BtnStyle(false, 'CreateFactorBtn');
        var modal = $("#InstallMentPayForm")
        var number = parseInt(Number(end_price), 10);

        var separatedNumber = separateNumber(number);
        modal.modal('show')
        modal.find('#backDropModalTitle').text(`قیمت کل فاکتور ${separatedNumber}`)

        modal.find("#fuck_id").val(response['factor_id'])
      }else if (peyment_type == 'چک'){
      
        BtnStyle(false, 'CreateFactorBtn');
        var modal = $("#CheckPeymentModal")
        var number = parseInt(Number(end_price), 10);

        var separatedNumber = separateNumber(number);
        modal.modal('show')
        modal.find('#backDropModalTitle').text(`قیمت کل فاکتور ${separatedNumber}`)

        modal.find("#factorr_idd").val(response['factor_id'])
      }else if (peyment_type == 'نسیه'){
        $.ajax({
          url: $("#FactorUrl").val(), // آدرس سمت سرور شما
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(main_data),
          success: function (response) {
           
      
              Swal.fire({
                title: 'موفق',
                text: "صورت حساب مورد نظر با موفقیت ثبت شد",
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary'
                },
                confirmButtonText: 'باشه',
                buttonsStyling: false
        
        
              }).then(function (result) {
                location.href = $("#FactorList").attr("href")
              })
            

          },
          error: function (xhr, status, error) {
            // خطا در ارسال درخواست به سرور

            var responseJson = JSON.parse(xhr.responseText);
            BtnStyle(false, 'CreateFactorBtn');
            Swal.fire({
              title: '!!خطا',
              text: responseJson['message'],
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              confirmButtonText: 'باشه',
              buttonsStyling: false


            })
          }
        });
      }
      



    }
    else {
      BtnStyle(false, 'CreateFactorBtn');
    }
  })



})
$(document).on("submit", "#ChashPeymentForm", function (e) {
  BtnStyle(true, 'ChashPeymentBtn');
  e.preventDefault();
  const formdata = $(this).serialize();

  
  var form_element = $(".source-item")
  var items = form_element.find(".repeater-wrapper")
  const products = []
  end_price = 0
  items.each(function () {
    var quantiy = $(this).find(".invoice-item-qty").val();
    var price = $(this).find(".invoice-item-price").val();
    var product_id = $(this).find(".item-details ").val();
    products.push({
      product_id: product_id,
      price: price,
      quantiy: quantiy
    })
    end_price+= Number(price) * Number(quantiy)
  });
 
  
  var factor_date = $("#factor_date").val();
  var order_code = $("#order_code").val();
  var select_costumer = $("#select_costumer").val();
  var peyment_type = $("#peyment_type").val();
  var note = $("#dis").val();
  var csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();

  const main_data = {
    factor_date: factor_date,
    order_code: order_code,
    select_costumer: select_costumer,
    peyment_type: peyment_type,
    products: products,
    dis: note,
    csrfmiddlewaretoken: csrfmiddlewaretoken,
    card_numer_origin:$("input[name='card_numer_origin']").val(),
    card_name_origin:$("input[name='card_name_origin']").val(),
    amount:$("input[name='amount']").val(),
    discount:$("input[name='discount']").val(),
    money_receiver:$("select[name='money_receiver']").val(),
    money_recaiver_ib7:$("select[name='money_recaiver_ib7']").val(),
  }
  
  var url = `/InstallMent/PeymentTypeManageMent/${$("#order_id").val()}`
  $.ajax({
    url: $("#FactorUrl").val(),
    method: "POST",
    data: JSON.stringify(main_data),
    dataType: "json",
    success: function (response) {
      BtnStyle(false, 'ChashPeymentBtn');

      Swal.fire({
        title: 'موفق',
        text: response['message'],
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        confirmButtonText: 'باشه',
        buttonsStyling: false


      }).then(function (result) {
        location.href = $("#FactorList").attr("href")
      })


    },
    error: function (xhr, status, error) {
      BtnStyle(false, 'ChashPeymentBtn');

      var responseJson = JSON.parse(xhr.responseText);

      Swal.fire({
        title: '!!خطا',
        text: responseJson['message'],
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        confirmButtonText: 'باشه',
        buttonsStyling: false


      })
    }
  })
})
$(document).on("submit", "#CheckPeymentForm", function (e) {
  BtnStyle(true, 'CheckPeymentBtn');
  e.preventDefault();
  const formdata = $(this).serialize();
  var form_element = $(".source-item")
  var items = form_element.find(".repeater-wrapper")
  const products = []
  end_price = 0
  items.each(function () {
    var quantiy = $(this).find(".invoice-item-qty").val();
    var price = $(this).find(".invoice-item-price").val();
    var product_id = $(this).find(".item-details ").val();
    products.push({
      product_id: product_id,
      price: price,
      quantiy: quantiy
    })
    end_price+= Number(price) * Number(quantiy)
  });
 
  
  var factor_date = $("#factor_date").val();
  var order_code = $("#order_code").val();
  var select_costumer = $("#select_costumer").val();
  var peyment_type = $("#peyment_type").val();
  var note = $("#dis").val();
  var csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();
  const main_data = {
    factor_date: factor_date,
    order_code: order_code,
    select_costumer: select_costumer,
    peyment_type: peyment_type,
    products: products,
    dis: note,
    csrfmiddlewaretoken: csrfmiddlewaretoken,
    amount:$("input[name='amount_check']").val(),
    owner:$("input[name='owner']").val(),
    check_recaiver:$("input[name='check_recaiver']").val(),
    discount:$("input[name='discount_check']").val(),
    dead_time:$("input[name='dead_time']").val(),
    prepeyment:$("input[name='prepeyment']").val(),
  }
  var url = `/InstallMent/PeymentTypeManageMent/${$("#factorr_idd").val()}`
  $.ajax({
    url: $("#FactorUrl").val(),
    method: "POST",
    data: JSON.stringify(main_data),
    dataType: "json",
    success: function (response) {
      BtnStyle(false, 'ChashPeymentBtn');

      Swal.fire({
        title: 'موفق',
        text: response['message'],
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        confirmButtonText: 'باشه',
        buttonsStyling: false


      }).then(function (result) {
        location.href = $("#FactorList").attr("href")
      })


    },
    error: function (xhr, status, error) {
      BtnStyle(false, 'ChashPeymentBtn');

      var responseJson = JSON.parse(xhr.responseText);

      Swal.fire({
        title: '!!خطا',
        text: responseJson['message'],
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        confirmButtonText: 'باشه',
        buttonsStyling: false


      })
    }
  })
})



$(document).on("submit", "#CreateTimeFactorForm", function (e) {
  e.preventDefault();

  BtnStyle(true,"InstallMentPayBtn")
  const formdata = $(this).serialize();
  var form_element = $(".source-item")
  var items = form_element.find(".repeater-wrapper")
  const products = []
  end_price = 0
  items.each(function () {
    var quantiy = $(this).find(".invoice-item-qty").val();
    var price = $(this).find(".invoice-item-price").val();
    var product_id = $(this).find(".item-details ").val();
    products.push({
      product_id: product_id,
      price: price,
      quantiy: quantiy
    })
    end_price+= Number(price) * Number(quantiy)
  });
 
  
  var factor_date = $("#factor_date").val();
  var order_code = $("#order_code").val();
  var select_costumer = $("#select_costumer").val();
  var peyment_type = $("#peyment_type").val();
  var note = $("#dis").val();
  var csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();
  const main_data = {
    factor_date: factor_date,
    order_code: order_code,
    select_costumer: select_costumer,
    peyment_type: peyment_type,
    products: products,
    dis: note,
    csrfmiddlewaretoken: csrfmiddlewaretoken,
    discount:$("input[name='discount_instalment']").val(),
    number_of_peyments:$("input[name='number_of_peyments']").val(),
    prepayment:$("input[name='prepayment']").val(),
    prepayment_date:$("input[name='prepayment_date']").val(),
  }
  var requesturl = $("#CreateTimeFactorForm").attr("action")

  $.ajax({
    url: $("#FactorUrl").val(),
    method: "POST",
    data: JSON.stringify(main_data),
    success: function (response) {
      Swal.fire({
        title: 'موفق',
        text: response['message'],
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        confirmButtonText: 'باشه',
        buttonsStyling: false

      }).then(function (result) {
        location.href = response['redirect_url']
      })

    },
    error: function (xhr, status, error) {
      Swal.fire({
        title: "هشدار",
        text: "مشکلی پیش آمده لطفا دوباره امتحان کنید",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        confirmButtonText: 'باشه',
        buttonsStyling: false
      });
      BtnStyle(false,"InstallMentPayBtn")

    }
  })
})





$(document).on("input","#amount_price",function(){
  var number = parseInt(Number($(this).val()), 10);

  var separatedNumber = separateNumber(number);
  $("#amount_checkpeyment").text(` تومان ${separatedNumber}`)
})




$(document).on("input",".cash_amount",function(){
  var number = parseInt(Number($(this).val()), 10);

  var separatedNumber = separateNumber(number);
  $("#cash_amount_span").text(` تومان ${separatedNumber}`)
})
$(document).on("input",".discount_am",function(){
  var number = parseInt(Number($(this).val()), 10);

  var separatedNumber = separateNumber(number);
  $("#discount_span").text(` تومان ${separatedNumber}`)
})



$(document).on("input","#discount_check",function(){
  var number = parseInt(Number($(this).val()), 10);
  var separatedNumber = separateNumber(number);
  $("#discount_span_check").text(` تومان ${separatedNumber}`)
  
})


$(document).on("input","#prepeyment_inp",function(){
  var number = parseInt(Number($(this).val()), 10);

  var separatedNumber = separateNumber(number);
  $("#prepeyment_span").text(` تومان ${separatedNumber}`)
})
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

$(document).on("change","#peyment_type",function(){
  var value = $(this).val();

  if (value == "اقساط"){
    $.ajax({
      url:"/InstallMent/create_factor_code?word=E",
      method:"GET",
      success:function(response){
        $("#order_code").val(response['code'])
      },

    })
  }else if (value == "نقد"){
    $.ajax({
      url:"/InstallMent/create_factor_code?word=C",
      method:"GET",
      success:function(response){
        $("#order_code").val(response['code'])
      },

    })
  }else if (value == "چک"){
    $.ajax({
      url:"/InstallMent/create_factor_code?word=K",
      method:"GET",
      success:function(response){
        $("#order_code").val(response['code'])
      },

    })
  }else{
    $.ajax({
      url:"/InstallMent/create_factor_code?word=N",
      method:"GET",
      success:function(response){
        $("#order_code").val(response['code'])
      },

    })

  }
})