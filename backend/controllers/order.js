const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB"
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB"
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req,res)=>{
    Order.find()
        .populate("user","_id name")
        .exec((err,ordersBack)=>{
            if(err){
                return res.status(400).json({
                    error:"No orderds found in DB"
                })
            }
            res.json(ordersBack);
        });
}


exports.getOrderStatus = (re,res)=>{

    res.json(Order.schema.path("status").enumValues)

}

exports.updateStatus = (re,res)=>{
    Order.updateOne( //update method
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"Cannot update order status"
                });
            }
            res.json(order);
        }
    )
}