const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");
const { sortBy } = require("lodash");
const category = require("../models/category");

exports.getProdctById = (req,res,next,id)=>{
    console.log("\nGetProdyctByID ENter\n")
    Product.findById(id)
    .populate("category")   // populated based on category
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        req.product = product;
        console.log("--->"+id);
        next();
    });
}


// TODO: Adding photos
// exports.createProduct = (req,res)=>{
//     console.log("\create Product \n")
//     // 
//     let form = new formidable.IncomingForm();
//     form.keepExtension = true;  //for extension, jpg,png, etc

//     //parse have three parameter Error, fields and files
//     form.parse(req, (err,fields,file)=>{
//         if(err){
//             return res.status(400).json({
//                 error:"Problem with Images"
//             })
//         }

//         //destructure the fields
//         //something like  fields.name, fields.size
//         const {price,description,name,category,stock,} = fields

//         // adding extra layer
//         if(
//             !name ||
//             !description ||
//             !price ||
//             !category ||
//             !stock
//         ){
//             res.status(400).json({
//                 error:"Please include all fields"
//             });
//         }


//         // Restriction on field
//         let product = new Product(fields)


//         // handle the file here
//         if(file.photo)  { //if we have photo in model then good idea to have
//             if(file.photo.size >3000000)  {   // >3 MB
//                 return res.status(400).json({
//                     error:"File size is too big"
//                 })
//             }

//             product.photo.data = fs.readFileSync(file.photo.filepath) ;  // to save the photos    
//             product.photo.contentType = file.photo.mimetype;
//         }       

//         product.save((err,product)=>{
//             if(err){
//                 res.status(400).json({
//                     error:"Saving t-shirt in Database is failed"
//                 })
//             }
//             res.json(product);
//         })

//         //handle the file
//       //  if(file.photos)
//     })

// }

// exports.createProduct = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "problem with image"
//       });
//     }
//     //destructure the fields
//     const { name, description, price, category, stock } = fields;

//     if (!name || !description || !price || !category || !stock) {
//       return res.status(400).json({
//         error: "Please include all fields"
//       });
//     }

//     let product = new Product(fields);

//     //handle file here
//     if (file.photo) {
//       if (file.photo.size > 3000000) {
//         return res.status(400).json({
//           error: "File size too big!"
//         });
//       }
//       product.photo.data = fs.readFileSync(file.photo.filepath);
//       product.photo.contentType = file.photo.mimetype;
//     }

//     console.log(product);
//     //save to the DB
//     product.save((err, product) => {
//       if (err) {
//         res.status(400).json({
//           error: "Saving tshirt in DB failed"
//         });
//       }
//       res.json(product);
//     });
//   });
// };

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req,res)=>{

  req.product.photo = undefined;

  return res.json(req.product)
}

exports.photo = (req,res,next)=>{

  if(req.product.photo.data){
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data)
  }
  next();
}

// delete controller
exports.deleteProduct = (req,res)=>{

  let product = req.product;
  product.remove((err,deletedProduct)=>{
    if(err){
      return res.status(400).json({
        error:"Failed to delete the product"
      })
    }
    res.json({
      message: "Deletion was a successful"
    })
  })

}

//update controller
exports.updateProduct = (req,res)=>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //updatation code
    // we need product whcih we get from request
    let product = req.product;
    product= _.extend(product,fields)

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updatation of T-shirt in DB failed"
        });
      }
      res.json(product);
    });
  });
}

//listening product
exports.getAllProducts = (req,res)=>{
  let limit = req.query.limit ? parseInt(req.query.limit) : 6 ;
  let sortBy =  req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
   .select("-photo")
   .populate("category")
   .sort([sortBy, "asc"])
   .limit(limit)
   .exec((err,products)=>{
    if(err){
      return res.status(400).json({
        error:"No Product Founds"
      })
    }
    res.json(products)
   })
}


exports.getAllUniqueCategories = (req,res)=>{
  Product.distinct("category",{},(err,category)=>{
    if(err){
      return res.status(400).json({
        error:"No Category Found"
      })
    }
  })
}


// use mongoose method to update stock
exports.updateStocks = (req,res)=>{
  let myoperations = req.body.order.products.map(prod=>{
    return {
      updateOne: {
        filter: { _id: prod._id},
        update:{$inc:{stock: -prod.count,sold: +prod.count}}
      }
    }
  })

  Product.bulkWrite(myoperations,{},(err,products)=>{
    if(err){
      return res.status(400).json({
        error:"Bulk Opetation Failed"
      })
    }
    next();
  })
}