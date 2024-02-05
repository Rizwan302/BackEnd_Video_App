import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const userSchema = mongoose.Schema({
    username:{
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    email:{
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    fullName:{
        type: String,
        required: true,
        unique: true
    },
    avatar:{
        type: String, 
        required: [true, "Password is Required"]
    },
    coverImage:{
        type:String,
        
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken:{
        type: String
    }
}, 
{
    timestamps: true
})
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try {
        const hashedPassword  = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword
        console.log("New password   :", hashedPassword)
        next()
    } catch (error) {
       throw new ApiError(301, "not bcrypt password")
    }
});



userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            password: this.password,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
        
    )
};

export const User = mongoose.model("User", userSchema)