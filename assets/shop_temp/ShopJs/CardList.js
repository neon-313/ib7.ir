function separateNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function incrementMain(product_code,invenotory_id){
    
    var value = $(`#inp_main_${product_code}_${invenotory_id}`)
   
    var true_value = Number(value.val()) + 1

    var csrftoken = $("input[name='csrfmiddlewaretoken']").val()
    $.ajax({
        url: `/Market/AddToCard/${product_code}/${invenotory_id}?quantity=${true_value}`,
        type: 'PUT',
        headers: {
            'X-CSRFToken': csrftoken // Include the CSRF token in the headers
        },
        success: function(response) {
            console.log(response)
          
            var number = parseInt(Number(response['total_card_price']), 10);
            var separatedNumber = separateNumber(number);
            $("#total_1").text(separatedNumber);
            $("#total_2").text(separatedNumber);
            $("#total_3").text(separatedNumber);
          
            var number = parseInt(Number(response['prie_of_card']), 10);
            var separatedNumber = separateNumber(number);
            $(`#per_car_price_${product_code}_${invenotory_id}`).text(separatedNumber);


        },
        error: function(xhr, status, error) {
            console.error('Error occurred while sending delete request:', error);
        }
    });
    $(`#quantity_desktop_${product_code}_${invenotory_id}`).text(true_value);
    

}


function decrementMain(product_code,invenotory_id){
        var value = $(`#inp_main_${product_code}_${invenotory_id}`)
    

        var true_value = Number(value.val()) - 1
        var csrftoken = $("input[name='csrfmiddlewaretoken']").val()
        $.ajax({
        url: `/Market/AddToCard/${product_code}/${invenotory_id}?quantity=${true_value}`,
        type: 'PUT',
        headers: {
            'X-CSRFToken': csrftoken // Include the CSRF token in the headers
        },
        success: function(response) {
            console.log(response)
          
            var number = parseInt(Number(response['total_card_price']), 10);
            var separatedNumber = separateNumber(number);
            $("#total_1").text(separatedNumber);
            $("#total_2").text(separatedNumber);
            $("#total_3").text(separatedNumber);
          
            var number = parseInt(Number(response['prie_of_card']), 10);
            var separatedNumber = separateNumber(number);
            $(`#per_car_price_${product_code}_${invenotory_id}`).text(separatedNumber);


        },
        error: function(xhr, status, error) {
            console.error('Error occurred while sending delete request:', error);
        }
        });
        

        
  
}




function deleteCardItemMain(product_code,inventory_id){
    var csrftoken = $("input[name='csrfmiddlewaretoken']").val()
    $.ajax({
        url: `/Market/AddToCard/${product_code}/${inventory_id}`,
        type: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken // Include the CSRF token in the headers
        },
        success: function(response) {
            console.log(response)
       
            $("#count_card_main").text(`(${response['count_card']} کالا)`)
            
       
            var number = parseInt(Number(response['total_card_price']), 10);
            var separatedNumber = separateNumber(number);
            $("#total_1").text(separatedNumber);
            $("#total_2").text(separatedNumber);
            $("#total_3").text(separatedNumber);
            $(`#row_card_main_${product_code}_${inventory_id}`).remove();

        },
        error: function(xhr, status, error) {
            console.error('Error occurred while sending delete request:', error);
        }
    });
};


