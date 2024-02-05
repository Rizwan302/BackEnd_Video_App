import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadFile } from '../utils/cloudinary.js'
import ApiResponse from "../utils/ApiResponse.js";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        console.log("generateAccessAndRefereshTokens", accessToken)
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token", error)
    }
}


export const registerUser = asyncHandler(async (req, res) => {
    const { email, password, fullName, username } = req.body;

    if (
        [fullName, username, password, email].some((field) => field.trim() === "")
    ) {
        throw new ApiError(400, "all Field in required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "email all ready existed")
    }

    const avatarImg = req.files?.avatar[0]?.path;
    const coverImg = req.files?.coverImage[0]?.path;
    if (!avatarImg) {
        throw new ApiError(400, "avatar Image not send")
    }

    const avatarUp = await uploadFile(avatarImg)
    const coverUp = await uploadFile(coverImg);

    if (!avatarUp) {
        throw new ApiError(400, "avatar Image is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatarUp.url,
        coverImage: coverUp?.url || "",
        email,
        password,
        username
    });

    const createdUser = await User.findById(user._id)
    .select(
        '-password'
    )

    if (!createdUser) {
        throw new ApiError(500, "some Image is required")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Create successfully")
    )
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    // console.log(email, username)

    if (!(email || username)) {
        throw new ApiError(401, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new ApiError(401, "user not Exeit")
    }

    const isPassword = await user.isPasswordCorrect(password)
    

    if (!isPassword) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "Logout User"))
})