const {Router} =require('express');
const bodyParser=require('body-parser');
const User=require('./../../models/users');
const router = Router();

router.get('/login',(req,res)=>{
    res.send('User login page');
})

router.get('/signup',(req,res)=>{
    res.send('User Signup page');
})

router.get('/logout',(req,res)=>{
    res.send('User Logout page');
})

router.post('/signup',(req,res)=>{
    const obj=req.body;
   User.create(obj)
   .then(user=>{
        console.log('User created Successfully');
   })
   .catch(err=>{
    console.log('Error while creating user');
   });
    
})

router.post('/login',(req,res)=>{
    const {email,password} =req.body;
    User.findOne({email})
    .then(user=>{
        if(!user){
            return res.status(400).send('User not found');
        }
        else if(user.password != password){
            return res.status(400).send('Incorrect password');
        }
        else{
            return res.status(200).send('Login Successfull');
        }
    })
    .catch((err)=>{
        res.send(400).send('Error while logging in');
    })
});
module.exports = router;