"use server";
import connectDB from "@/config/connectDB";
import bcrypt from "bcryptjs";

import UsersModel from "@/models/UsersModel";
import checkSession from "@/utils/checkSession";

//  @desc   register user
//  @access  public
export async function registerUser(data) {
   try {
      await connectDB();

      const password = data.password;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      data.password = hashedPassword;
      const response = await UsersModel.create(data);

      if (!!response) {
         return { success: true, message: "user added successfully" };
      }
   } catch (e) {
      console.log(e);
      if (e.code == 11000) {
         return {
            success: false,
            message: "sorry!! 00999-99email already exists",
         };
      }
      return { success: false, message: "could not register user!!" };
   }
}

//  @desc   change password
//  @access  private
export async function changePassword(data) {
   try {
      await connectDB();

      const session = await checkSession();

      const user = await UsersModel.findById(session.userId).select(
         "+password"
      );

      const isMatch = await bcrypt.compare(data.password, user.password);
      if (isMatch) {
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(data.newPassword, salt);

         const response = await UsersModel.findByIdAndUpdate(
            session?.userId,
            { password: hashedPassword },
            { new: true }
         );
         if (!!response) {
            return {
               success: true,
               message: "password changed successfully",
            };
         }
      } else {
         return { success: false, message: "wrong password" };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: e.message };
   }
}
