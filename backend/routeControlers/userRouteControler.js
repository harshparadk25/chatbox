import User from "../Models/userModels.js";
import bcryptjs from 'bcryptjs'
import jwtToken from '../utils/jwtWebToken.js'

export const userRegister = async (req, res) => {
    try {
        const { fullname, username, email, gender, password, pic, language } = req.body;
        console.log(req.body);
        const user = await User.findOne({ username, email });
        if (user) return res.status(500).send({ success: false, message: " UserName or Email Already Exist " });
        const hashPassword = bcryptjs.hashSync(password, 10);
        const profileBoy = pic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileGirl = pic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            language,
            pic: gender === "male" ? profileBoy : profileGirl
        })

        if (newUser) {
            await newUser.save();
            jwtToken(newUser._id, res)
        } else {
            res.status(500).send({ success: false, message: "Inavlid User Data" })
        }

        res.status(201).send({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            pic: newUser.pic,
            email: newUser.email,
            languages: newUser.languages,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(500).send({ success: false, message: "Email Dosen't Exist Register" })
        const comparePas = bcryptjs.compareSync(password, user.password || "");
        if (!comparePas) return res.status(500).send({ success: false, message: "Email Or Password dosen't Matching" })
        
        jwtToken(user._id, res);

        res.status(200).send({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            pic: user.pic,
            email:user.email,
            message: "Succesfully LogIn"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}


export const userLogOut=async(req,res)=>{
    
    try {
        res.cookie("jwt",'',{
            maxAge:0
        })
        res.status(200).send({success:true ,message:"User LogOut"})

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}