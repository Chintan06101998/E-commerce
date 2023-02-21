const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const { signout, signup, signin,isSignedIn } = require('../controllers/authentication')

router.post('/signin', [
    check('email', 'email is required').isEmail(),
    check('password', 'password should be atleast 2 char').isLength({ min: 3 }),
], signin)

router.post('/signup', [
    check('name', 'name should be atleast 3 character').isLength({ min: 3 }),
    check('email', 'email is required').isEmail(),
    check('password', 'password should be atleast 2 char').isLength({ min: 3 }),
], signup) //TODO: we put validation after the ROUTE and before the array like as a middleware

router.get('/signout', signout)

router.get('/testAuth', isSignedIn, (req,res)=>{
  //  res.send("A Projected Route")
  res.json(req.auth)
})

module.exports = router;