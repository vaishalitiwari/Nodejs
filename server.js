const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app=express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('screamit',(text)=>{
  return text.toUpperCase();
})
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'My Page',
    welcomeMsg:'Welcome to my website'
  })
});

app.get('/about',(req,res)=>{
  //res.send('About page');
  res.render('about.hbs',{
    pageTitle:'My Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    message:"Error handling request"
  })
})

app.listen(3000,()=>{
  console.log('Server is up and running at port 3000')
});