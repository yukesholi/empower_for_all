import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: "users",
      },
      text: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const PostSchema = new Schema(
   {
      caption: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      status:{
         type:String,
         default :"pending",
         enum:["pending","approved"]
      },
      likes: [
         {
            type: Schema.Types.ObjectId,
            ref: "users",
         },
      ],
      comments: [CommentSchema],
      postType: {
         type: String,
         enum: ["awareness", "fundraiser", "businessPromotion"],
         default: "awareness",
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: "users",
      },
   },
   { timestamps: true }
);

const Post = models.posts || model("posts", PostSchema);
export default Post;
