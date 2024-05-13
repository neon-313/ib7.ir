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
        var requestgetdataurl = $("#QuestionData").val();
        var dt_scrollableTable = dt_scrollable_table.DataTable({
            ajax: requestgetdataurl,
            columns: [
                { data: 'id' },
                { data: 'title' },



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

                            `<button  type="button"  class="btn btn-sm btn-icon dropdown-toggle hide-arrow"  data-bs-toggle="modal" data-bs-target="#EditQuestion_${full['id']}"><i class="bx bx-message-edit bx-tada" ></i></button>`
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
            var requesturl = $("#CategoryData").val();
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
function EditQuestionGroup(question_id) { 
    var questionObjects = []; // آرایه‌ای برای ذخیره اشیاء سوال و جواب‌ها
    $(`.question_group_edit_${question_id}`).each(function () {
        var question = $(this).find(".question").val(); // گرفتن مقدار سوال
        
        var answer = $(this).find(".answer").val(); // گرفتن مقدار جواب
        
        var questionObject = { question: question, answer: answer }; // ساخت شیء سوال و جواب
        questionObjects.push(questionObject); // اضافه کردن شیء به آرایه
    });
    console.log(questionObjects); 
    var QuestionGroupName =$(`input[name='QuestionGroupNameEdit_${question_id}']`).val();
    var csrfToken = $(`#QuestionForm_${question_id}`).find("input[name='csrfmiddlewaretoken']").val();
    var main_data = {
        "question_group_name": QuestionGroupName,
        "questions":questionObjects,
        "csrfmiddlewaretoken":csrfToken

    }
    $.ajax({
        url: `${$("#QuestionData").val()}/${question_id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(main_data), // تبدیل داده به فرمت JSON
        success: function (response) {
            Swal.fire({
                title: 'موفق',
                text: " با موفقیت ثبت شد",
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
        error: function (xhr, status, error) {
            console.error('خطا در ارسال داده:', error);
        }
    });
 }

$(document).ready(function () {

    $("#CreateQuestionGroupBtn").on("click",function(e){
        e.preventDefault();
        var questionObjects = []; // آرایه‌ای برای ذخیره اشیاء سوال و جواب‌ها
        $(".question_group").each(function () {
            var question = $(this).find(".question").val(); // گرفتن مقدار سوال
            console.log(question,"@@");
            var answer = $(this).find(".answer").val(); // گرفتن مقدار جواب
            console.log(answer,"!1");
            var questionObject = { question: question, answer: answer }; // ساخت شیء سوال و جواب
            questionObjects.push(questionObject); // اضافه کردن شیء به آرایه
        });
        console.log(questionObjects); 
        var QuestionGroupName =$("input[name='QuestionGroupName']").val();
        var csrfToken = $(`#QuestionForm`).find("input[name='csrfmiddlewaretoken']").val();
        var main_data = {
            "question_group_name": QuestionGroupName,
            "questions":questionObjects,
            "csrfmiddlewaretoken":csrfToken

        }
        $.ajax({
            url: $("#QuestionData").val(),
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(main_data), // تبدیل داده به فرمت JSON
            success: function (response) {
                Swal.fire({
                    title: 'موفق',
                    text: " با موفقیت ثبت شد",
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
            error: function (xhr, status, error) {
                console.error('خطا در ارسال داده:', error);
            }
        });
    })

})
 
function EditQuest(quest_id){
    Swal.fire({
        title: 'هشدار!',
        text: ' آیا از بروزرسانی این سوال اطمینان دارید؟؟؟',
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
            var quest = $(`input[name="quest_${quest_id}"]`).val();   
            var answer = $(`input[name="answer_${quest_id}"]`).val();   
            var csrf = $("#csrf").find("input[name='csrfmiddlewaretoken']").val();
            var data ={
                quest:quest,
                answer:answer
            }
            $.ajax({
                url: `${$("#QuestionManager").val()}/${quest_id}`,
                method:"PUT",

                headers: {
                    'X-CSRF-Token': csrf
                },
                contentType: 'application/json',
                data:JSON.stringify(data),
                success:function(response){
                    Swal.fire({
                        title: 'موفق',
                        text: "با موفقیت بروزرسانی شد",
                        icon: 'success',
                        customClass: {  
                            confirmButton: 'btn btn-primary'
                        },
                        confirmButtonText: 'باشه',
                        buttonsStyling: false

                    }).then(function (result) {

                       
                    });
                }

            })
        }
    })

}
function DeleteQuest(quest_id){
    Swal.fire({
        title: 'هشدار!',
        text: ' آیا از حذف این سوال اطمینان دارید؟؟؟',
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
          
            var csrf = $("#csrf").find("input[name='csrfmiddlewaretoken']").val();
         
            $.ajax({
                url: `${$("#QuestionManager").val()}/${quest_id}`,
                method:"DELETE",

                headers: {
                    'X-CSRF-Token': csrf
                },
           
                success:function(response){
                    Swal.fire({
                        title: 'موفق',
                        text: "با موفقیت حذف شد",
                        icon: 'success',
                        customClass: {  
                            confirmButton: 'btn btn-primary'
                        },
                        confirmButtonText: 'باشه',
                        buttonsStyling: false

                    }).then(function (result) {
                        $(`#row_quest_${quest_id}`).remove();
                       
                    });
                }

            })
        }
    })

}

function EditCategory(category_id){
    BtnStyle(true,`EditCatThreeBtn_${category_id}`)
    var requestUrl = $(`#EditCatThreeForm_${category_id}`).attr("action");
    var formData = $(`#EditCatThreeForm_${category_id}`).serialize();
    var csrfToken = $(`#EditCatThreeForm_${category_id}`).find("input[name='csrfmiddlewaretoken']")
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