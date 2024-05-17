import NotificationModel from "@/models/NotificationModel";
import "@/models/PostModel";

import connectDB from "@/config/connectDB";
import checkSession from "@/utils/checkSession";

//  @desc   fetch all the notifications of the particular user
// here userId is the user who is logged in and who created the post
export const fetchNotifications = async (userId) => {
   try {
      await connectDB();

      //fetches all the unseen data
      let response = await NotificationModel.find({
         user: userId,
      })
         .sort({
            updatedAt: -1,
         })
         .populate("post");
      return response;
   } catch (err) {
      console.log(err);
   }
};
