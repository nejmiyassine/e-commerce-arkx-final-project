const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    creation_date: {
        type: Date,
        default: Date.now,
    },
    last_login: {
        type: Date,
        default: Date.now,
    },
    valid_account: {
        type: Boolean,
        default: false,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

customerSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compareSync(password, this.password);
    return result;
};

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
