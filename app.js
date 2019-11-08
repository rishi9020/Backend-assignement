//-----------Importing 'express' module--------------
const express = require('express');
const app = express();

//-----------Importing custom validation module--------------
const validateInput = require('./validation');

//----------Importing "control.js" file which has a function named "calculation"----------
const calculatePaySlip = require('./control');

//----------Middleware for parsing incoming request with JSON payload-------
app.use(express.json());

//----------Middleware for validating the input----------
app.use(validateInput);

//----------Route----------
app.post('/payslip', calculatePaySlip);

//--------------Server is running on port 6000-------------------------
app.listen(4000, () => console.log(`Listening to port 4000.........`))