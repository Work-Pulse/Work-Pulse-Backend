//Import Dependencies
require('dotenv').config();
require('punycode');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030;
const host = '127.0.0.1';
const mongoose = require('mongoose');



const verifyToken = require('./middlewares/authMiddleware'); 

// Use Dependencies
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','DELETE','PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
  }));
app.use(express.json());

//Database Connection
const uri = 'mongodb+srv://Yasiru:ynb89@cluster0.bg2dx4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connect = async() => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

connect();

//Server 
const server = app.listen(port, host, () => {
    console.log(`Server is running on ${server.address().port}`);
});

// Routes
const employeeRouter = require('./routers/EmployeeManagementRouter')
app.use ('/employee',employeeRouter)

const LeaveRouter = require('./routers/LeaveApprovalRouter')
app.use ('/leave',LeaveRouter)

const TaskAndProjectRouter = require('./routers/TaskAndProjectRouter');
app.use('/api', TaskAndProjectRouter);

const SystemMonitorRouter = require('./routers/SystemMonitorRouter');
app.use('/shift', SystemMonitorRouter);

const chatRouter = require('./routers/ChatRouter');
app.use('/chat', chatRouter);
