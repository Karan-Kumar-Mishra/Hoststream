export default async function makepayment() {
    try {
        // 1. First create the order on your server
        const amount = 29
        const currency = "USD"
        const notes = "Hoststream " + Date.now();
        const orderResponse = await fetch(import.meta.env.VITE_BACKEND_URL + '/create_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                currency,
                notes
            })
        });

        const orderData = await orderResponse.json();

        if (!orderResponse.ok || !orderData.success) {
            throw new Error(orderData.error || "Failed to create order");
        }

        // 2. Load Razorpay script dynamically
        await loadRazorpayScript();

        // 3. Initialize payment options
        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID || "rzp_test_RUGErNMHKD0mmg",
            amount: orderData.amount,
            currency: orderData.currency,
            name: "Hoststream",
            description: "Hoststream premium",
            image: "/logo.png", // Path to your logo
            order_id: orderData.id,
            handler: async function (response) {
                try {
                    // Log the full response to inspect its contents
                    console.log("Razorpay handler response:", response);

                    // Verify payment on your server
                    const verificationResponse = await fetch(import.meta.env.VITE_BACKEND_URL + '/verify_payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(response)
                    });
                    const verificationData = await verificationResponse.json();

                    if (verificationData.success) {
                        alert("Payment successful!");
                        window.location.href = "/";
                    } else {
                        alert("Payment verification failed");
                    }
                } catch (error) {
                    console.error("Verification error:", error);
                    alert("Error verifying payment");
                }
            },
            theme: {
                color: "#2300a3"
            },
            modal: {
                ondismiss: function () {
                    console.log("Payment modal closed by user");
                }
            }
        };

        const rzp = new window.Razorpay(options);

        rzp.on('payment.failed', function (response) {
            console.error("Payment failed:", response.error);
            alert(`Payment failed: ${response.error.description}`);
        });

        rzp.open();

    } catch (error) {
        console.error("Payment error:", error);
        alert(`Payment Error: ${error.message}`);
        // Handle error appropriately in your UI
    }
}
function loadRazorpayScript() {
    return new Promise((resolve) => {
        if (document.getElementById('rzp-script')) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.id = 'rzp-script';
        script.onload = resolve;
        document.body.appendChild(script);
    });
}