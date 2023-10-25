const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = require('../models/login')

const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const Signup = async (req,res) => {
    try {
        const { username, email, password } = req.body
        const hash = await bcrypt.hash(password, 10)
        const NewUser = new login({ username, email, password: hash })
        await NewUser.save();
        res.status(201).json(NewUser);
    } catch (error) {
       res.status(500).json({ error: error.message })

    }
}

const LoginUser =async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user =await login.findOne({email}) //const user has the whole object containing email and password
        if(user && await bcrypt.compare(password,user.password))
        {
            const token = jwt.sign({userId: user.id},"thisIsAScretKeyWord",{expiresIn: "1 minute"})
            res.status(200).json({token})
        }
        else
        {
            res.status(401).json({error: "Invalid credentials"})
        }

    }
    catch(error)
    {
        res.status(500).json({error: error.message})
    }
}

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await login.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();
       url='http://localhost:3500/login'
        const resetLink = `${url}/reset-password/${resetToken}`;
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Link",
            text: `Click on the following link to reset your password: ${resetLink}`,
        };
       
        await transporter.sendMail(mailOptions);
       
        res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const resetToken = req.params.token;

        const user = await login.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired reset token" });
        }

        // Update user's password and reset token fields
        const hash = await bcrypt.hash(password, 10);
        user.password = hash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    Signup,
    LoginUser,
    forgotPassword,
    resetPassword,
}
