/**
 * DataTables Extensions (jquery)
 */

 'use strict';

 $(function () {
 
   var dt_scrollable_table = $('.dt-scrollableTable');
     // dt_fixedheader_table = $('.dt-fixedheader'),
     // dt_fixedcolumns_table = $('.dt-fixedcolumns'),
     // dt_select_table = $('.dt-select-table');
 
   // Scrollable
   // --------------------------------------------------------------------
 
   if (dt_scrollable_table.length) {
     var requestgetdataurl = $("#request_cloth_list_url").val();
     var dt_scrollableTable = dt_scrollable_table.DataTable({
       ajax: requestgetdataurl,
       columns: [
         { data: 'fake_id' },
         { data: "firstname" },
         { data: 'lastname' },
         { data: 'marsole_code' },
         { data: 'persian_date' },
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
           
               `<button  onclick = "DeletePostSms(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-message-alt-x bx-tada"></i></button>` +
               
               `<button type="button" data-bs-toggle="modal" data-bs-target="#basicModal_${full['id']}" class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class="bx bx-message-edit bx-tada" ></i></button>`
             );
           }
         },
         {
           // Actions
           targets: -2,
           title: 'ارسال پیام',
           searchable: false,
           orderable: false,
           render: function (data, type, full, meta) {
          
             return (
           
               `<button  onclick = "SendPostSms(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class='bx bx-message-rounded-dots bx-tada' ></i></button>` 
               
             );
           }
         },
 
       ],
       // Scroll options
       scrollY: '300px',
       scrollX: true,
       dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>'
     });
   }
 
 //   // FixedHeader
 //   // --------------------------------------------------------------------
 
 //   if (dt_fixedheader_table.length) {
 //     var dt_fixedheader = dt_fixedheader_table.DataTable({
 //       ajax: '/static/frest_temp/json/table-datatable.json',
 //       columns: [
 //         { data: '' },
 //         { data: 'id' },
 //         { data: 'id' },
 //         { data: 'full_name' },
 //         { data: 'email' },
 //         { data: 'start_date' },
 //         { data: 'salary' },
 //         { data: 'status' },
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
 //           render: function () {
 //             return '<input type="checkbox" class="dt-checkboxes form-check-input mt-0 align-middle">';
 //           },
 //           checkboxes: {
 //             selectAllRender: '<input type="checkbox" class="form-check-input mt-0 align-middle">'
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
 //             var $user_img = full['avatar'],
 //               $name = full['full_name'],
 //               $post = full['post'];
 //             if ($user_img) {
 //               // For Avatar image
 //               var $output =
 //                 '<img src="' + assetsPath + 'img/avatars/' + $user_img + '" alt="Avatar" class="rounded-circle">';
 //             } else {
 //               // For Avatar badge
 //               var stateNum = Math.floor(Math.random() * 6);
 //               var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
 //               var $state = states[stateNum],
 //                 $name = full['full_name'],
 //                 $initials = $name.split(' ').map(word => word[0]).join('‌') || '';
 //               $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
 //             }
 //             // Creates full output for row
 //             var $row_output =
 //               '<div class="d-flex justify-content-start align-items-center">' +
 //               '<div class="avatar-wrapper">' +
 //               '<div class="avatar me-2">' +
 //               $output +
 //               '</div>' +
 //               '</div>' +
 //               '<div class="d-flex flex-column">' +
 //               '<span class="emp_name text-truncate">' +
 //               $name +
 //               '</span>' +
 //               '<small class="emp_post text-truncate text-muted">' +
 //               $post +
 //               '</small>' +
 //               '</div>' +
 //               '</div>';
 //             return $row_output;
 //           },
 //           responsivePriority: 5
 //         },
 //         {
 //           responsivePriority: 1,
 //           targets: 4
 //         },
 //         {
 //           responsivePriority: 2,
 //           targets: 6
 //         },
 
 //         {
 //           // Label
 //           targets: -2,
 //           render: function (data, type, full, meta) {
 //             // var $rand_num = Math.floor(Math.random() * 5) + 1;
 //             var $status_number = full['status'];
 //             var $status = {
 //               1: { title: 'کنونی', class: 'bg-label-primary' },
 //               2: { title: 'حرفه‌ای', class: ' bg-label-success' },
 //               3: { title: 'رد شده', class: ' bg-label-danger' },
 //               4: { title: 'استعفا داده', class: ' bg-label-warning' },
 //               5: { title: 'درخواست داده', class: ' bg-label-info' }
 //             };
 //             if (typeof $status[$status_number] === 'undefined') {
 //               return data;
 //             }
 //             return (
 //               '<span class="badge rounded-pill ' +
 //               $status[$status_number].class +
 //               '">' +
 //               $status[$status_number].title +
 //               '</span>'
 //             );
 //           }
 //         },
 //         {
 //           // Actions
 //           targets: -1,
 //           title: 'عمل‌ها',
 //           orderable: false,
 //           render: function (data, type, full, meta) {
 //             return (
 //               '<div class="d-inline-block">' +
 //               '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
 //               '<div class="dropdown-menu dropdown-menu-end m-0">' +
 //               '<a href="javascript:;" class="dropdown-item">جزئیات</a>' +
 //               '<a href="javascript:;" class="dropdown-item">بایگانی</a>' +
 //               '<div class="dropdown-divider"></div>' +
 //               '<a href="javascript:;" class="dropdown-item text-danger delete-record">حذف</a>' +
 //               '</div>' +
 //               '</div>' +
 //               '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="bx bxs-edit"></i></a>'
 //             );
 //           }
 //         }
 //       ],
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
 
 //   // FixedColumns
 //   // --------------------------------------------------------------------
 
 //   if (dt_fixedcolumns_table.length) {
 //     var dt_fixedcolumns = dt_fixedcolumns_table.DataTable({
 //       ajax: '/static/frest_temp/json/table-datatable.json',
 //       columns: [
 //         { data: 'full_name' },
 //         { data: 'post' },
 //         { data: 'email' },
 //         { data: 'city' },
 //         { data: 'start_date' },
 //         { data: 'salary' },
 //         { data: 'age' },
 //         { data: 'experience' },
 //         { data: 'status' },
 //         { data: '' }
 //       ],
 //       columnDefs: [
 //         {
 //           // Label
 //           targets: -2,
 //           render: function (data, type, full, meta) {
 //             var $status_number = full['status'];
 //             var $status = {
 //               1: { title: 'کنونی', class: 'bg-label-primary' },
 //               2: { title: 'حرفه‌ای', class: ' bg-label-success' },
 //               3: { title: 'رد شده', class: ' bg-label-danger' },
 //               4: { title: 'استعفا داده', class: ' bg-label-warning' },
 //               5: { title: 'درخواست داده', class: ' bg-label-info' }
 //             };
 //             if (typeof $status[$status_number] === 'undefined') {
 //               return data;
 //             }
 //             return (
 //               '<span class="badge rounded-pill ' +
 //               $status[$status_number].class +
 //               '">' +
 //               $status[$status_number].title +
 //               '</span>'
 //             );
 //           }
 //         },
 //         {
 //           // Actions
 //           targets: -1,
 //           title: 'عمل‌ها',
 //           searchable: false,
 //           orderable: false,
 //           render: function (data, type, full, meta) {
 //             return (
 //               '<div class="d-inline-block">' +
 //               '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
 //               '<div class="dropdown-menu dropdown-menu-end m-0">' +
 //               '<a href="javascript:;" class="dropdown-item">جزئیات</a>' +
 //               '<a href="javascript:;" class="dropdown-item">بایگانی</a>' +
 //               '<div class="dropdown-divider"></div>' +
 //               '<a href="javascript:;" class="dropdown-item text-danger delete-record"></i>حذف</a>' +
 //               '</div>' +
 //               '</div>' +
 //               '<a href="javascript:;" class="item-edit text-body"><i class="bx bxs-edit"></i></a>'
 //             );
 //           }
 //         }
 //       ],
 //       dom: '<"d-flex justify-content-between align-items-center row"<"col-sm-12 col-md-2 d-flex"f><"col-sm-12 col-md-10 d-none"i>>t',
 //       scrollY: '300px',
 //       scrollX: true,
 //       scrollCollapse: true,
 //       paging: false,
 //       info: false,
 //       // Fixed column option
 //       fixedColumns: true
 //     });
 //   }
 
 //   // Select
 //   // --------------------------------------------------------------------
 
 //   if (dt_select_table.length) {
 //     var dt_select = dt_select_table.DataTable({
 //       ajax:  '/static/frest_temp/json/table-datatable.json',
 //       columns: [
 //         { data: 'id' },
 //         { data: 'full_name' },
 //         { data: 'post' },
 //         { data: 'email' },
 //         { data: 'city' },
 //         { data: 'start_date' },
 //         { data: 'salary' },
 //         { data: 'status' }
 //       ],
 //       columnDefs: [
 //         {
 //           // For Checkboxes
 //           targets: 0,
 //           searchable: false,
 //           orderable: false,
 //           render: function () {
 //             return '<input type="checkbox" class="dt-checkboxes form-check-input mt-0 align-middle">';
 //           },
 //           checkboxes: {
 //             selectRow: true,
 //             selectAllRender: '<input type="checkbox" class="form-check-input mt-0 align-middle">'
 //           }
 //         },
 //         {
 //           // Label
 //           targets: -1,
 //           render: function (data, type, full, meta) {
 //             var $status_number = full['status'];
 //             var $status = {
 //               1: { title: 'کنونی', class: 'bg-label-primary' },
 //               2: { title: 'حرفه‌ای', class: ' bg-label-success' },
 //               3: { title: 'رد شده', class: ' bg-label-danger' },
 //               4: { title: 'استعفا داده', class: ' bg-label-warning' },
 //               5: { title: 'درخواست داده', class: ' bg-label-info' }
 //             };
 //             if (typeof $status[$status_number] === 'undefined') {
 //               return data;
 //             }
 //             return (
 //               '<span class="badge rounded-pill ' +
 //               $status[$status_number].class +
 //               '">' +
 //               $status[$status_number].title +
 //               '</span>'
 //             );
 //           }
 //         }
 //       ],
 //       order: [[1, 'desc']],
 //       dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
 //       select: {
 //         // Select style
 //         style: 'multi'
 //       }
 //     });
 //   }
 
   // Filter form control to default size
   // ? setTimeout used for multilingual table initialization
   setTimeout(() => {
     $('.dataTables_filter .form-control').removeClass('form-control-sm');
     $('.dataTables_length .form-select').removeClass('form-select-sm');
   }, 200);
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
     console.log("fuck")
     var btn = $(`#${btn_id}`);
     btn.empty();
     btn.append("ذخیره تغییرات")
     var main_btn = document.getElementById(btn_id)
     main_btn.disabled= false;
   }
 }
 
 $(document).ready(function(){
   $('#CreatePostSmsForm').submit(function(event) {
     event.preventDefault();
     BtnStyle(true,"CreatePostSmsBtn")
     var formData = $(this).serialize();
     var requesturl = $(this).attr("action")
     $.ajax({
       url:requesturl,
       method:"POST",
       data:formData,
       success:function(response){
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
 
               location.reload();
             });
             
       },
       error: function(xhr, status, error) {
 
         var responseJson = JSON.parse(xhr.responseText);
 
         Swal.fire({
           title:"هشدار",
           text: "مشکلی پیش آمده لطفا چند دقیقه دیگر امتحان کنید",
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
 })
 
 function EditPostSms(post_id) {
   BtnStyle(true,`EditPostSmsBtn_${post_id}`)
   var requesturl = $(`#EditPostSmsForm_${post_id}`).attr("action")
 
   const form  = $(`#EditPostSmsForm_${post_id}`)
   console.log(form.serialize())
   $.ajax({
     url:requesturl,
     method:"PUT",
     data:form.serialize(),
     dataType: 'json', // Change the data type according to your server's response type
     success:function(response){
       
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
       BtnStyle(false,`EditPostSmsBtn_${post_id}`)
     }
   });
 
 
 
 
 
   };
 
 
   function DeletePostSms(post_id){
     Swal.fire({
       title: 'هشدار!',
       text: ' آیا از حذف این سفارش مطمن هستید؟؟؟',
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
         var requesturl = $("#request_cloth_list_url").val(); 
         $.ajax({
           url:requesturl + `/${post_id}`,
           method :"DELETE",
           success:function (response){
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
               location.reload();
             })
   
           },
         })
       }
     })
   }
   function SendPostSms(post_id){
     Swal.fire({
       title: 'هشدار!',
       text: ' آیا از ارسال پیامک اطمینان دارید؟؟؟',
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
         var requesturl = '/InstallMent/SendSms'
         $.ajax({
           url:requesturl + `/${post_id}`,
           method :"GET",
           success:function (response){
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
               
             })
   
           },
         })
       }
     })
   }