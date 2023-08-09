import qr from 'qr-image';
import fs from 'fs';
import express from'express';
import bodyParser from 'body-parser';

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import path  from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const __dirname = path.resolve();

var app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/" , (req,res)=>{

    var url=req.body.url;
    var file_name=req.body.file_name;

    var qr_img = qr.image(url);
    qr_img.pipe(fs.createWriteStream(file_name+'.png'));

    fs.writeFile(file_name+'.txt', url, (err) => {
        if (err) throw err;
        //console.log('The file has been saved!');
      });

    res.write("<h1> The File has been saved at "+__dirname+" </h1>");
    res.write("<p>with name "+file_name+".png and "+file_name+".txt</p>")

    res.send();
});

app.listen(3000,()=>{
    console.log("Server is running on Port 3000");
});