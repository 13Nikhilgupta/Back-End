require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const day = require(__dirname+'/date.js');
const app =express();
const mongoose = require('mongoose');
const _ = require('lodash');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL);  //'mongodb://127.0.0.1:27017/Checklist'

itemSchema={ content: String };
const Item = mongoose.model('item', itemSchema);

listSchema={name:String, list:[itemSchema]};
const List = mongoose.model('list', listSchema);

const item1 = new Item({content:'Welcome to My ToDoList'});
const item2 = new Item({content:'Click on + to add new Item'});
const item3 = new Item({content:'Click on Checkbox to Delete Items'});
const defaultItem = [item1, item2, item3];

app.get("/" , async(req,res) =>{
    
    var today=day.day();
    foundItem=await Item.find({});

    if(foundItem.length===0){
        Item.insertMany(defaultItem);
        res.redirect("/");
    }
    else{
        res.render("index",{heading:today, list:foundItem});
    }
});

app.get("/about" , (req,res) =>{
    
    res.render("about");
});

app.get("/:listName", async function(req,res){
    let listName=_.capitalize(req.params.listName);
    foundList=await List.findOne({name:listName});
    
    if(foundList){
        res.render("index",{heading:foundList.name, list:foundList.list});
    }
    else{
        const list = new List({name:listName,list:defaultItem});
        list.save();
        res.redirect("/"+listName);
    }
});

app.post("/", async (req,res)=>{
    const item = new Item({content:req.body.newitem});
    
    if(req.body.button===day.day()){
        item.save();
        res.redirect("/");
    }
    else{
        foundList=await List.findOne({name:req.body.button});
        foundList.list.push(item);
        foundList.save();
        res.redirect("/"+req.body.button);
    }
});

app.post("/delete", async function(req,res){

    if(req.body.listName === day.day()){
        await Item.findByIdAndRemove(req.body.checkbox);
        res.redirect("/");
    }
    else{
        await List.findOneAndUpdate({name:req.body.listName},{$pull:{list:{_id:req.body.checkbox}}});
        res.redirect("/"+req.body.listName);
    }
})

app.listen(3000,()=>{
    console.log("server is running in Port 3000");
});