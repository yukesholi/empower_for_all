"use server";
import connectDB from "@/config/connectDB";
import UsersModel from "@/models/UsersModel";

// @desc   Get all users
// @access Private
export async function fetchAllUsers() {
   try {
      await connectDB();

      const response = await UsersModel.find({});
      let users = response.map((doc) => {
         const user = doc.toObject();
         user._id = user._id.toString(); // Convert _id to a string
         return user;
      });

      users = users.filter((user) => user.userType !== "admin");

      return users;
   } catch (e) {
      console.log(e);
   }
}

// @desc   fetch user by id
// @access Private
export async function fetchUserById(id) {
   try {
      await connectDB();

      const response = await UsersModel.findById(id);
      let responseObject = response?.toObject();

      //performing spread operation because this function is called by client component
      // which is lagging , says responseObject = null at first
      responseObject = {
         ...responseObject,
         _id: responseObject?._id.toString(),
      };

      return responseObject;
   } catch (e) {
      console.log(e);
   }
}
