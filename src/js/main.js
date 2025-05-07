// main.js
import $ from "jquery";

$(document).ready(function () {
    const $form = $('form[action="/test"]');
    const $country = $form.find('select[name="country"]');
    const $telCode = $form.find('input[name="telCode"]');
    const $email = $form.find('input[name="email"]');
    const $terms = $form.find('input[name="terms"]');
    const $response = $form.find("#response");

    // 1. Autocomplete phone code
    function updatePhoneCode() {
        const code = $country.find(":selected").data("tel-code");
        $telCode.val(code);
    }
    $country.on("change", updatePhoneCode);
    updatePhoneCode();

    // 2. Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 3. Validate on submit
    $form.on("submit", function (e) {
        e.preventDefault();
        $response.empty();

        let valid = true;
        const emailVal = $email.val().trim();

        // — Validate email
        if (!emailRegex.test(emailVal)) {
            valid = false;
            $response.append(
                '<p id="email-error" class="text-red-600 text-sm">Please enter a valid email address.</p>'
            );
        }

        // — Validate terms checkbox
        if (!$terms.is(":checked")) {
            valid = false;
            $response.append(
                '<p id="terms-error" class="text-red-600 text-sm">You must accept the privacy policy.</p>'
            );
        }

        if (valid) {
            this.submit();
        }
    });

    // 4. Real-time email border on blur
    $email.on("blur", function () {
        const isValid = emailRegex.test($(this).val().trim());
        $(this).toggleClass("border-red-600!", !isValid);
    });
});
