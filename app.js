const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var connectionUrl=MongoUrl;
mongoose.connect(connectionUrl,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(function(){
    console.log('database connected...')
});

app.use('/', require('./routes/index.js'));
app.use('/user', require('./routes/user.js'));

app.listen(3000);