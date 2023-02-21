const express = require('express')
const router = express.Router();

const {getUserById, getUserP,getUS, getAllUsers,updateUser, userPurchaseList} = require('../controllers/user')
const {isAuthenticated, isAdmin, isSignedIn} = require('../controllers/authentication')

router.param("userId",getUserById );

router.get("/user/:userId", isSignedIn, isAuthenticated ,(req, res)=>{
    req.profile.salt = undefined; // i do not want this result to show to user so I am just undefined it here. it will not effect to database
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(
        req.profile
    )
});  //TODO:  I have callback-funcation getUser()  in controller -> user.js // authentication part


router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.put("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);
router.get("/users",getAllUsers)

module.exports = router; 