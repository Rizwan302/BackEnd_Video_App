mport mongoose from "mongoose";

const PlayListSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    video:[{
        type: Schema.Types.objectId,
        ref: "Video"
    }],
    owner:{
        type: Schema.Types.objectId,
        ref: "User"
    },
    
}
    , {
        timestamps: true
    })


export const PlayList = mongoose.model("PlayList", PlayListSchema)