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
   
//    image
   
   
   
   if (dt_scrollable_table.length) {
     var requestgetdataurl = $("#GetCheckData").val();
     var dt_scrollableTable = dt_scrollable_table.DataTable({
       ajax: requestgetdataurl,
       columns: [
         { data: 'id' },
         { data: 'amount' },
         { data: 'check_owner' },
         { data: 'check_recaiver' },
         { data: 'dead_time' },

 
   
         { data: '' },
         
       ],
       columnDefs: [
    

         {
           // Actions
           targets: 1,
           title: 'تصویر چک',
           searchable: false,
           orderable: false,
           render: function (data, type, full, meta) {
          
             return (
           
                `<a href="${full['image']}" target="_blank">
                <img src = "${full['image']}"  width = "70px" height="70px">
                </a>
                `
               
              
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
           
               `<button  onclick = "DeleteCostumer(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-message-alt-x bx-tada"></i></button>` +
            //    
            // 
               `<button type="button" data-bs-toggle="modal" data-bs-target="#EditCheckPey_${full['id']}" class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class="bx bx-message-edit bx-tada" ></i></button>`
             );
           }
         },

  
       ],
    //    rowCallback: function(row, data) {
    //      console.log(data['status_color'])
    //    // Customize the style of each row here
    //    row.setAttribute('id', `row_${data['user_id']}`);
    //    if (data['is_active'] == true){
 
    //      $(row).css('background-color',"#dbf6a1"); // Set the background color
    //    }else{
    //      $(row).css('background-color',"#fae9b7"); // Set the background color
 
    //    }
    //    },
 
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
$(document).on("submit","#EditCheckPeyForm",function(e){
    e.preventDefault();
    var id_check = $(this).find("#id_check").val()
    console.log(id_check)
    BtnStyle(true,`EditCheckPeyBtn_${id_check}`)
    const formdata = $(`form[name='EditCheck_${id_check}']`)
    var rurl = $(this).attr("action")
    console.log(rurl)
    $.ajax({
        url:rurl,
        method:"PUT",
        data:formdata.serialize(),
        success:function(response){
            Swal.fire({
                title: 'موفق',
                text: ' با موفقیت انجام شد',
                icon: 'success',
                showCancelButton: false,
                customClass: {
                  confirmButton: 'btn btn-primary',
                  
                },
                
                confirmButtonText: 'باشه',
                buttonsStyling: false,
              }).then(function (result) {
                    location.reload()
              })
        }
        

    })
});
