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
  
$(document).ready(function() {
    $('#persianInput').on('keyup', function() {
        var inputValue = $(this).val();
        var persianPattern = /^[\u0600-\u06FF\s]+$/; // منظم‌سازی برای حروف فارسی و فاصله
        
        if (!persianPattern.test(inputValue)) {
          Swal.fire({
            title: 'هشدار!',
            text: 'لطفا از کلمات فارسی استفاده کنید',
            icon: 'warning',

            customClass: {
              confirmButton: 'btn btn-primary',
       
            },
   
            confirmButtonText: 'باشه',
            buttonsStyling: false,
          })
          var inp = document.getElementById("persianInput")
          inp.value= null
          }
    });
    $("#CreateFactorBtn").on("click",function(e) {
        e.preventDefault();
        BtnStyle(st=true,btn_id="CreateFactorBtn")
        const form_data = $("#CreateFactorForm")
 
        // const formData = $(this).serialize();
        var requesturl = $("#CreateFactorForm").attr("action")
        var selectedValue = $('#states').val();
        
        $.ajax({
          url :requesturl + `?costumer=${selectedValue}`,
          method :"POST",

          data : form_data.serialize(),
          success: function(response) {
            var input = `<input type="hidden" value="${response['factor_id']}" name="factorid">`
            $("#SummeryForm").append(input)
            var title_text= document.getElementById("backDropModalTitle")
            title_text.innerText=`قیمت نهایی محصولات ${response['total_price']}`
            $("#backDropModal").modal('show')
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
            BtnStyle(false,"CreateFactorBtn")
          }
  
        })
      });
    $("#CreateTimeFactorBtn").on("click",function() {
      BtnStyle(st=true,btn_id="CreateTimeFactorBtn")
      const form = $("#CreateTimeFactorForm")
      var requesturl= $("#CreateTimeFactorForm").attr("action")
      console.log("FUCKKK")
      console.log(requesturl)
      console.log(form.serialize())
      $.ajax({
        url:requesturl,
        method:"POST",
        data:form.serialize(),
        success: function(response) {
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
            location.href= response['redirect_url']
          })
          
        },
        error: function(xhr, status, error) {
          Swal.fire({
            title:"هشدار",
            text: "مشکلی پیش آمده لطفا دوباره امتحان کنید",
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            confirmButtonText: 'باشه',
            buttonsStyling: false
          });
          BtnStyle(false,"CreateTimeFactorBtn")

        }
      })
    });
    $("#CreateInput").on('click',function(){
      var count = $("#Count").val();
      $("#main_div").empty();
      for (var i = 1; i <= Number(count); i++) {
        $("#main_div").append(
          `
        <div class="col mb-0">
        <label class="form-label" for="num_print">تاریخ پرداخت پیش پرداخت </label>
        <div class="input-group input-group-merge">
          <span id="basic-icon-default-fullname2" class="input-group-text"><i class='bx bx-window-open'></i></span>
          <input type="text" class="form-control" name="prepayment_date" placeholder="YYYY/MM/DD" id="flatpickr-date_${i}">
        </div>
        </div>
    `
          
        )
      }
    })


});


var datetime_input = `
<div class="col mb-0">
<label class="form-label" for="num_print">تاریخ پرداخت پیش پرداخت </label>
<div class="input-group input-group-merge">
  <span id="basic-icon-default-fullname2" class="input-group-text"><i class='bx bx-window-open'></i></span>
  <input type="text" class="form-control" name="prepayment_date" placeholder="YYYY/MM/DD" id="flatpickr-date_2">
</div>
</div>
`

var installment_count = `
<div class="col mb-0">
<label for="emailBackdrop" class="form-label">تعداد اقساط </label>
<input type="text" id="emailBackdrop" name="installment_count" class="form-control" placeholder="لطفا تعداد اقساط مورد نظر را وارد کنید">
</div>
<div class="col mb-0">

<div class="input-group input-group-merge">
  <button type="button" class="btn btn-dark">ثبت </button>
</div>
</div>
`