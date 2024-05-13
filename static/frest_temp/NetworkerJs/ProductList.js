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
    var requestgetdataurl = $("#ProductManager").val();
    var dt_scrollableTable = dt_scrollable_table.DataTable({
      ajax: requestgetdataurl,
      columns: [
        { data: 'code' },
        { data: "" },
        { data: "" },



  
        { data: '' },
        
      ],
      columnDefs: [
   
        {
          // Actions
          targets: 1,
      
          searchable: false,
          orderable: false,
        //   render: function (data, type, full, meta) {
         
        //     return (
        //         full['title']
              
        //     );
        //   }
        render: function (data, type, full, meta) {
            var $user_img = full['main_image_url'],
              $name = full['title'],
              $post = full['title'];
            console.log($user_img)
            if ($user_img) {
              // For Avatar image
              var $output =
                '<img src="'  + $user_img + '" alt="ط¢ظˆط§طھط§ط±" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6);
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['title'],
                $initials = $name.split(' ').slice(0, 2).map(word => word[0]).join('â€Œ') || '';
              $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar me-2">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate">' +
              $name +
              '</span>' +
              '<small class="emp_post text-truncate text-muted">' +
              $post +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          },
        },
        {
          // Actions
          targets: 2,
      
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            var number = parseInt(Number(full['price']), 10);
            var separatedNumber = separateNumber(number);
            return (
                `تومان ${separatedNumber}`
              
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
          
              `<button  onclick = "DeleteProduct(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-message-alt-x bx-tada"></i></button>` +
              
              `<a href="/ShopManageMent/EditProduct/${full['id']}"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"><i class="bx bx-message-edit bx-tada" ></i></a>`
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



