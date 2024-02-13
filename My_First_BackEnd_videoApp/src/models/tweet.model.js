mport mongoose from "mongoose";

const TweetSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    owner:{
        type: Schema.Types.objectId,
        ref: "User"
    },
    
}
    , {
        timestamps: true
    })


export const Tweet = mongoose.model("Tweet", TweetSchema)