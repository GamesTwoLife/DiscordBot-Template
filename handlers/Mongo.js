const mongoose = require("mongoose");
const { mongoURL } = require("./../config.json");

module.exports = async () => {
    mongoose.Promise = Promise;
    mongoose.connect(mongoURL);
    
    // Обробка помилок підключення
    mongoose.connection.on('error', (error) => {
        console.error(`Помилка підключення до MongoDB: ${error.message}`);
    });
    
    // Обробка відключення
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB відключено. Спроба перепідключення...');
    
        // Спроба перепідключення
        mongoose.connect(mongoURL);
    });
    
    // Обробка успішного підключення
    mongoose.connection.on('connected', () => {
        console.log(`MongoDB успішно підключено до кластеру ${mongoose.connection.name}`);
    });
    
    // Обробка закриття
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        process.exit(0);
    });
};