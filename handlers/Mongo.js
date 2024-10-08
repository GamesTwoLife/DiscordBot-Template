const mongoose = require("mongoose");
const { mongoURL } = require("./../config.json");

module.exports = async () => {
	mongoose.Promise = Promise;
	mongoose.connect(mongoURL);
	
	// Handling connection errors
	mongoose.connection.on('error', (error) => {
		console.error(`Error connecting to MongoDB: ${error.message}`);
	});
	
	// Disconnection handling
	mongoose.connection.on('disconnected', () => {
		console.log('MongoDB has been disabled.');
	});
	
	// Handling a successful connection
	mongoose.connection.on('connected', () => {
		console.log(`MongoDB successfully connected to the cluster ${mongoose.connection.name}`);
	});
	
	// Closing processing
	process.on('SIGINT', async () => {
		await mongoose.connection.close();
		process.exit(0);
	});
};
