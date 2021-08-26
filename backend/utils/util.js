const emailValidator = require('email-validator');

// email validation
function validateEmail(email) {
    return emailValidator.validate(email);
}

// mobile validation
function validateMobile(mobile) {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(mobile);
}

module.exports = {validateEmail, validateMobile};