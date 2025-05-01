//Import Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030;
const host = '127.0.0.1';
const mongoose = require('mongoose');
const firebaseAdmin = require('firebase-admin');

const verifyToken = require('./middlewares/authMiddleware'); // Firebase authentication middleware

// Use Dependencies
app.use(cors());
app.use(express.json());

//Database Connection
const uri = process.env.MONGO_URI;
const connect = async() => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

connect();

// Server
const server = app.listen(port, host, () => {
    console.log(`Server is running on ${server.address().port}`);
});

// Routes
const EmployeeManagementRouter = require('./routers/EmployeeManagementRouter');
app.use('/employee', EmployeeManagementRouter);

const employeeRouter = require('./routers/EmployeeManagementRouter')
app.use ('/employee',employeeRouter)

const LeaveRouter = require('./routers/LeaveApprovalRouter')
app.use ('/leave',LeaveRouter)

const TaskAndProjectRouter = require('./routers/TaskAndProjectRouter');
app.use('/api', TaskAndProjectRouter);

const SystemMonitorRouter = require('./routers/SystemMonitorRouter');
app.use('/shift', SystemMonitorRouter);





// app.use('/api',router)
// app.use('/api',router)
// app.use('/api',router)