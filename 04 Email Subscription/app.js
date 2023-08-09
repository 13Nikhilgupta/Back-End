require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var https=require("https");

var app =express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/" , (req,res) =>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/" , function(req,res){
    const FName=req.body.FName;
    const LName=req.body.LName;
    const EMail=req.body.EMail;

    const Data={
        members:[{
            email_address:EMail,
            status: "subscribed",
            merge_fields: {
            FNAME: FName,
            LNAME: LName
            }          
        }]
    }

    const JSONData=JSON.stringify(Data);

    const url="https://us21.api.mailchimp.com/3.0/lists/"+process.env.AUDIENCE_ID;

    const options={
        method:'POST',
        auth:'Nikhil:'+process.env.API_KEY
    };

    const request = https.request(url, options, (response) => {

        if(response.statusCode===200)
        res.sendFile(__dirname+"/success.html");

        else
        res.sendFile(__dirname+"/failure.html");

      });
      
      // Write data to request body
      request.write(JSONData);
      request.end(); 
    
});

app.post("/failure" , function(req,res){
    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("server is running in Port 3000");
});