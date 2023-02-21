const User = require('../models/user')  //TODO: User is same as we exported     mongoose.model("User", userSchema);
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const { expressjwt: jWt } = require("express-jwt");


exports.signin = (req, res) => {
    const {email,password} = req.body;

     const errors = validationResult(req);
 //   console.log("<p>SIGNIN<p>");
    if (!errors.isEmpty()) {
        return res.status(422).json(
            { errors: errors.array()[0].msg }  // in errors array everything is on 0 index
        )
    }

    //Mongoosh have findOne metod
    User.findOne({email},(err,user)=>{
        if(err || !user){ // we can divid this one condition in two for better error response
           return res.status(400).json({
                error: "User email does not exist"
            });
        }

        if(!user.authenticate(password)){
           return res.status(401).json({
                error: "Email and Password do not match"
            });
        }
        //create Token
        const token = jwt.sign({_id: user._id},process.env.SECRET)
        console.log("/nTOKEN"+token);

        //put token in cookies
        res.cookie("token",token,{expire: new Date()+9999});

        //send response to front end
        const {_id,name,email,role} = user;
        return res.json({token,user:{_id,name,email,role}})
    })

}


exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(
            { errors: errors.array()[0].msg }  // in errors array everything is on 0 index
        )
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            console.log("---->" + err);
            return res.status(400).json({
                err: 'NOT able to save user in DB'
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
}

exports.signout = (req, res) => {
    //clear the cookoe

    res.clearCookie('token');
    res.json({
        message: "User signout successfully"
    });
}

// protected routes
exports.isSignedIn = jWt({
    secret: process.env.SECRET,
   algorithms:['HS256'],   //['sha1', 'RS256', 'HS256'],
    userProperty: "auth"
});

//custom middle wares
exports.isAuthenticated = (req,res,next) =>{
    // req.profile wil be set from fronted as it has a id or email or anything
    // req.auth :- top middleware
    // req.profile._id :- from frontend
    // req.auth._id from above Middleware 
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    console.log("----->Out")
    if(!checker){
        console.log("--->in")
        return res.status(403).json({
            error: 'ACCESS DENIED'
        })
    }
    next();
}

//  for admin
exports.isAdmin = (req,res,next) =>{
    if(req.profile.role==0){  // if your role is 0 then u r admin
        return res.status(403).json({
            error: "YOU ARE NOT ADMIN, ACCESS DENIED"
        })
    }
    next();
}