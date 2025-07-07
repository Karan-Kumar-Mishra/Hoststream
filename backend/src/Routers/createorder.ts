import express from "express";
const create_order = express.Router();
import razorpayInstance from "../Data/PaymentInstance";

export default create_order.post('/', (req, res) => {
    try {
        const { amount, currency } = req.body;
        if (!amount || !currency) {
            res.status(400).json({ success: false, message: 'Invalid request parameters' });
        }

        const options = {
            amount: amount * 100, // Convert to smallest currency unit (paise for INR)
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        razorpayInstance.orders.create(options).then((order) => {
            return res.status(200).json({
                success: true,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                key: process.env.RAZORPAY_KEY_ID,
            });
        }).catch((error) => {
            console.error('Create Order Error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create order',
                error: error
            });
        })

    } catch (error) {
        console.error('Create Order Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error
        });
    }
});