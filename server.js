//Import Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030;
const host = '127.0.0.1';
const mongoose = require('mongoose');
const router = require('./routers/testRouter');

//Use Dependecies
app.use(cors());
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

const PostRouter = require('./routers/PostRoutes');
const employeeRouter = require('./routers/EmployeeManagementRouter')
app.use ('/employee',employeeRouter)

app.use('/api',router)

app.use('/post',PostRouter);

// app.use('/api',router)
// app.use('/api',router)
// app.use('/api',router)