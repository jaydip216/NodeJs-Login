const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const User=require('../models/users')
const crypto=require('crypto')
const key='password';
const algo='aes256';

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));


router.post('/login',function(req,res){

    let errors=[];
    User.findOne({email:req.body.email}).then(function(data){
        var decipher=crypto.createDecipher(algo,key);
        var decrypted=decipher.update(data.password,'hex','utf8')+
        decipher.final('utf8');
        if(decrypted==req.body.password){
            res.render('dashboard',{name:data.username});
        }
        else{
            errors.push({msg:"Invalid Credentials"});
            res.render('login',{errors});
        }
    }).catch((err)=>{
        errors.push({msg:"Invalid Credatials"});
        res.render('login',{errors});
    })
});

router.post('/register',function(req,res){

    const { name, email, password} = req.body;

    let errors = [];

    if (!name || !email || !password ) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email
        });
    }
    else{
        var cipher=crypto.createCipher(algo,key);
        var encrypted=cipher.update(req.body.password,'utf8','hex')
        +cipher.final('hex');
        
        var mail=req.body.email;
        User.findOne({email:mail}).then(function(result){
            if(result != null){
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                errors,
                name,
                email,
                password
                });
                //console.log(result.email);
            }
            else{
                var data=new User({
                    _id:mongoose.Types.ObjectId(),
                    email:req.body.email,
                    username:req.body.name,
                    password:encrypted
                });
    
                data.save().then(function(result){
                    res.status(201);
                    console.log("Registered");
                    res.redirect('/user/login');
                }).catch(function(err){
                    console.log(err);
                })
            }
        }).catch(function(err){
            console.log(err);
        })
    }
});

module.exports=router;