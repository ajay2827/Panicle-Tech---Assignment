const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/errorHandler');
require('dotenv').config();

// connecting to database
connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// requiring routers
const employeeRoutes = require('./routes/employeeRoute');

// using routers
app.use('/api/v1/employee', employeeRoutes);

// middleware
app.use(express.json({ limit: '20mb' }));
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// starting server
const port = process.env.PORT || 5000;

const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`)
);
