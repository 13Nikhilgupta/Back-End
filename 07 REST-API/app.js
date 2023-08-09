require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URL); //"mongodb://127.0.0.1:27017/API-DB"

app.use(bodyParser.urlencoded({extended: true}));

articleSchema={
    title:String,
    content:String
  };
  const Article=mongoose.model('article', articleSchema);

app.route("/article")

.get(async function(req,res){
  const articles= await Article.find({});
  res.send(articles);
})

.post(function(req,res){
  const article = new Article({
    title:req.body.title,
    content:req.body.content
  });
  article.save().then(res.send("An Article Successfully Posted"));
})

.delete(async function(req,res){
  await Article.deleteMany({}).then(res.send("All Articles Deleted"));
});

app.route("/article/:articleTitle")

.get(async function(req,res){
  const article= await Article.findOne({title:req.params.articleTitle});
  if(!article){
    res.send("There is no such Article");
  }
  else{
    res.send(article);
  }
})

.put(async function(req,res){
  const replacedArticle=await Article.replaceOne(
    {title:req.params.articleTitle},
    {title:req.body.title,content:req.body.content});
    if(replacedArticle.modifiedCount === 0){
      res.send("There is no such Article");
    }
    else{
      res.send("A Specified Article Replaced");
    }
})

.patch(async function(req,res){
  const updatedArticle=await Article.updateOne({title:req.params.articleTitle},req.body);
  if(updatedArticle.modifiedCount === 0){
    res.send("There is no such Article");
  }
  else{
    res.send("A Specified Article Updated");
  }
})

.delete(async function(req,res){
  const deletedArticle=await Article.deleteOne({title:req.params.articleTitle});
  if(deletedArticle.deletedCount === 0){
    res.send("There is no such Article");
  }
  else{
    res.send("Desired Article Deleted");
  }
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });