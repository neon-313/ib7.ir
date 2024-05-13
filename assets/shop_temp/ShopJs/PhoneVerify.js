// Time for Resend OTP , Current : 2 minutes
let countdownMinutes = 2;
let countdownSeconds = 0;
let countdownInterval;

function updateCountdown() {
    const countdownElement = document.getElementById("countdown");
    countdownElement.textContent = `${countdownMinutes}:${countdownSeconds
        .toString()
        .padStart(2, "0")}`;
}

function startCountdown() {
    countdownInterval = setInterval(function () {
        if (countdownMinutes === 0 && countdownSeconds === 0) {
            clearInterval(countdownInterval);
            document.getElementById("resendButton").classList.remove("!hidden");
            document.getElementById("resendButton").disabled = false;
            document.getElementById("countdownSection").classList.add("hidden");
        } else {
            if (countdownSeconds === 0) {
                countdownMinutes--;
                countdownSeconds = 59;
            } else {
                countdownSeconds--;
            }
            updateCountdown();
        }
    }, 1000);
}

function resendOTP() {
    if (countdownMinutes != 0 || countdownSeconds != 0) return;
    // Add your OTP resend logic here
    // For demonstration, let's just reset the countdown and disable the button
    countdownMinutes = 2;
    countdownSeconds = 0;
    updateCountdown();
    document.getElementById("resendButton").classList.add("!hidden");
    document.getElementById("resendButton").disabled = true;
    document.getElementById("countdownSection").classList.remove("hidden");

    startCountdown();
}

startCountdown(); // Start the countdown when the page loads
// Otp Input Section Start
const form = document.querySelector("#otp-form");
const inputs = document.querySelectorAll(".otp-input");
const verifyBtn = document.querySelector("#verify-btn");

inputs[0].focus();

const isAllInputFilled = () => {
    return Array.from(inputs).every((item) => item.value);
};

const getOtpText = () => {
    let text = "";
    inputs.forEach((input) => {
        text += input.value;
    });
    return text;
};

const verifyOTP = () => {
    if (isAllInputFilled()) {
        $("#loaderButton").prop('disabled', true);
        // Hide the button text and show the loader icon
        $('#buttonText').text("منتظر بمانید....")
        $('#loaderIcon').removeClass('hidden');
  
  
        // Simulate asynchronous operation

        const text = getOtpText();
        var requesturl = $("#userLoginUrl").val();
        var token = $("#Token").val();
        $.ajax({
            url: `${requesturl}?token=${token}&code=${text}`,
            method: "GET",
            success: function (response) {
                Swal.fire({
                    title: 'موفق',
                    text: response['message'],
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn-primary w-40 py-3'
                    },
                    confirmButtonText: 'باشه',
                    buttonsStyling: false

                }).then(function (result) {
                    location.href = response['redirect_url']

                });
            },
            error: function(xhr, status, error) {

                var responseJson = JSON.parse(xhr.responseText);
                Swal.fire({
                    title: 'خطا',
                    text: responseJson['message'],
                    icon: 'error',
                    customClass: {
                        confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                    },
                    confirmButtonText: 'باشه',
                    // buttonsStyling: false

                })
            }
        })
        setTimeout(() => {
            // Enable the button
            $('#loaderButton').prop('disabled', false);
            // Show the button text and hide the loader icon
            $('#buttonText').text("ثبت")
            $('#loaderIcon').addClass('hidden');
          }, 2000);

    }
};

const toggleFilledClass = (field) => {
    if (field.value) {
        field.classList.add("!border-tertiary-500");
        field.classList.add("!border-tertiary-400");
    } else {
        field.classList.remove("!border-tertiary-500");
        field.classList.remove("!border-tertiary-400");
    }
};
form.addEventListener("input", (e) => {
    const target = e.target;
    const value = target.value;

    toggleFilledClass(target);
    if (target.nextElementSibling) {
        target.nextElementSibling.focus();
    }
    verifyOTP();
});
inputs.forEach((input, currentIndex) => {
    // fill check
    toggleFilledClass(input);
    // paste event
    input.addEventListener("paste", (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");

        inputs.forEach((item, index) => {
            if (index >= currentIndex && text[index - currentIndex]) {
                item.focus();
                item.value = text[index - currentIndex] || "";
                toggleFilledClass(item);
                verifyOTP();
            }
        });
    });
    // backspace event
    input.addEventListener("keydown", (e) => {
        if (e.keyCode === 8) {
            e.preventDefault();
            input.value = "";
            // console.log(input.value);
            toggleFilledClass(input);
            if (input.previousElementSibling) {
                input.previousElementSibling.focus();
            }
        } else {
            if (input.value && input.nextElementSibling) {
                input.nextElementSibling.focus();
            }
        }
    });
});
verifyBtn.addEventListener("click", () => {
    verifyOTP();
});
// Otp Input Section End