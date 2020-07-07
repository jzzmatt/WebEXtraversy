const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');


// Route files
const bootcamps = require('./routes/bootcamps')

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

//Call Middleware
//Dev logging Middleware, only run on developpement Mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Mount  Routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 4000;

app.listen(
    PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV}on port ${PORT}!`);
});