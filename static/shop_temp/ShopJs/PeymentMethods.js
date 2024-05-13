
$(document).ready(function(){
    $(".select-2").each(function(){
        $(this).select2()
    });
    $("#createAddresForm").on("submit", function(e){
        e.preventDefault();
        var networker_id = $("#networker_id").val();
        var req_url = `${$(this).attr("action")}?networker_id=${networker_id}`;
        $.ajax({
            url:req_url,
            method:"POST",
            dataType:"json",
            data:$(this).serialize(),
            success: function(response) {
                console.log("fuck")
                Swal.fire({
                  title: 'موفق',
                  text: "آدرس جدید با موفقیت ثبت شد",
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
                
                Swal.fire({
                    title: 'موفق',
                    text: "آدرس جدید با موفقیت ثبت شد",
                    icon: 'success',
                    customClass: {
                      confirmButton: 'btn-primary w-40 py-3'
                    },
                    confirmButtonText: 'باشه',
                    buttonsStyling: false
            
                  }).then(function (result) {
          
                    location.reload();
                  });
            }
        })
    });
    // $("#editAddresForm").on("submit", function(e){
    //     e.preventDefault();
    //     var networker_id = $("#networker_id").val();
    //     var req_url = `${$(this).attr("action")}?networker_id=${networker_id}`;
    //     $.ajax({
    //         url:req_url,
    //         method:"PUT",
    //         dataType:"json",
    //         data:$(this).serialize(),
    //         success: function(response) {
               
    //             Swal.fire({
    //               title: 'موفق',
    //               text: "آدرس جدید با موفقیت ثبت شد",
    //               icon: 'success',
    //               customClass: {
    //                 confirmButton: 'btn btn-primary'
    //               },
    //               confirmButtonText: 'باشه',
    //               buttonsStyling: false
          
    //             }).then(function (result) {
        
    //               location.reload();
    //             });
    //         },
    //         error: function(xhr, status, error) {
                
    //             Swal.fire({
    //                 title: 'موفق',
    //                 text: "آدرس جدید با موفقیت ثبت شد",
    //                 icon: 'success',
    //                 customClass: {
    //                   confirmButton: 'btn-primary w-40 py-3'
    //                 },
    //                 confirmButtonText: 'باشه',
    //                 buttonsStyling: false
            
    //               }).then(function (result) {
          
    //                 location.reload();
    //               });
    //         }
    //     })
    // });
    $("#state").on("change",function(){
        var state_code = $(this).val();
        var requesturl = $("#StateDetail").val();
      
        if (state_code ==  "0"){
          var city_select = $("#city")
          city_select.empty();
          $(city_select).append(`<option value ="0" >"لطفا یک استان را انتخاب کنید"</option>`);
        }else{
          $.ajax({
            url:requesturl,
            method:"GET",
            data:{"state_code":state_code},
            success:function(response){
              var city_select = $("#city")
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

function editAddres(addres_id) { 

    var networker_id = $("#networker_id").val();
    var req_url = `${$(`#editAddresForm_${addres_id}`).attr("action")}?networker_id=${networker_id}`;
    $.ajax({
        url:req_url,
        method:"PUT",
        dataType:"json",
        data:$(`#editAddresForm_${addres_id}`).serialize(),
        success: function(response) {
           
            Swal.fire({
              title: 'موفق',
              text: "آدرس جدید با موفقیت آپدیت شد",
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
            
            Swal.fire({
                title: 'موفق',
                text: "آدرس جدید با موفقیت آپدیت شد",
                icon: 'success',
                customClass: {
                  confirmButton: 'btn-primary w-40 py-3'
                },
                confirmButtonText: 'باشه',
                buttonsStyling: false
        
              }).then(function (result) {
      
                location.reload();
              });
        }
    })
 };

 function deleteAddres(addres_id){


        var requesturl = $("#stateManagerUrl").val(); 
        $.ajax({
          url:requesturl + `/${addres_id}`,
          method :"DELETE",
          success:function (response){
            Swal.fire({
              title: 'موفق',
              text: "آدرس مورد نظر با موفقیت حذف شد",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary w-40 py-3'
              },
              confirmButtonText: 'باشه',
              buttonsStyling: false
      
            }).then(function (result) {
              location.reload();
            })
  
          },
          error: function(xhr, status, error) {
            Swal.fire({
                title: 'موفق',
                text: "آدرس مورد نظر با موفقیت حذف شد",
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary w-40 py-3'
                },
                confirmButtonText: 'باشه',
                buttonsStyling: false
        
              }).then(function (result) {
                location.reload();
              })
          },
        })
 }
