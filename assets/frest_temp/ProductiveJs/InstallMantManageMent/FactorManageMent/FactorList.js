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
     var requestgetdataurl = $("#getfactordata").val();
     var dt_scrollableTable = dt_scrollable_table.DataTable({
       ajax: requestgetdataurl,
       columns: [
         { data: 'fake_id' },
         { data: "order_code" },
         { data: 'persian_date' },
         { data: 'peyment_type' },
         { data: 'costumer_name' },
         { data: 'kol_price' },
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
           
               `<button  onclick = "DeleteFactor(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-message-alt-x bx-tada"></i></button>` +
               
               `<a href="/InstallMent/FactorDetail/${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class='bx bx-show-alt bx-tada' ></i></a>`+
               `<a href="/InstallMent/EditFactor/${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class='bx bx-edit-alt'></i></a>`
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
 

   setTimeout(() => {
     $('.dataTables_filter .form-control').removeClass('form-control-sm');
     $('.dataTables_length .form-select').removeClass('form-select-sm');
   }, 200);
 });
 
 
 function DeleteFactor(factor_id){
   Swal.fire({
     title: 'هشدار!',
     text: ' آیا از حذف این صورت حساب مطمن هستید؟؟؟',
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
       var requesturl = $("#factormanagement").val(); 
       $.ajax({
         url:'/InstallMent/FactorManageMent' + `/${factor_id}`,
         method :"DELETE",
         success:function (response){
           Swal.fire({
             title: 'موفق',
             text: "صورت حساب مورد نظر با موفقیت حذف شد",
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