const Orders = require('../models/Orders');

// Create a new order
const createOrdersController = async (req, res) => {
    try {
        const { order_items, cart_total_price } = req.body;

        if (!order_items || !cart_total_price) {
            return res.status(400).send({ message: 'Missing required fields' });
        }

        const existingOrder = await Orders.findOne({ order_items, cart_total_price });

        if (existingOrder) {
            return res.status(200).send({
                success: true,
                message: 'Order already exists',
            });
        }

        const newOrder = await Orders.create({
            order_items,
            cart_total_price,
        });

        res.status(201).send({
            success: true,
            message: 'New Order created',
            order: newOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error creating order',
        });
    }
};

// Update an order by ID
const updateOrdersController = async (req, res) => {
    const orderId = req.params.id;
    try {
        if (!orderId) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const order = await Orders.findByIdAndUpdate(orderId, req.body, {
            new: true,
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order updated successfully',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get an order by ID
const getOrderByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Orders.findById(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a list of all orders
const getAllOrdersController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const orders = await Orders.populate('customer_id')
            .limit(limit)
            .skip(skip);

        if (orders.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createOrdersController,
    updateOrdersController,
    getOrderByIdController,
    getAllOrdersController,
};
