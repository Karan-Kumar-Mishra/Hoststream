import express from "express";
const create_order = express.Router();
import razorpayInstance from "../Data/PaymentInstance";

export default create_order.post('/', (req, res) => {
    try {
        const { currency, receipt, notes } = req.body;
        const amount = 2900
        // Validate required fields with return statements
        if (!amount || !currency) {
            res.status(400).json({
                success: false,
                error: "Amount and currency are required fields"
            });
        }

        // Convert amount to number
        const amountNumber = Number(amount);
        if (isNaN(amountNumber)) {
            res.status(400).json({
                success: false,
                error: "Amount must be a valid number"
            });
        }

        // Convert to paise (smallest currency unit)
        const amountInPaise = Math.round(amountNumber );

        // Prepare order data with proper notes format
        const orderData = {
            amount: amountInPaise,
            currency: currency.toUpperCase(),
            receipt: receipt || `order_rcpt_${Date.now()}`,
            notes: {} // Initialize as empty object
        };

        // Only add notes if they exist and are in correct format
        if (notes && typeof notes === 'object' && !Array.isArray(notes)) {
            orderData.notes = notes;
        } else if (notes) {
            // If notes is not an object, convert it to proper format
            orderData.notes = { description: String(notes) };
        }

        // Create order
        razorpayInstance.orders.create(orderData)
            .then((order) => {
                res.json({
                    success: true,
                    order: {
                        id: order.id,
                        amount: order.amount,
                        currency: order.currency,
                        receipt: order.receipt
                    }
                });
            })
            .catch((error) => {
                console.error("Razorpay API error:", error);
                res.status(500).json({
                    success: false,
                    error: "Payment gateway error",
                    details: error.error?.description || error.message
                });
            });

    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({
            success: false,
            error: "Server error",
            details: error // Better to send just the message
        });
    }
});