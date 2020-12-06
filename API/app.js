// import express framwork (is also module)
const express = require("express");
const app = express(); 
var jwt = require('jwt-simple');


//VerifyToken
const VerifyToken = (request, response,next) => {
    if (!request.headers.authorization) {
        const error = new Error('You are not autorized, no token exist ');
        error.status = 401;
        return next(error);
    }else {
        return next()
    }
}

// middleware
app.use(express.json()); // for json data form
app.use(express.urlencoded({ extended: false })); // for x-www-form-urlencoded data form

var cors = require('cors')
app.use(cors())

//Définition des CORS
/*app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/

//import the routes of authentification
const auth = require('./routers/authentification');

//import the routes of profil
const profil = require('./routers/profil');

//import the routes of spaces
const spaces = require('./routers/to-do-task-space');

//import the routes of shared spaces
const sharedspaces = require('./routers/to-do-shared-space');

//import the routes of tasks
const tasks = require('./routers/to-do-task');

//import the routes of logout
const logout = require('./routers/logout');

//if we have /todo/auth+(/*)* in our URL we redirect it to  api authentification
app.use('/todo/auth', auth);

//if we have /todoprofile+(/*)* in our URL we redirect it to  api profile route
app.use('/todo/profil', VerifyToken, profil);

//if we have /spaces+(/*)* in our URL we redirect it to  api spaces route
app.use('/todo/spaces', VerifyToken, spaces);

//if we have /sharedspaces+(/*)* in our URL we redirect it to  api spaces route
app.use('/todo/sharedspaces', VerifyToken, sharedspaces);

//if we have /tasks+(/*)* in our URL we redirect it to  api tasks route
app.use('/todo/tasks', VerifyToken, tasks);

//if we have /logout+(/*)* in our URL we redirect it to  api logout route
app.use('/todo/logout', VerifyToken, logout);

/****   the cas for error link begin ******/ 
//creat error message 
app.use((req,res,next)=>{
    const error = new Error('The page not found');
    error.status = 404;
    next(error);
});

// use the error
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message,
        }
    });
});
/****   the cas for error link end ******/ 


//return module app
module.exports = app ;