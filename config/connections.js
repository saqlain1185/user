const mongoose=require('mongoose');
const Url='mongodb+srv://umernawaz2000:Mumer2311@cluster0.7rovi9x.mongodb.net/';
mongoose.connect(Url,{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>
{
    console.log("db connected ")
})

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection failed"))

module.exports=mongoose;