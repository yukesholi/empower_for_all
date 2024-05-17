import { Schema, models, model } from "mongoose";

const UsersSchema = new Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         select: false,
      },
      image: {
         type: String,
         default: null,
      },
      name: {
         type: String,
         required: true,
      },
      userType: { type: String, default: "user", enum: ["user", "admin"] },
      status: {
         type: String,
         default: "active",
         enum: ["active", "suspended"],
      },
   },
   {
      timestamps: true,
   }
);
export default models.users || model("users", UsersSchema);
