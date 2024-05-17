"use server";
import { revalidatePath } from "next/cache";
import connectDB from "@/config/connectDB";
import NotificationModel from "@/models/NotificationModel";
import checkSession from "@/utils/checkSession";

// @desc   add notification to the database

export async function sendNotification(
   message, //the message to be sent
   postId, //the post that was commented on
   postUser //the one who owns the post
) {
   try {
      await connectDB();

      const response = await NotificationModel.findOneAndUpdate(
         { user: postUser, post: postId },
         { message, seen: false },
         { new: true, upsert: true }
      );

      // const response = await NotificationModel.create(notification);
      if (!!response) {
      }
   } catch (err) {
      console.log(err);
   }
}

// @desc    update single notification to seen
export async function updateNotificationToSeen(notificationId) {
   try {
      await connectDB();

      const response = await NotificationModel.findByIdAndUpdate(
         notificationId,
         { seen: true },
         { new: true }
      );
      if (!!response) {
         return { success: true, message: "notification updated" };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: "could not update notification" };
   }
}

// @desc    update all notifications to seen
export async function updateAllNotificationsToSeen() {
   console.log("update notificaitondsfoas")
   try {
      await connectDB();
      const { userId } = await checkSession();

      const response = await NotificationModel.updateMany(
         { seen: false, user: userId }, //condition
         { seen: true } //update
      );
      if (!!response) {
         revalidatePath("/notifications");
         return { success: true, message: "all notifications updated" };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: "could not update notifications" };
   }
}

// @desc    delete notification by post id
export async function deleteNotificationByPostId(postId) {
   try {
      await connectDB();
      const response = await NotificationModel.deleteMany({ post: postId });
      if (!!response) {
         return { success: true, message: "notification deleted" };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: "could not delete notification" };
   }
}
