const Mongo= require("../models/user")
const createdata=async(req , res)=> {
    try {
        const {name, email, password, phoneNumber, age, cnic,programingLang}=req.body
        console.log(programingLang)
        const todo= new Mongo({
            name,
            email,password,phoneNumber,age,cnic,programingLang
          //  programingLang:req.body.programingLang

        })

        await todo.save()
        res.json(todo)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getAlldata=async(req,res)=> {
    try{
    const getmongo = await Mongo.find()
    res.json(getmongo)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


const getById=async(req , res)=> {
    try{
    let dataAgainstId = await Mongo.findById(req.params.id)
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json(dataAgainstId)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getByName=async(req , res)=> {
    try{
        const name = req.params.name;
    let dataAgainstId = await Mongo.find({name:name})
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json(dataAgainstId)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getByPhoneNumber = async (req, res) => {
    try {
        const phoneNumber = req.params.phoneNumber;
        const user = await Mongo.findOne({ phoneNumber: phoneNumber });

        if (!user) {
            return res.status(404).json({ message: "DATA NOT FOUND" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getByCnic = async (req, res) => {
    try {
        const cnic = req.params.cnic;
        const user = await Mongo.findOne({ cnic: cnic });

        if (!user) {
            return res.status(404).json({ message: "DATA NOT FOUND" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsersByAge = async (req, res) => {
    try {
        const users = await Mongo.find({ age: { $lt: 55, $gt: 30 }});

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with age less than 40 and greater than 55." });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteById=async(req , res)=> {
    try{
    let dataAgainstId = await Mongo.findByIdAndDelete(req.params.id)
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json({message:"delete successful"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const updateById=async(req , res)=> {
    try{
        const {name, email, password,phoneNumber, age, cnic}=req.body;
    let dataAgainstId = await Mongo.findByIdAndUpdate(req.params.id,{name,email,password,phoneNumber, age, cnic},{new:true})
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json(dataAgainstId)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
module.exports={
    createdata,
    getAlldata,
    getById,
    getByName,
    getByPhoneNumber,
    getByCnic,
    getUsersByAge,
    deleteById,
    updateById

}