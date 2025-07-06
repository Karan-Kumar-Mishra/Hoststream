import express from "express";
const verify_payment = express.Router();
import crypto from "crypto";

export default verify_payment.post('/', (req, res) => {
    try {
        console.log("on veryfy route")
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
             res.status(400).json({
                error: "Missing payment verification data"
            });
        }

        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || "");
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');

        console.log(generatedSignature,"  ",razorpay_signature)

        if (generatedSignature === razorpay_signature) {
            // Payment is genuine - update your database here
            res.json({ success: true });
        } else {
            // Signature mismatch - possible tampering
            res.status(400).json({ 
                success: false,
                error: "Payment verification failed"
            });
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({
            error: "Payment verification failed",
            details: error
        });
    }
});