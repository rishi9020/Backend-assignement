function calculatePaySlip(req, res) {

    //-------------Getting user information from the body------------------
    var userInfo = {
        firstName: req.body["first-name"],
        lastName: req.body["last-name"],
        annualSalary: req.body["annual-salary"],
        superRate: req.body["super-rate"],
        paymentStartDate: req.body["payment-start-date"]
    }

    //-------------Concating first name and last name using Template(back-tick)--------------
    var name = `${userInfo.firstName} ${userInfo.lastName}`

    //-------------Calculating gross income and using Math.round() to roundoff the calculated result----------
    var grossIncome = Math.round(userInfo.annualSalary / 12);

    //-------------Calculating income tax----------------------------
    if (userInfo.annualSalary >= 0 && userInfo.annualSalary <= 18200)
        var incomeTax = 0;
    else if (userInfo.annualSalary >= 18201 && userInfo.annualSalary <= 37000)
        var incomeTax = 0.19 * (userInfo.annualSalary - 18200);
    else if (userInfo.annualSalary >= 37001 && userInfo.annualSalary <= 87000)
        var incomeTax = 3572 + 0.325 * (userInfo.annualSalary - 37000);
    else if (userInfo.annualSalary >= 87001 && userInfo.annualSalary <= 180000)
        var incomeTax = 19822 + 0.37 * (userInfo.annualSalary - 87000);
    else
        var incomeTax = 54232 + 0.45 * (userInfo.annualSalary - 180000);
    var monthTax = Math.round(incomeTax / 12);

    //--------------Calculating net income---------------------------
    var netIncome = Math.round(grossIncome - monthTax);

    //--------------Calculating  super ammount--------------------------
    var _super = Math.round(grossIncome * userInfo.superRate / 100);

    //--------------Printing the output-------------------------------
    res.send(`name, pay-period, gross-income, incometax, net-income, super-ammount\n${name}, ${userInfo.paymentStartDate}, ${grossIncome}, ${monthTax}, ${netIncome}, ${_super}`)
}

module.exports = calculatePaySlip;