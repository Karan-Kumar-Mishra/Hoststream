import express from "express";
const verify_payment = express.Router();
import crypto from "crypto";
import Database from "../Database";

export default verify_payment.post('/', (req, res) => {
    try {
        const { orderId, razorpayPaymentId, razorpaySignature,user_id } = req.body;
        if (!orderId || !razorpayPaymentId || !razorpaySignature) {
             res.status(400).json({ success: false, message: 'Invalid request parameters' });
        }

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || "rzp_test_RUGErNMHKD0mmg")
            .update(`${orderId}|${razorpayPaymentId}`)
            .digest('hex');

        if (generatedSignature === razorpaySignature) {
            Database.mark_prime(user_id).then(()=>{    
                res.status(200).json({ success: true, message: 'Payment verified successfully' });
            }).catch((err)=>{
                res.send({
                    status:"error",
                    msg:"error while make the user as prime "
                }) 
            })


        } else {
             res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Payment Verification Error:', error);
         res.status(500).json({
            success: false,
            message: 'Failed to verify payment',
            error: error,
        });
    }
});