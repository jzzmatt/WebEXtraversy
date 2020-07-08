const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps')
 
const app = express();

// Body Parser
app.use(express.json());

//Call Middleware
//Dev logging Middleware, only run on developpement Mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Mount  Routers
app.use('/api/v1/bootcamps', bootcamps);


// Error Handlers
app.use(errorHandler)

const PORT = process.env.PORT || 4000;

const server = app.listen(
    PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV}on port ${PORT}!`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    //Close Server & Exit process
    server.close(() => process.exit(1));
})