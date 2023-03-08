const mongoose=require('mongoose');
const mongoUri='mongodb+srv://Niketan:pass123@cluster0.3cv8tnw.mongodb.net/?retryWrites=true&w=majority';
// const mongoUri='mongodb://localhost:27017'
const connectToMongo=()=>{
    console.log("hi");
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
}
module.exports =connectToMongo;