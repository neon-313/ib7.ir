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
        btn.append("ثبت موجودی")
        var main_btn = document.getElementById(btn_id)
        main_btn.disabled = false;
    }
}
function ClickColor(color_check,color_id){
    if (color_check.checked) {
 
        $(`input[type='checkbox'][id='size_check_${color_id}']`).each(function() {
            // غیرفعال کردن هر چک باکس
            $(this).prop("disabled", false);
        });
         
        $(`input[type='number'][name='size_count_${color_id}']`).each(function() {
            // غیرفعال کردن هر چک باکس
            $(this).prop("disabled", true);
        });
        
    } else {
        $(`input[type='checkbox'][id='size_check_${color_id}']`).each(function() {
            // غیرفعال کردن هر چک باکس
            $(this).prop("disabled", true);
            $(this).prop("checked", false);

        });
        $(`input[type='number'][name='size_count_${color_id}']`).each(function() {
            // غیرفعال کردن هر چک باکس
            $(this).prop("disabled", true);
        });
    }
}
function CheckSize(check_size,color_id,size_id){
    if (check_size.checked){
        $(`#size_count_${color_id}_${size_id}`).prop("disabled",false)
    }else{
        $(`#size_count_${color_id}_${size_id}`).prop("disabled",true)

    }
}




// $(document).ready(function(){
//     $("#CreateInventory").on("click",function(){
//         BtnStyle(true,"CreateInventory")
//         var check = true;
//         const color_ids = []
//         var send_data_2 =true 
//         $("input[type='checkbox'][name='colors']").each(function() {
//             if ($(this).prop("checked")){
//                 check= false
//                 send_data_2=false
//                 color_ids.push($(this).val())
//             }
   
        
            

//         });
//         if (check){
//             BtnStyle(false,"CreateInventory")
//             Swal.fire({
//                 title: 'خطا!!',
//                 text: "انتخاب حداقل یک رنگ الزامی میباشد",
//                 icon: 'error',
//                 customClass: {  
//                     confirmButton: 'btn btn-primary'
//                 },
//                 confirmButtonText: 'باشه',
//                 buttonsStyling: false

//             })
//         }
//         var send_data= true
//         $.each(color_ids, function(index, value) {
//             var val = color_ids[index]
            
//             var check_size = true
//             $(`input[type='checkbox'][id='size_check_${val}']`).each(function() {
//                 if ($(this).prop("checked")){

//                     check_size=false
//                 }
         
//             });
//             if (check_size){
//                 var url = `/ShopManageMent/error_text?color_id=${val}`
//                 BtnStyle(false,"CreateInventory")
//                 send_data=false
//                 $.ajax({
//                     mehtod:"GET",
//                     url:url,
//                     success:function(response){
//                         Swal.fire({
//                             title: 'خطا!!',
//                             text: response['message'],
//                             icon: 'error',
//                             customClass: {  
//                                 confirmButton: 'btn btn-primary'
//                             },
//                             confirmButtonText: 'باشه',
//                             buttonsStyling: false
            
//                         })
//                     }
                    
//                 })

//             }

//         });
//         if (send_data == true && send_data_2 == true){
//             var div_csrf = $("#csrf_div")
//             var csrf = div_csrf.find('input[name="csrfmiddlewaretoken"]').val()
    
//             const data = {
//                 'colors':[],
//                 "csrfmiddlewaretoken":csrf
//             }
                
            
//             $.each(color_ids, function(index, value) {
//                 var color_id= color_ids[index]
//                 data['colors'].push(color_id)
//                 const size_list =[]
//                 $(`input[type='checkbox'][id='size_check_${color_id}']`).each(function() {
//                     if ($(this).prop("checked")){
//                         var size_id = $(this).val();
    
//                         var count = $(`#size_count_${color_id}_${size_id}`).val()
//                         size_list.push(size_id)
//                         data[`count_${color_id}_${size_id}`]= count
    
//                     }
    
//                 })
//                 data[`size_l_${color_id}`]= size_list
                
            
                
    
//             });
            
//             var requestUrl = $("#InventoryManagerUrl_id").val()
//             $.ajax({
//                 url:requestUrl,
//                 method:"POST",
//                 data:JSON.stringify(data),
//                 success:function(response){
//                     BtnStyle(false,"CreateInventory")
    
//                     Swal.fire({
//                         title: 'موفق',
//                         text: "موجودی با موفقیت به محصول مورد نظر اضافه شد",
//                         icon: 'success',
//                         customClass: {  
//                             confirmButton: 'btn btn-primary'
//                         },
//                         confirmButtonText: 'باشه',
//                         buttonsStyling: false
        
//                     }).then(function (result) {
        
//                         location.href = "/ShopManageMent/InventoryList";
//                     });
//                 }
               
    
//             })
//         }

//     })
// })


$(document).ready(function() {
    $("#CreateInventory").on("click", function() {
        BtnStyle(true, "CreateInventory");
        var check = true;
        const color_ids = [];
        var send_data_2 = true;

        $("input[type='checkbox'][name='colors']").each(function() {
            if ($(this).prop("checked")) {
                check = false;
                
                color_ids.push($(this).val());
            }
        });

        if (check) {
            send_data_2 = false;
            BtnStyle(false, "CreateInventory");
            Swal.fire({
                title: 'خطا!!',
                text: "انتخاب حداقل یک رنگ الزامی میباشد",
                icon: 'error',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                confirmButtonText: 'باشه',
                buttonsStyling: false
            });
        }

        var send_data = true;

        $.each(color_ids, function(index, value) {
            var val = color_ids[index];

            var check_size = true;

            $(`input[type='checkbox'][id='size_check_${val}']`).each(function() {
                if ($(this).prop("checked")) {
                    check_size = false;
                }
            });

            if (check_size) {
                var url = `/ShopManageMent/error_text?color_id=${val}`;
                BtnStyle(false, "CreateInventory");
                send_data = false;
                $.ajax({
                    method: "GET", // Fixed the typo in the 'method' property
                    url: url,
                    success: function(response) {
                        Swal.fire({
                            title: 'خطا!!',
                            text: response['message'],
                            icon: 'error',
                            customClass: {
                                confirmButton: 'btn btn-primary'
                            },
                            confirmButtonText: 'باشه',
                            buttonsStyling: false
                        });
                    }
                });
            }
        });
        console.log(send_data)
        console.log(send_data_2)
        if (send_data && send_data_2) { // Simplified the condition
            var div_csrf = $("#csrf_div");
            var csrf = div_csrf.find('input[name="csrfmiddlewaretoken"]').val();

            const data = {
                'colors': [],
                "csrfmiddlewaretoken": csrf
            };

            $.each(color_ids, function(index, value) {
                var color_id = color_ids[index];
                data['colors'].push(color_id);
                const size_list = [];

                $(`input[type='checkbox'][id='size_check_${color_id}']`).each(function() {
                    if ($(this).prop("checked")) {
                        var size_id = $(this).val();
                        var count = $(`#size_count_${color_id}_${size_id}`).val();
                        size_list.push(size_id);
                        data[`count_${color_id}_${size_id}`] = count;
                    }
                });

                data[`size_l_${color_id}`] = size_list;
            });

            var requestUrl = $("#InventoryManagerUrl_id").val();
            $.ajax({
                url: requestUrl,
                method: "POST",
                contentType: 'application/json', // Added content type
                data: JSON.stringify(data),
                success: function(response) {
                    BtnStyle(false, "CreateInventory");

                    Swal.fire({
                        title: 'موفق',
                        text: "موجودی با موفقیت به محصول مورد نظر اضافه شد",
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        confirmButtonText: 'باشه',
                        buttonsStyling: false
                    }).then(function(result) {
                        location.href = "/ShopManageMent/InventoryList";
                    });
                }
            });
        }
    });
});
