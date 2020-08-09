const validator = require("validator");
const isEmpty = require("is-empty");

const validate_register_data = (data) => {
    const errors = {};

    if (validator.isEmpty(data.email)) {
        errors.email = "Email address is a required field";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Must enter a valid email address";
    }

    if (validator.isEmpty(data.username)) {
        errors.username = "Username is a required field";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is a required field";
    }

    if (validator.isEmpty(data.pw_confirm)) {
        errors.pw_confirm = "Confirm password is a required field";
    } else if (!validator.equals(data.password, data.pw_confirm)) {
        errors.pw_confirm = "Passwords must match";
    }

    return {
        errors,
        is_valid: isEmpty(errors)
    };
};

module.exports = validate_register_data;