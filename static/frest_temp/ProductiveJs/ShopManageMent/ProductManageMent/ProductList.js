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
    var dt_scrollableTable = dt_scrollable_table.DataTable({
      ajax: requestgetdataurl,
      columns: [
        { data: 'id' },
        { data: "firstname" },
        { data: 'lastname' },
        { data: 'phonenumber' },
        { data: 'conteract_type' },
        { data: 'conteract_date' },
        { data: 'get_state' },
        { data: 'factors_count' },
        { data: 'factor_paid' },
        { data: 'factor_debt' },
        { data: 'get_city' },
        { data: '' },
        { data: '' },
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
          
              `<button  onclick = "DeleteCostumer(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-message-alt-x bx-tada"></i></button>` +
              
              `<a href="/InstallMent/EditCostumer/${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class="bx bx-message-edit bx-tada" ></i></a>`
            );
          }
        },
        {
          // Actions
          targets: -2,
          title: 'مدارک',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
         
            return (
          
           
              
              `<a href="/InstallMent/DocumentImages/${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class='bx bx-show-alt'></i></a>`
            );
          }
        },
        {
          // Actions
          targets: -3,
          title: 'صورت حساب ها',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
         
            return (
          
           
              
              `<a href="/InstallMent/FilterFactorCostumer/${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class='bx bx-show-alt'></i></a>`
            );
          }
        },
        {
          // Actions
          targets: -4,
          title: 'وضعیت',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            if (full['is_active']){

              return (
            
             
                
                `                        
                 <label class="switch switch-square">
                <input type="checkbox" class="switch-input" checked onchange="ChangeUserStatus(this,${full['user_id']})">
                <span class="switch-toggle-slider">
                  <span class="switch-on"><i class="bx bx-check"></i></span>
                  <span class="switch-off"><i class="bx bx-x"></i></span>
                </span>
              
              </label>`
              );
            }else{
              return (
            
             
                
                `                        
                 <label class="switch switch-square">
                <input type="checkbox" class="switch-input"  onchange="ChangeUserStatus(this,${full['user_id']})">
                <span class="switch-toggle-slider">
                  <span class="switch-on"><i class="bx bx-check"></i></span>
                  <span class="switch-off"><i class="bx bx-x"></i></span>
                </span>
              
              </label>`
              );

            }
          }
        },
 
      ],
      rowCallback: function(row, data) {
        console.log(data['status_color'])
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