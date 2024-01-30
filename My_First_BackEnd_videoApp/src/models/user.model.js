import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    username:{
        type: String,
        lowercase: true,
        trim: trim,
        required: true,
        unique: true,
        index: true
    },
    email:{
        type: String,
        lowercase: true,
        trim: trim,
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
        trim:trim
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
userSchema.pre("Save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next()
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
            fullName: this.fullName
        },
        
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