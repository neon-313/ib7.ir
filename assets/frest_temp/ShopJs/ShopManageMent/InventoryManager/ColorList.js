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
        var requestgetdataurl = $("#ColorManagerUrl").val();
        var dt_scrollableTable = dt_scrollable_table.DataTable({
            ajax: requestgetdataurl,
            columns: [
                { data: 'id' },
                { data: 'color_name' },
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

                            `<button  onclick = "DeleteCategory(${full['id']})" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-message-alt-x bx-tada"></i></button>` +

                            `<button  type="button"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"  data-bs-toggle="modal" data-bs-target="#EditColorModal_${full['id']}"><i class="bx bx-message-edit bx-tada" ></i></button>`
                        );
                    }
                },
                {
                    // Actions
                    targets: -2,
                    title: 'رنگ',
                    searchable: false,
                    orderable: false,
                    render: function (data, type, full, meta) {

                        return (

                            // `<i class='bx bxs-color-fill' style='color:${full['color_code']}'  ></i>` 
                            `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: ${full['color_code']};transform: ;msFilter:;"><path d="M20 14c-.092.064-2 2.083-2 3.5 0 1.494.949 2.448 2 2.5.906.044 2-.891 2-2.5 0-1.5-1.908-3.436-2-3.5zM9.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586l7-7-.707-.707L11 4.586 8.707 2.293 7.293 3.707 9.586 6 4 11.586c-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414L9.586 20zM11 7.414 16.586 13H5.414L11 7.414z"></path></svg>`
                           
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


function DeleteCategory(cat_id) {
    Swal.fire({
        title: 'هشدار!',
        text: ' آیا از حذف این دسته بندی اطمینان دارید؟؟؟',
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
            var requesturl = $("#ColorManagerUrl").val();
            $.ajax({
                url: requesturl + `/${cat_id}`,
                method: "DELETE",
                success: function (response) {
                    Swal.fire({
                        title: 'موفق',
                        text: "دسته بندی مورد نظر با موفقیت حذف شد",
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
        btn.append("ثبت")
        var main_btn = document.getElementById(btn_id)
        main_btn.disabled = false;
    }
}


$(document).ready(function () {
    $("#CreateColorForm").on("submit", function (e) {
        BtnStyle(true,"CreateColorBtn")
        e.preventDefault();
        var formData = $(this).serialize();
        
        var requestUrl = $(this).attr("action");
        $.post(requestUrl, formData, function (response) {
            Swal.fire({
                title: 'موفق',
                text: "دسته بندی جدید با موفقیت ثبت شد",
                icon: 'success',
                customClass: {  
                    confirmButton: 'btn btn-primary'
                },
                confirmButtonText: 'باشه',
                buttonsStyling: false

            }).then(function (result) {

                location.reload();
            });
        }).fail(function (error) {
            // Handle errors during the AJAX request
            BtnStyle(false,"CreateColorBtn")

        });
    })
 

})


function EditColor(category_id){
    BtnStyle(true,`EditColorBtn_${category_id}`)
    var requestUrl = $(`#EditColor_${category_id}`).attr("action");
    var formData = $(`#EditColor_${category_id}`).serialize();
    var csrfToken = $(`#EditColor_${category_id}`).find("input[name='csrfmiddlewaretoken']")
    $.ajax({
        url: requestUrl,
        method:"PUT",
        headers: {
            'X-CSRF-Token': csrfToken
        },
        data:formData,
        success:function(response){
            Swal.fire({
                title: 'موفق',
                text: "دسته بندی جدید با موفقیت آپدیت شد",
                icon: 'success',
                customClass: {  
                    confirmButton: 'btn btn-primary'
                },
                confirmButtonText: 'باشه',
                buttonsStyling: false

            }).then(function (result) {

                location.reload();
            });
        }

    })
};