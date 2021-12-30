const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
const invRoute = require('./routes/inv');
const app = express();

const corsOption = {
    origin:[
        "http://localhost:3001"
    ],
    method:"GET,POST",
    allowHeaders:['Content-Type','Authorization']
}

app.use(cors(corsOption))
const dbUri = "mongodb+srv://IM_Admin:im_app_password@imapp.7ze5v.mongodb.net/im_app"
app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/inventory',invRoute)

mongoose.connect(dbUri,{useNewUrlParser:true})
const db = mongoose.connection

db.on("error",(err) => {console.log(err)});
db.on("open",() => {console.log('db connection success')});



app.listen(3000, () => {console.log("started:2400")})