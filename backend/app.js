require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// My Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const ordertRoutes = require('./routes/order')

 
//TODO: DB connection
// ENV is used to save the data to show everyOne
mongoose.connect(process.env. DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
).then(() => {
    console.log("/nDB CONNECTED");
}).catch((err) => {
    console.log("/nDB CONNECTION ERRPR " + err)
})

//TODO: my middle ware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//TODO: Routes 
app.use('/api', authRoutes);
app.use('/api',userRoutes)
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", ordertRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("/nAPP IS RUNNING ON " + port);
})