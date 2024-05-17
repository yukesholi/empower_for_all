"use server";
import { revalidatePath } from "next/cache";

import connectDB from "@/config/connectDB";
import UserModel from "@/models/UsersModel";

// @desc    server action for suspending user from the database
// @access  Private
export async function suspendUser(id) {
   try {
      await connectDB();
      const response = await UserModel.findByIdAndUpdate(id, {
         status: "suspended",
      });

      if (response) {
         revalidatePath("/users");
         return { success: true, message: "user suspended successfully" };
      }
   } catch (e) {
      return { success: false, message: e.message };
   }
}

// @desc    server action for deleting user from the database
// @access  Private
export async function deleteUser(id) {
   try {
      await connectDB();
      const response = await UserModel.findByIdAndDelete(id);

      if (response) {
         revalidatePath("/admin/users");
         return { success: true, message: "user deleted successfully" };
      }
   } catch (e) {
      return { success: false, message: e.message };
   }
}

// @desc    server action for unsuspending user from the database
// @access  Private
export async function unsuspendUser(id) {
   try {
      await connectDB();
      const response = await UserModel.findByIdAndUpdate(id, {
         status: "active",
      });

      if (response) {
         revalidatePath("/users");
         return { success: true, message: "user unsuspended successfully" };
      }
   } catch (e) {
      return { success: false, message: e.message };
   }
}
