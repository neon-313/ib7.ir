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
    var requestgetdataurl = $("#getuserdata").val();
    console.log(requestgetdataurl)
    var dt_scrollableTable = dt_scrollable_table.DataTable({
      ajax: requestgetdataurl,
      columns: [
        { data: 'id' },
        { data: "first_name" },
        { data: "last_name" },
        { data: "phone" },
        { data: "jtime" },
        { data: '' },
        { data: "get_state" },
        { data: "get_city" },
        { data: "username" },
       
        


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
          
              `<button  onclick = "DeleteUser(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-message-alt-x bx-tada"></i></button>` +
              
              `<button type="button" data-bs-toggle="modal" data-bs-target="#EditUser_${full['id']}" class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class="bx bx-message-edit bx-tada" ></i></button>`
            );
          }
        },

        {
          // Actions
          targets: -5,
          title: 'رمز عبور',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
         
            return (
          
             
              
              `<button type="button" data-bs-toggle="modal" data-bs-target="#ChangePassword_${full['id']}" class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class='bx bxs-key bx-tada' ></i></button>`
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

function DeleteUser(user_id){
    Swal.fire({
      title: 'هشدار!',
      text: ' آیا از حذف این کاربر مطمن هستید؟؟؟',
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
        var requesturl = $("#getuserdata").val(); 
        $.ajax({
          url:requesturl + `/${user_id}`,
          method :"DELETE",
          success:function (response){
            Swal.fire({
              title: 'موفق',
              text: "کاربر مورد نظر با موفقیت حذف شد",
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


  function EditClothStatus(cstatus_id) {
    BtnStyle(true,`EditClothStatusBtn_${cstatus_id}`)
    var requesturl = $(`#EditClothStatusForm_${cstatus_id}`).attr("action")

    const form  = $(`#EditClothStatusForm_${cstatus_id}`)
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
        BtnStyle(false,`EditClothStatusBtn_${cstatus_id}`)
      }
    });

 


    
    
    };
$(document).ready(function(){
  $('#CreateUserForm').submit(function(event) {
    event.preventDefault();
    BtnStyle(true,"CreateUserBtn")
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
          text: responseJson['message'],
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          confirmButtonText: 'باشه',
          buttonsStyling: false
        });
        BtnStyle(false,"CreateUserBtn")
      }

  })
  });

  $("#states").on("change",function(){
    var state_code = $(this).val();
    var requesturl = $("#StateDetail").val();
    console.log("Fuck Yes")
    if (state_code ==  "fuck"){
      var city_select = $("#cities")
      city_select.empty();
      $(city_select).append(`<option value ="fuck" >"لطفا یک استان را انتخاب کنید"</option>`);
    }else{
      $.ajax({
        url:requesturl,
        method:"GET",
        data:{"state_code":state_code},
        success:function(response){
          var city_select = $("#cities")
          city_select.empty();
          for (var city in response){
            var name = response[city]['name']
            var code = response[city]['code']
          
            
            $(city_select).append(`<option value =${code} >${name}</option>`);
          }
        }
      })  
    };

  });
})

function state_edit(user_id){
    var state_code = $(`#states_${user_id}`).val()
    var requesturl = $("#StateDetail").val();
    if (state_code ==  "fuck"){
        var city_select = $(`#cities_${user_id}`)
        city_select.empty();
        $(city_select).append(`<option value ="fuck" >"لطفا یک استان را انتخاب کنید"</option>`);
    }else{
        $.ajax({
          url:requesturl,
          method:"GET",
          data:{"state_code":state_code},
          success:function(response){
            var city_select = $(`#cities_${user_id}`)
            city_select.empty();
            for (var city in response){
              var name = response[city]['name']
              var code = response[city]['code']
            
              
              $(city_select).append(`<option value =${code} >${name}</option>`);
            }
          }
        })  
      };
}

function EditUser(user_id){
   
    BtnStyle(true,`EditUserBtn_${user_id}`)
    const formData = $(`#EditUserForm_${user_id}`)
    var requesturl =$(`#EditUserForm_${user_id}`).attr("action")
    $.ajax({
      url:requesturl,
      method:"PUT",
      data:formData.serialize(),
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
        BtnStyle(false,`EditUserBtn_${user_id}`)
      }

  })
}



function ChangePermission (perm_name,user_id,type,checkbox){
  
  if (checkbox.checked) {
    // Checkbox is checked
    var a = true
    console.log("Checkbox is checked");
    $.ajax({
      url:`/UserManageMent/ChangePermission/${user_id}?perm_name=${perm_name}&checked=${true}&type=${type}`,
      method:"GET"
    })
    // You can perform additional actions here
  } else {
    // Checkbox is not checked
    $.ajax({
      url:`/UserManageMent/ChangePermission/${user_id}?perm_name=${perm_name}&checked=${false}&type=${type}`,
      method:"GET"
    })
    console.log("Checkbox is not checked");
    // You can perform additional actions here
}
}