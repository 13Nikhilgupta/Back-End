require("dotenv").config();
var express=require("express");
var bodyParser=require("body-parser");
var https=require("https");

var app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/" , (req,res)=>{

    var query=req.body.City;
    var unit="metric";
    var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+process.env.APP_ID+"&units="+unit;

    https.get(url,(response)=>{
        response.on("data",(data)=>{
            var weatherData=JSON.parse(data);
            var temp=weatherData.main.temp;
            var desc=weatherData.weather[0].description;
            var iconCode=weatherData.weather[0].icon;
            var imgUrl="https://openweathermap.org/img/wn/"+iconCode+"@2x.png"

            res.write("<h1>Current Temperature in "+ query +" is "+ temp +" degree Celsius </h1>");
            res.write("<p>and it's feel like <b>"+ desc +"</b> </p>");
            res.write("<img src="+imgUrl+">");

            res.send();
        });
    });
});

app.listen(3000,()=>{
    console.log("Server is running on Port 3000");
});