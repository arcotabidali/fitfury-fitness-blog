const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-abid:Abidpass@cluster0.vlyam.mongodb.net/FitfuryDB', {useNewUrlParser: true, useUnifiedTopology: true});

const homeStartingContent = "We are going to update our website very soon.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const contentSchema = new Schema({}, { strict: false });
//    const Content = mongoose.model('Content', contentSchema);
  // const content  = new Content({ iAmNotInTheSchema: true });
  //  thing.save() // iAmNotInTheSchema is now saved to the db!!

  var Post = mongoose.model('Post', {
    title : String,
    intro : String,
    content:String
  });

  var Query = mongoose.model('Query', {
    name : String,
    email : String,
    message:String
  });






app.get("/",function(req,res){

Post.find(function(err,postsArr){
  if(err){console.log("no error encountered");}
  else{
    postsArr.forEach(function(post){

    })
   res.render("home",{startingContent : homeStartingContent, posts:postsArr});
    }
    })


});




app.get("/about",function(req,res){

res.render("about");

})



app.get("/contact",function(req,res){

res.render("contact");

})



app.post("/contact",function(req,res){

var form={
  name:req.body.name,
  email:req.body.email,
  message:req.body.message

}

const query = new Query(form);

query.save();
res.redirect("/");

})



app.get("/compose",function(req,res){

res.render("compose");

})

app.post("/compose",function(req,res){


  post1 = {
    title : req.body.postTitle,
    intro : req.body.postIntro,
    content : req.body.content
  }

const post = new Post(post1);
post.save()





res.redirect("/");
})



app.get("/deletePost",function(req,res){

res.render("delete");

})

app.post("/deletePost",function(req,res){



Post.deleteOne({title:req.body.postTitle},function(err){
  if(err){
    res.send(err);
  }
  else{
    res.redirect("/");
  }
})
})






app.get("/posts/:post", function(req,res) {
var postId = req.params.post;
var sendPost;
var postSent="false";
Post.find(function(err,postsArr){
  if(err){console.log("error encountered");}
  else{
    postsArr.forEach(function(post){

    if(postId==post.id){
       sendPost = post;
       postSent="true";
        res.render("post",{displayPost:sendPost});
    }

  });
}});

});


app.route("/compose/:articleTitle")
.delete(function(req,res){
  Post.deleteOne({title :req.params.articleTitle},function(err){
    if(!err){
      res.send("succesfully delete the article " + req.params.articleTitle);
    }
    else{
      res.send(err);
    }
  })
});

let port = process.env.PORT;
if(port == null || port ==""){
  port=3000;
}


app.listen(port, function() {
  console.log("Server started succesfully");
});
