const mongoose = require('mongoose');
const dotenv = require('dotenv');

async function connectToDb() {
    try {
        // Load environment variables
        dotenv.config();
        
        // Get MongoDB URI from environment variables
        const dbUri = process.env.MONGODB_URL;

        // Connect to MongoDB
       const connection = await mongoose.connect(dbUri, {
            dbName: 'Rule Engine', 
        });
        console.log('Connected to MongoDB ');
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        // You might want to handle the error further, depending on your application's requirements
    }
}

// Close MongoDB connection when the Node.js process terminates
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error closing MongoDB connection', error);
        process.exit(1);
    }
});

module.exports = connectToDb;