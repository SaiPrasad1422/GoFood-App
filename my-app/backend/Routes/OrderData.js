const express = require("express");
const router = express.Router();
const Order = require("../models/Orders"); // Adjust path if needed

router.post("/orderData", async (req, res) => {
    let data = req.body.order_data;
    
    if (!data || !req.body.email) {
        return res.status(400).json({ error: "Missing email or order data" });
    }

    try {
        let existingOrder = await Order.findOne({ email: req.body.email });

        let orderWithDate = [{ Order_date: new Date().toISOString() }, ...data];  // Add order date

        if (!existingOrder) {
            await Order.create({
                email: req.body.email,
                order_data: [orderWithDate],  // Store as array
            });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: orderWithDate } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ email: req.body.email });

        if (!myData) {
            return res.status(404).json({ error: "No orders found" });
        }

        res.json({ orderData: myData });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
