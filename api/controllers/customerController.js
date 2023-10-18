const bcrypt = require('bcrypt');
const Customer = require('../models/Customers');
const authService = require('../services/authServices');

exports.registerCustomer = async (req, res) => {
    authService.authRegister(req, res, Customer);
};

exports.loginCustomer = async (req, res, next) => {
    authService.authLogin(req, res, next, 'local-customer');
};

exports.getAllCustomersList = async (req, res) => {
    const page = req.query.page || 0;
    const sort = req.query.sort || 'DESC';
    const customerPerPage = 2;

    try {
        const customers = await Customer.find()
            .skip(page * customerPerPage)
            .sort({ first_name: sort })
            .limit(customerPerPage);

        if (!customers) {
            return res.status(404).json({ message: 'customers not found' });
        }

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'customer not found' });
        }

        return res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) res.status(404).json({ message: 'Customer not found' });
        return res
            .status(200)
            .json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCustomers = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const id = { _id: req.params.id };
        const updatedFields = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, salt);
            updatedFields.password = hashedPassword;
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchForCustomer = async (req, res) => {
    const query = req.query.first_name || '';
    const sort = req.query.sort || 'DESC';
    const customersPerPage = 2;
    const searchCriteria = {
        $or: [
            { first_name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
        ],

        first_name: { $regex: query, $options: 'i' },
    };

    try {
        const customers = await Customer.find(searchCriteria)
            .sort({ first_name: sort })
            .skip(customersPerPage)
            .limit(customersPerPage);

        if (!customers || customers.length === 0) {
            return res.status(404).json({
                message: 'No customers found matching the search criteria',
            });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
