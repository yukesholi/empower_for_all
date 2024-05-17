"use server";
import connectDB from "@/config/connectDB";
import checkSession from "@/utils/checkSession";
import UsersModel from "@/models/UsersModel";
import { revalidatePath } from "next/cache";

// @desc  update user profile picture
// @access  private
export async function updateProfilePicture(data) {
   try {
      await connectDB();

      const session = await checkSession();
      const userId = session?.userId;

      const response = await UsersModel.findByIdAndUpdate(
         userId,
         { image: data.image },
         { new: true }
      );
      if (!!response) {
         revalidatePath("/profile");
         return {
            success: true,
            message: "profile picture updated successfully",
         };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: e.message };
   }
}
