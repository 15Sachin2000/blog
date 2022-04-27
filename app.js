const express=require('express');
const app=express();
const bp=require('body-parser');
const _=require('lodash');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/blog');
const schme=new mongoose.Schema({
    title:String,
    post:String
});
const h=mongoose.model('homedb',schme);
// const ab=mongoose.model('aboutdb',schme);
// const con=mongoose.model('contactdb',schme);
//const p=[];
app.use(bp.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));
var home="In today’s world the industry offers a wide range of problems/challenges for research and role of a researcher is to find the solution of those problems and create a new knowledge. Hence, industry – academia interface is the key to foster research in areas which otherwise are not known to researchers";
var about="Summer School In Geospatial Science and Technology (23 May to 12 June, 2022) at Department of Information Technology, IIIT Allahabad Mode of conduct: Offline (According to the situation of Pandemic the mode of conducting the program will be changed to ONLINE) ";
var contact="Workshop on Advancement in Blockchain Technology Jointly organized by C3I Center, IIT Kanpur & NSC Lab, IIIT Allahabad Along with National Blockchain Project";
app.get('/',function(req,res){
    console.log(req.body);
   h.find(function(err,result){
       if(err)
       console.log(err);
       else
       res.render('home',{data:home,log:result});
   })
  //  res.render('home',{data:home,log:p});
});
app.get('/about',function(req,res){
    res.render('about',{data:about});
});
app.get('/contact',function(req,res){
    res.render('contact',{data:contact});
});
app.get('/compose',function(req,res){
    res.render('compose');
});
app.post('/compose',function(req,res){
   // console.log(req.body);
   const q3=new h({
       title:req.body.title,
       post:req.body.post
   });
   q3.save();
   // p.push({title:req.body.title, post:req.body.post});
   // console.log(p);
    res.redirect('/');
});
app.get('/post/:abc',function(req,res){
    var c=0;
    const we=_.lowerCase(req.params.abc);
    h.find(function(err,result){
        if(err)
        console.log(err);
        else{
            result.forEach(function(a){
                var re=_.lowerCase(a.title);
                if(re==we)
                {
                    res.render('post',{tq:a.title,pq:a.post});
                    c=1;
                }
            });
        }
    });
    // p.forEach(function(a){
    //     var re=_.lowerCase(a.title);
    //     if(re==we)
    //     {
    //         res.render('post',{tq:a.title,pq:a.post});
    //         c=1;
    //     }
    // });
    if(c==0)
    console.log("Not found");
})
app.listen(3000,function(){
    console.log('app is listening at port 3000');
})