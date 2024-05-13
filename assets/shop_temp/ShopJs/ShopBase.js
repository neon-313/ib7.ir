function separateNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
$(document).ready(function(){
    $(".card_price").each(function(){
        
        var $span = $(this);
        var number = parseInt(Number($span.text()), 10);
        var separatedNumber = separateNumber(number); // Assuming you have a separateNumber function
        $span.text(separatedNumber);
    });
});


function incrementDesktop(product_code,invenotory_id){
    console.log("fuck")
    var value = $(`#inp_desktop_${product_code}_${invenotory_id}`)
   
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
            $("#total_card_price_desktop").text(separatedNumber);
          
            var number = parseInt(Number(response['prie_of_card']), 10);
            var separatedNumber = separateNumber(number);
            $(`#price_of_card_desktop_${product_code}_${invenotory_id}`).text(separatedNumber);


        },
        error: function(xhr, status, error) {
            console.error('Error occurred while sending delete request:', error);
        }
    });

    
  
}

function incrementPhone(product_code,invenotory_id){
    
    var value = $(`#inp_phone_${product_code}_${invenotory_id}`)
    // console.log(value)
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
            $("#total_card_price_phone").text(separatedNumber);
          
            var number = parseInt(Number(response['prie_of_card']), 10);
            var separatedNumber = separateNumber(number);
            $(`#price_of_card_phone_${product_code}_${invenotory_id}`).text(separatedNumber);


        },
        error: function(xhr, status, error) {
            console.error('Error occurred while sending delete request:', error);
        }
    });

}


function decrementDesktop(product_code,invenotory_id){
    var value = $(`#inp_desktop_${product_code}_${invenotory_id}`)
    if (Number(value.val())> 1){

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
            $("#total_card_price_desktop").text(separatedNumber);
          
            var number = parseInt(Number(response['prie_of_card']), 10);
            var separatedNumber = separateNumber(number);
            $(`#price_of_card_desktop_${product_code}_${invenotory_id}`).text(separatedNumber);


        },
        error: function(xhr, status, error) {
            console.error('Error occurred while sending delete request:', error);
        }
        });
        
    }
}

function decrementPhone(product_code,invenotory_id){
    var value = $(`#inp_phone_${product_code}_${invenotory_id}`)
    if (Number(value.val())> 1){

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
            $("#total_card_price_phone").text(separatedNumber);
          
            var number = parseInt(Number(response['prie_of_card']), 10);
            var separatedNumber = separateNumber(number);
            $(`#price_of_card_phone_${product_code}_${invenotory_id}`).text(separatedNumber);


        },
        error: function(xhr, status, error) {
            console.error('Error occurred while sending delete request:', error);
        }
        });
     
    }
}



function deleteCardItem(product_code,inventory_id){
    var csrftoken = $("input[name='csrfmiddlewaretoken']").val()
    $.ajax({
        url: `/Market/AddToCard/${product_code}/${inventory_id}`,
        type: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken // Include the CSRF token in the headers
        },
        success: function(response) {
            console.log(response)
            $("#count_1_desktop").text(response['count_card'])
            $("#count_2_desktop").text(`${response['count_card']} مورد`)
            $("#count_phone_card").text(`(${response['count_card']} )`)
            $("#count_phone_1").text(`${response['count_card']} مورد`)
            var number = parseInt(Number(response['total_card_price']), 10);
            var separatedNumber = separateNumber(number);
            $("#total_card_price_phone").text(separatedNumber);
            $(`#row_phone_${product_code}_${inventory_id}`).remove();

            $(`#row_card_item_${product_code}_${inventory_id}`).remove();
        },
        error: function(xhr, status, error) {
            console.error('Error occurred while sending delete request:', error);
        }
    });
};


function deleteCardItemPhone(product_code,inventory_id){
    var csrftoken = $("input[name='csrfmiddlewaretoken']").val()
    $.ajax({
        url: `/Market/AddToCard/${product_code}/${inventory_id}`,
        type: 'DELETE',
        headers: {
            'X-CSRFToken': csrftoken // Include the CSRF token in the headers
        },
        success: function(response) {
            console.log(response)
            $("#count_1_desktop").text(response['count_card'])
            $("#count_2_desktop").text(`${response['count_card']} مورد`)
            $("#count_phone_card").text(`(${response['count_card']} )`)
            $("#count_phone_1").text(`${response['count_card']} مورد`)
            var number = parseInt(Number(response['total_card_price']), 10);
            var separatedNumber = separateNumber(number);
            $("#total_card_price_phone").text(separatedNumber);
            $(`#row_phone_${product_code}_${inventory_id}`).remove();

        },
        error: function(xhr, status, error) {
            console.error('Error occurred while sending delete request:', error);
        }
    });
};


