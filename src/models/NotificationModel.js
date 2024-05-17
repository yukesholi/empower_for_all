import { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: "users",
      },
      post: {
         type: Schema.Types.ObjectId,
         ref: "posts",
      },
      message: {
         type: String,
         required: true,
      },
      seen: {
         type: Boolean,
         default: false,
         enum: [true, false],
      },
   },
   {
      timestamps: true,
   }
);

export default models.notifications ||
   model("notifications", NotificationSchema);
