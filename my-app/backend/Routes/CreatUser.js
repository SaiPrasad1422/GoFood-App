const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // ✅ Import bcrypt for password hashing
const { body, validationResult } = require('express-validator');
 const jwt=require('jsonwebtoken')  
 const jwtSecret="lnfkjqlojhuia" 
router.post("/creatuser",[
      // username must be an email
      body('email').isEmail(),
      // password must be at least 5 chars long
      body('name').isLength({min:5}),
      body('password').isLength({ min: 5 }),
      
    ], async (req, res) => {
      const salt=await bcrypt.genSalt(10)
      let secpassword=await bcrypt.hash(req.body.password,salt)
    try {
        // Hash the password before storing
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

        // Create new user
        await User.create({
           name:req.body.name,
           password:secpassword,
           email:req.body.email,
           location:req.body.location
        });

        res.json({ success: true}); // ✅ Send a response

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false }); // ✅ Send error response
    }
});


router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
  ], async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Try logging with correct credentials" });
      }
  
      // Compare hashed password
      const passwordcompare=await  bcrypt.compare(req.body.password,userData.password)
      if (!passwordcompare) {
        return res.status(400).json({ errors: "Try logging with correct credentials" });
      }
      const data={
        user:{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret)
      return res.json({ success: true, authToken:authToken });
  
      
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
  module.exports=router