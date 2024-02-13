mport mongoose from "mongoose";

const LikeSchema = mongoose.Schema({
    video:{
        type: Schema.Types.objectId,
        ref: "Video"
    },
    owner:{
        type: Schema.Types.objectId,
        ref: "User"
    },
    comment:{
        type: Schema.Types.objectId,
        ref: "Comment"
    },
    tweet:{
        type: Schema.Types.objectId,
        ref: "Tweet"
    },
}
    , {
        timestamps: true
    })


export const Like = mongoose.model("Like", LikeSchema)