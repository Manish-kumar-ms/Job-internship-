import User from "../Model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup=async (req,res)=>{

    try {
          const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists=await User.findOne({ email })

    if(userExists){
        return res.status(400).json({ message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user=await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

     const jwtToken=jwt.sign(
            {_id:user._id}
            ,process.env.JWT_SECRET, 
            { expiresIn: '1d' });

      res.cookie("token",jwtToken, {
            httpOnly: true,
             maxAge: 1*24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict',
            secure:false
      })
   
    return res.status(201).json({
        message: "User created successfully",
        user
    })
        
    } catch (error) {
        return res.status(500).json({ message: "error while creating user", error: error.message });
    }
     

}

export const login=async (req,res)=>{
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user=await User.findOne({ email})
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });

        }

        const jwtToken=jwt.sign(
            {_id:user._id}
            ,process.env.JWT_SECRET, 
            { expiresIn: '1d' });

      res.cookie("token",jwtToken, {
            httpOnly: true,
             maxAge: 1*24 * 60 * 60 * 1000, // 1 day
            sameSite: "None",
            secure: true,  
      })

      return res.status(201).json({
      success: true,
        message: "Login successful",
        user
     })


    } catch (error) {
         return res.status(500).json({
        message:`login error: ${error}`,
        });
    }
}

export const logout=async (req,res)=>{
      try {
        res.clearCookie("token", {
      
      sameSite: "None",
      secure: true,
        });
        return res.status(200).json({ message: "Logout successful" });
      } catch (error) {
        return res.status(500).json({
          message: `Logout error: ${error}`,
        });
      }
}

export const getCurrentUser=async (req,res)=>{
    try {
        const user=await User.findById(req.user._id)
       return res.status(200).json({
           success: true,
           user
       })

    } catch (error) {
       return res.status(404).json({message:"user not found",error:error.message}) 
    }
}
