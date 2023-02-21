const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        // required:true,
        maxlength: 32,
        trim: 32
    },
    userinfo: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    encry_password: {
        type: String,
        required: true

    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, { timestamps: true })

//TODO: virtual schema

userSchema.virtual('password')
    .set(function (password) {
        this._password = password;   // _ for private
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password)
    })
    .get(function () {
        return this._password;
    })

//TODO: Methods in schema

userSchema.methods = {
    authenticate: function (plainPassword) {
        console.log(plainPassword+"----------")
        return this.securePassword(plainPassword) === this.encry_password;
    },
    securePassword: function (plainPassword) {
        console.log("PASSOWRD"+plainPassword)
        if (!plainPassword) {
            return "";
        }
        try {
            console.log("--->Chintan");
            return crypto.createHmac('sha256', this.salt).update(plainPassword).digest('hex');
        } catch (err) {
            console.log("-----ERROR---->"+err);
            return err;
        }
    }
}


// userSchema.methods = {
//   autheticate: function(plainpassword) {
//     return this.securePassword(plainpassword) === this.encry_password;
//   },

//   securePassword: function(plainpassword) {
//     if (!plainpassword) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(plainpassword)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   }
// };


module.exports = mongoose.model("User", userSchema);