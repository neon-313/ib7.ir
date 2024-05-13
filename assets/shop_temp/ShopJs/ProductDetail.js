
function separateNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

$(document).ready(function() {

    $("#addToCard").on("click",function(e) {
        e.preventDefault();
        const inventorys = []
        $('input[name="color-desktop"]').each(function() {
            if($(this).prop("checked")){
                inventorys.push($(this).val());
            }
        })
        const data_to_send ={
            inventorys: inventorys,
            quantity:$("#inp_val").val(),
            csrfmiddlewaretoken:$("input[name='csrfmiddlewaretoken']").val(),
        }
        JSON.stringify(data_to_send)
        $.ajax({
            url: $("#addToCardUrl").val(),
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data_to_send),
            success: function(response) {
                console.log("Data sent successfully");
                console.log(response); // Response from the server
            },
            error: function(xhr, status, error) {
                console.error("Error occurred while sending data to the server:", error);
            }
        });

    })
    $("#addToCardPhone").on("click",function(e) {
        console.log("FUck")
        e.preventDefault();
        const inventorys = []
        $('input[name="color-desktop"]').each(function() {
            if($(this).prop("checked")){
                inventorys.push($(this).val());
            }
        })
        const data_to_send ={
            inventorys: inventorys,
            quantity:$("#inp_val").val(),
            csrfmiddlewaretoken:$("input[name='csrfmiddlewaretoken']").val(),
        }
        JSON.stringify(data_to_send)
        $.ajax({
            url: $("#addToCardUrl").val(),
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data_to_send),
            success: function(response) {
                console.log("Data sent successfully");
                console.log(response); // Response from the server
            },
            error: function(xhr, status, error) {
                console.error("Error occurred while sending data to the server:", error);
            }
        });

    })
    $("#notAut").on("click", function(){
        console.log("fuck")
        Swal.fire({
            title: 'خطا',
            text: "برای ثبت سفارش باید وارد حساب کاربری حود شوید",
            icon: 'error',
            customClass: {
                confirmButton: 'btn-primary w-40 py-2 confirmButtonClass',
                cancelButton: 'bg-red-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded'
            },
            confirmButtonText: 'ورود',
            showCancelButton: true,
            
            cancelButtonText: 'لغو',
            cancelButtonAriaLabel: 'لغو'
        }).then(function (result) {
            if(result){
                location.href="/Market/LoginOrRegister"
            }
        });
    })
 
    var price = $("#productPrice").text()
    var number = parseInt(Number(price), 10);
    var separatedNumber = separateNumber(number);
    $("#productPrice").text(separatedNumber)
    $(".color_selected").on("click", function(){
        var color_id=$(this).val();
        $.ajax({
            url:$("#getsizeurl").val(),
            method:"GET",
            datatype:"application/json",
            data:{
                color_id:color_id
            },
            success:function(response){
               
                $("#size_list").empty();
                $.each(response, function(index, value) {
                    var html = `
                            <div>
                            <input  type="radio" name="size-desktop"
                                value="${value['size_id']}" id="${value['size_id']}"
                                class="peer hidden" />

                            <label for="${value['size_id']}"
                                class="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 p-1 shadow-base peer-checked:border-emerald-500 hover:border-gray-200 dark:border-white/5 peer-checked:dark:border-emerald-400 dark:hover:border-white/10">
                                <p
                                    class="text-sm font-bold text-zinc-600 dark:text-zinc-300 md:text-base">
                                    ${value['size_name']}
                                </p>
                            </label>
                        </div>
                    `
                    $("#size_list").append(html)
                });

            }
        })

    })
    $(".color_selected_2").on("click", function(){
        var color_id=$(this).val();
        $.ajax({
            url:$("#getsizeurl").val(),
            method:"GET",
            datatype:"application/json",
            data:{
                color_id:color_id
            },
            success:function(response){
               
                $("#size_list_2").empty();
                $.each(response, function(index, value) {
                    var html = `
                            <div>
                            <input  type="radio" name="size-desktop"
                                value="${value['size_id']}" id="${value['count_id']}"
                                class="peer hidden" />

                            <label for="${value['count_id']}"
                                class="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 p-1 shadow-base peer-checked:border-emerald-500 hover:border-gray-200 dark:border-white/5 peer-checked:dark:border-emerald-400 dark:hover:border-white/10">
                                <p
                                    class="text-sm font-bold text-zinc-600 dark:text-zinc-300 md:text-base">
                                    ${value['size_name']}
                                </p>
                            </label>
                        </div>
                    `
                    $("#size_list_2").append(html)
                });

            }
        })

    })
    // $("#increment").on("click", function(){
    //     var value = $("#inp_val")
    //     var true_value = Number(value.val()) + 1
    //     value.val(true_value)
    // })
    // $("#decrement").on("click", function(){
    //     var value = $("#inp_val")
    //     if (Number(value.val())> 1){

    //         var true_value = Number(value.val()) - 1
    //         value.val(true_value)
    //     }
    // })
    // $("#increment_phone").on("click", function(){
    //     var value = $("#inp_val_phone")
    //     var true_value = Number(value.val()) + 1
    //     value.val(true_value)
    // })
    // $("#decrement_phone").on("click", function(){
    //     var value = $("#inp_val_phone")
    //     if (Number(value.val())> 1){

    //         var true_value = Number(value.val()) - 1
    //         value.val(true_value)
    //     }
    // })
})


const copyToClipboardSocialShareDesktop = (button) => {
    const linkToCopy = button.getAttribute("data-link");
    if (linkToCopy) {
        navigator.clipboard
            .writeText(linkToCopy)
            .then(function () {
                const copyToClipboardSocialShareText = document.getElementById(
                    "copyToClipboardSocialShareText",
                );
                copyToClipboardSocialShareText.innerText = "کپی شد !";

                // Revert the text after 5 seconds
                setTimeout(function () {
                    copyToClipboardSocialShareText.innerText = "کپی کردن لینک";
                }, 5000);
            })
            .catch(function (err) {
                console.error("مشکلی در عملیات پیش آمد", err);
            });
    }
};
const copyToClipboardSocialShareMobile = (button) => {
    const linkToCopy = button.getAttribute("data-link");
    console.log(linkToCopy);
    if (linkToCopy) {
        navigator.clipboard
            .writeText(linkToCopy)
            .then(function () {
                const copyToClipboardSocialShareNotifyMobile =
                    document.getElementById(
                        "notify-copied-social-share-link-mobile",
                    );
                copyToClipboardSocialShareNotifyMobile.classList.remove("hidden");

                // Revert the text after 5 seconds
                setTimeout(function () {
                    copyToClipboardSocialShareNotifyMobile.classList.add("hidden");
                }, 5000);
            })
            .catch(function (err) {
                console.error("مشکلی در عملیات پیش آمد", err);
            });
    }
};

// Define a function to handle the toggling of content and buttons
function toggleContent(container, button) {
    if (container.offsetHeight !== 500) {
        button.remove();
    }

    button.addEventListener("click", () => {
        if (container.classList.contains("max-h-[500px]")) {
            container.classList.remove("max-h-[500px]");
            button.innerHTML =
                'بستن <svg class="w-5 h-5"><use xlink:href="#chevron-left"/></svg>';
        } else {
            container.classList.add("max-h-[500px]");
            button.innerHTML =
                'مشاهده بیشتر <svg class="w-5 h-5"><use xlink:href="#chevron-left"/></svg>';
        }
    });
}

// Find and toggle the description content
const descriptionContainer = document.getElementById(
    "descriptionContainer",
);
const toggleDescriptionButton = document.getElementById(
    "toggleDescriptionButton",
);
const descriptionButtonMobile = document.getElementById(
    "descriptionButtonMobile",
);
if (descriptionContainer.offsetHeight !== 500) {
    descriptionButtonMobile.remove();
}
toggleContent(descriptionContainer, toggleDescriptionButton);

// Find and toggle the specs content
const specsContainer = document.getElementById("specsContainer");
const toggleSpecsButton = document.getElementById("toggleSpecsButton");
const specsButtonMobile = document.getElementById("specsButtonMobile");
if (specsContainer.offsetHeight !== 500) {
    specsButtonMobile.remove();
}
toggleContent(specsContainer, toggleSpecsButton);

// Find and toggle the comments content
const commentsContainer = document.getElementById("commentsContainer");
const toggleCommentsButton = document.getElementById(
    "toggleCommentsButton",
);
toggleContent(commentsContainer, toggleCommentsButton);
