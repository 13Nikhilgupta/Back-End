require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to My Daily Journal! Here, I invite you to embark on a captivating journey through the corridors of my mind and heart. Within these digital pages, you'll discover a tapestry of my thoughts, dreams, and reflections, woven together with the threads of everyday life. It is here that I find solace in the written word, transforming the ordinary into the extraordinary. From the simplest joys to the deepest ponderings, I aim to capture the essence of each passing day and share it with you. Together, let us delve into the depths of introspection, celebrate the beauty of self-discovery, and find inspiration in the shared human experience. So come, wander through the realms of my daily journal, and may it ignite a spark within you to embark on your own personal odyssey of growth and expression.";
const aboutContent = "Greetings, dear reader! My name is Nikhil Gupta, and I am the curator of this personal daily journal. I believe that life is an extraordinary tapestry of moments, and this space serves as a canvas where I paint my experiences, thoughts, and emotions. With a curious mind and a passion for self-discovery, I embark on a continuous journey of growth and introspection. Through the written word, I find solace, clarity, and a profound connection with myself and the world around me. Join me as I navigate the twists and turns of life, celebrating triumphs, reflecting on challenges, and uncovering the profound beauty in the everyday. Together, let's embrace the power of self-expression and uncover the profound wisdom that lies within. Welcome to my daily journal, where our paths intertwine and stories unfold.";
const contactContent = "Thank you for visiting my Daily Journal website! I would be delighted to hear from you and engage in meaningful conversations. Whether you have questions, feedback, or simply want to connect, please don't hesitate to reach out. I value your thoughts and suggestions, as they inspire and shape the future of this journal. You can reach me by filling out the contact form below or by sending an email to [email protected] I'll do my best to respond promptly. Let's embark on this journey together and create a space where our stories intertwine. I look forward to connecting with you soon!";

const app = express();

mongoose.connect(process.env.MONGO_URL);   //"mongodb://127.0.0.1:27017/blogDB"

postSchema={
  postTitle:String,
  postContent:String
};
const Post=mongoose.model('post', postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , async function(req,res) {
  const posts=await Post.find({});
  res.render("home", {startingContent:homeStartingContent, newPost:posts});
});

app.get("/contact" , function (req,res) {
  res.render("contact", {contact:contactContent});
});

app.get("/about" , function (req,res) {
  res.render("about", {about:aboutContent});
});

app.get("/compose" , function (req,res) {
  res.render("compose");
});

app.post("/compose" , function (req,res) {
  const post=new Post({
    postTitle:req.body.postTitle,
    postContent:req.body.postContent
  });
  post.save();
  res.redirect("/");
});

app.get("/post/:_id" , async function (req,res) {
  let requestedPost=req.params._id;

  const post = await Post.findOne({_id:requestedPost});
  res.render("post",{post:post});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});