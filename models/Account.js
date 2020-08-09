const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    chorechat_nickname: {
        type: String,
        require: true,
        default: ""
    },
    password: {
        type: String,
        require: true
    },
    roomies: {
        type: Array,
        require: true,
        default: []
    },
    weekly_chores: {
        type: Array,
        require: true,
        default: []
    },
    bi_weekly_chores: {
        type: Array,
        require: true,
        default: []
    },
    monthly_chores: {
        type: Array,
        require: true,
        default: []
    },
    schedule_details: {
        type: Array,
        require: true,
        default: []
    },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;