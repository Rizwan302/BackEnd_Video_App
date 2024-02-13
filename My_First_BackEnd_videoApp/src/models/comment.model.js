mport mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    video:{
        type: Schema.Types.objectId,
        ref: "Video"
    },
    owner:{
        type: Schema.Types.objectId,
        ref: "User"
    },
}
    , {
        timestamps: true
    })

VideoSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", CommentSchema)