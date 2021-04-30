const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const bcryptSalt = 10


router.post('/signup',async(req,res)=> {
    const {firstname,surname,email,confirmmail,password} = req.body

    if(!firstname|| !surname || !email ||!confirmmail || !password) {
        res.status(400).json({message:"Please provide credentials"})
        return
    }
    if(password.length<7){
        res.status(400).json({message:'Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.'});
        return;
    }
    if(email !== confirmmail) {
        res.status(400).json({message:'Email doesnt match'});
        return
    }

  
 
  
    
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!regex.test(password)) {
      res
        .status(500)
        .json({ message: 'Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.' });
      return;
    }

    try {
        const userFound = await User.findOne({email})
        if(userFound) {
            res.status(400).json({message: 'This email already exist'})
            return
        }
        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password,salt)
       
        const user = await User.create({firstname:firstname,surname:surname,email:email,confirmmail:confirmmail,password:hashPass})

        req.session.user = user
        res.status(200).json(user)

        return

    }
    catch(err){
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).json({ message: "Something went wrong"})
        }else if (error.code === 11000) {
            res.status(500).json({ message: "Something went wrong"}) 
        }
         else {
            next(error);
        }
    }
})

router.post('/login',async(req,res)=> {
    const {email,password} = req.body

    if(!email||!password) {
        res.status(400).json({message:'Please provide creditials'})
        return
    }
    try {
        const user = await User.findOne({email})
        if(user){
            const passwordCorrect = await bcrypt.compare(password,user.password)
            if(passwordCorrect) {
                req.session.user = user
                res.status(200).json(user)
            }
        } else {
            res.status(400).json({message:"Please provide the right creditials "})
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }
})

router.post('/logout',(req,res)=> {
    req.session.destroy()
    res.status(200).json({message:'User is logged out'})
})

router.get('/loggedin',(req,res)=> {
    if(req.session.user) {
        res.status(200).json(req.session.user)
    } else {
        res.status(400).json({message:'No user in session'})
    }
})

module.exports = router