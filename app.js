const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controllers/controller');

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.get('/users', (req, res) =>{
    controller.getUsers(req, res, next => {
        res.send(users);
    });
});

app.post('/adduser', (req, res) =>{
    controller.addUser(req.body, (callback) => {
        res.send();
    });
});

app.put('/updateuser', (req, res) =>{
    controller.updateUser(req.body, (callback) => {
        res.send(callback);
    });
});

app.delete('/deleteuser', (req, res) =>{
    controller.updateUser(req.body, (callback) => {
        res.send(callback);
    });
});

module.exports = app;