const mongoose = require('mongoose');

const MONGO_URI = "mongodb://localhost:27017/goodfoodmern"; // Ensure DB name is correct

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB successfully!');

        // Fetch food_items collection
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        global.food_items = await foodItemsCollection.find({}).toArray();

        // Fetch foodCategory collection
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
        global.foodCategory = await foodCategoryCollection.find({}).toArray();

        console.log("📜 Food Items and Food Categories fetched successfully!");
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;