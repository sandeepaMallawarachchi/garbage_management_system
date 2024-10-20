const crypto = require('crypto');
const Customer = require('../models/customerDetails'); // Assuming you're dealing with customers
// Import your Order model if needed for tracking orders

exports.handlePayHereNotification = async (req, res) => {
    try {
        // PayHere sends notification as form data
        const {
            merchant_id,
            order_id,
            payment_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig,
        } = req.body;

        // Your PayHere merchant secret
        const merchant_secret = process.env.PAYHERE_SECRET;

        // Prepare the signature to compare (MD5 hash)
        const localMd5sig = crypto.createHash('md5').update(
            merchant_id + order_id + payhere_amount + payhere_currency + status_code + crypto.createHash('md5').update(merchant_secret).digest('hex')
        ).digest('hex').toUpperCase();

        // Verify the signature
        if (md5sig !== localMd5sig) {
            return res.status(400).json({ message: "Invalid signature" });
        }

        // Check the payment status code (2 = successful payment)
        if (status_code === "2") {
            // Payment successful, update the order or customer status here
            // Example: Update customer's payment status or update order details

            // Assuming you are updating based on customer payment
            const customer = await Customer.findOne({ cusID: order_id });

            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }

            // Update customer payment status
            customer.paymentStatus = 'Completed'; // You can store the payment status as needed
            await customer.save();

            // Send success response back to PayHere
            return res.status(200).json({ message: 'Payment verified and processed successfully' });
        } else {
            // Handle other payment statuses (failed, pending, etc.)
            return res.status(400).json({ message: 'Payment not successful' });
        }
    } catch (error) {
        console.error('Error processing PayHere notification:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
