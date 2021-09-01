const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URL || "mongodb://localhost:27017/blogFrom", {
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then (()=>{
    console.log("connection successful ");
}).catch ((error)=>{
    console.log(error);
});