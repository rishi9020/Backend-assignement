//----------------Importing joi module------------------
const Joi = require('joi');

//-------------------Function performing validation of input--------------------
function valid(req, res, next) {

    //--------------Defining a sample schema--------------------------------
    const schema = {
        "first-name": Joi.string().min(2).regex(/^[A-Za-z]+$/).required(),
        "last-name": Joi.string().min(2).regex(/^[A-Za-z]+$/).required(),
        "annual-salary": Joi.number().required(),
        "super-rate": Joi.number().min(0).max(12).required(),
        "payment-start-date": Joi.string().required().regex(/^01/)
    }

    //---------------validating the input parameters------------------
    const result = Joi.validate(req.body, schema);
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const Days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const month = req.body["payment-start-date"].split(' ')[4];
    
    if (req.body["payment-start-date"].split(' ')[1] == req.body["payment-start-date"].split(' ')[4]) {
        const date = req.body["payment-start-date"].split(' ')[3];

        let index_month = monthArray.indexOf(month);
        if (index_month == -1) {
            res.send("Invalid month");
            return;
        }
        else if (date != Days[index_month]) {
            if (month == 'February' && date == 28) {
                next()
            }
            else {
                res.send("Enter valid date")
                return;
            }
        }
        else if (result.error != null) {
            res.status(400).send(result.error.details[0].message);
            return;
        }
        next();
    }
    else {
        res.send('Enter same months');
        return;
    }
}

//----------------exporting the function----------------
module.exports = valid;