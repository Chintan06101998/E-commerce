const User = require('../models/user');
const Order = require('../models/order');
const { use } = require('../routes/auth');

exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{ //  whenever we work with database they give us 2 object: ERR and USER
        if(err || !user){
            return res.status(403).json({
                error: 'No user was found in DB'
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUserP = (req,res)=> {
    // TODO: get here for password
    return res.json(req.profile)
}

exports.getAllUsers = (req,res)=>{
    try {
            const allUser = User.find({}).exec((err,users)=>{
                if(err || !users){
            return res.status(403).json({
                error: 'No user was found in DB'
            })
        }
        console.log(users.profile)
        return res.json(users) 
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

// TODO: Populate
exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account"
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

  //store thi in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list"
        });
      }
      next();
    }
  );
};