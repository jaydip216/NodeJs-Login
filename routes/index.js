const express=require('express')
const router=express.Router();

router.get('/',function(req,res){
    res.render('index');
});

router.get('/dashboard',function(req,res){
    res.render('dashboard',{name:req.username})
})

module.exports=router;
