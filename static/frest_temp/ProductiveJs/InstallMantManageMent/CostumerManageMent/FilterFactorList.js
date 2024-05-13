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
     var requestgetdataurl = $("#getcostumerdata").val();
     console.log(requestgetdataurl,"@@@")
     var dt_scrollableTable = dt_scrollable_table.DataTable({
       ajax: requestgetdataurl,
       columns: [
         { data: 'id' },
         { data: "code" },
         { data: 'kol_price' },
         { data: 'paid' },
         { data: 'deb' },
  
 
   
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
           
               
               `<a href="/InstallMent/FactorDetail/${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class='bx bx-show-alt'></i></a>`
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
   }, 100);
 });
 
 
 function DeleteCostumer(costumer_id){
   Swal.fire({
     title: 'هشدار!',
     text: ' آیا از حذف این مشتری مطمن هستید؟؟؟',
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
       var requesturl = $("#getcostumerdata").val(); 
       $.ajax({
         url:requesturl + `/${costumer_id}`,
         method :"DELETE",
         success:function (response){
           Swal.fire({
             title: 'موفق',
             text: "مشتری مورد نظر با موفقیت حذف شد",
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