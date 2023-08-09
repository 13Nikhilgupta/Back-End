var express = require("express");
var bodyParser = require("body-parser");

var app =express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , (req,res) =>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/", (req,res)=>{
    var num1=Number(req.body.n1);
    var num2=Number(req.body.n2);

    var result=num1+num2;

    res.send("Sum of "+num1+" and "+num2+" is "+result);
});

app.get("/bmi-calculator" , (req,res) =>{
    res.sendFile(__dirname+"/bmi-Calculator.html");
});

app.post("/bmi-calculator", (req,res)=>{
    var H=Number(req.body.h);
    var W=Number(req.body.w);

    var bmi=W/(H*H);

    res.send("Your BMI is "+bmi);
});

app.listen(3000,()=>{
    console.log("server is running in Port 3000");
});