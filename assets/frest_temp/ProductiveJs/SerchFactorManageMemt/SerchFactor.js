function BtnStyle(st,btn_id){
  if (st){
    var btn = $(`#${btn_id}`);
    btn.empty();
    btn.append("درحال بارگزاری")
    btn.append(' <span class="spinner-border align-middle" role="status" aria-hidden="true"></span>')
    var main_btn = document.getElementById(btn_id)
    main_btn.disabled= true;
  }else{
   
    var btn = $(`#${btn_id}`);
    btn.empty();
    btn.append("جستجو<i class='bx bx-search-alt bx-tada' ></i>")
    var main_btn = document.getElementById(btn_id)
    main_btn.disabled= false;
  }
}
function SerchPeyment(){
    BtnStyle(st=true,btn_id="serch_btn")
    var date = $("input[name='serch_word']").val()
    var request_url =`/InstallMent/SerchFactorPeyment?serch_word=${date}`
    var dt_scrollable_table = $('.dt-scrollableTable');
    $.ajax({
      url: request_url,
      method:"GET",
      success: function(response) {
        console.log(response);
        $("#result_table").empty();
        response['data'].forEach(element => {
//           
// <span class="badge bg-label-success me-1">اتمام یافته</span>
          if (element['status']  == true){
            var tr = `
            <tr>
            
            <td>${element['peyment_date']}</td>
            <td>${element['price']}</td>
            <td>${element['costumer_name']}</td>
            <td>
            <span class="badge bg-label-primary me-1">پرداخت شده</span>
            </td>
            <td>${element['phone_num']}</td>
            <td>${element['order_price']}</td>
            <td>
            <a href="/InstallMent/FactorDetail/${element['order_id']}" target="_blank">
            
            ${element['order_code']}
            </a>
            </td>
            </tr>
        `
        $("#result_table").append(tr)
          }else{
            

            var tr = `
            <tr>
            
            <td>${element['peyment_date']}</td>
            <td>${element['price']}</td>
            <td>${element['costumer_name']}</td>
            <td>
            <span class="badge bg-label-danger me-1">پرداخت نشده</span>
            </td>
            <td>${element['phone_num']}</td>
            <td>${element['order_price']}</td>
            <td>
            <a href="/InstallMent/FactorDetail/${element['order_id']}" target="_blank">
            
            ${element['order_code']}
            </a>
            </td>
            </tr>
        `
        $("#result_table").append(tr)
          }
        BtnStyle(st=false,btn_id="serch_btn")
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
        BtnStyle(st=false,btn_id="serch_btn")
      }
    })
}

