//create a customer account
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const Customer = require('../models/Customers');
const { isResetTokenValid } = require('../middleware/resetTokenMiddleware');

const {
    getAllCustomersList,
    getCustomerById,
    deleteCustomerById,
    updateCustomers,
    searchForCustomer,
    getCustomerProfileData,
    getProfile,
} = require('../controllers/customerController');
const {
    verifyEmail,
    forgotPassword,
    resetPassword,
} = require('../services/authServices');
const {
    registerHandler,
    loginHandler,
    logoutHandler,
} = require('../controllers/authController');

const deserializeUser = require('../middleware/deserializeUser');
const requireUser = require('../middleware/requireUser');
const {
    restrictTo,
    restrictToCustomer,
} = require('../middleware/restrictMiddleware');

router.use(deserializeUser, requireUser);

router.post(
    '/',
    [
        check('first_name').notEmpty().withMessage('First name is required'),
        check('last_name').notEmpty().withMessage('Last name is required'),
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is not valid')
            .custom(async (email) => {
                // Check if the email is already registered
                const existingCustomer = await Customer.findOne({ email });
                if (existingCustomer) {
                    throw new Error('Email is already in use');
                }
            }),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    registerHandler
);

router.post(
    '/login',
    [
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is not valid'),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    loginHandler
);

router.get('/logout', logoutHandler);

router.get('/profile', restrictToCustomer, getCustomerProfileData);
// router.get('/', isAdminOrManager, getAllCustomersList);
router.get('/', restrictTo('admin', 'manager'), getAllCustomersList);
// router.get('/:id', isAdminOrManager, getCustomerById);
router.get('/:id', restrictTo('admin', 'manager'), getCustomerById);
// router.get('/search', isAdminOrManager, searchForCustomer);
router.get('/search', searchForCustomer);
router.put('/:id', updateCustomers);
// router.delete('/:id', isCustomer, isAdminOrManager, deleteCustomerById);
router.delete('/:id', deleteCustomerById);
router.get('/profile/:id', restrictToCustomer, getProfile);
router.post('/verify-email', (req, res) => verifyEmail(req, res, 'Customer'));
router.post('/forgot-password', (req, res) =>
    forgotPassword(req, res, 'Customer')
);
router.post('/reset-password', isResetTokenValid, (req, res) =>
    resetPassword(req, res, 'Customer')
);

module.exports = router;
