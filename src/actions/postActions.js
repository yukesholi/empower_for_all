"use server";
import connectDB from "@/config/connectDB";
import checkSession from "@/utils/checkSession";
import PostModel from "@/models/PostModel";
import { revalidatePath } from "next/cache";

import {
   sendNotification,
   deleteNotificationByPostId,
} from "@/actions/notificationAction";

//  @desc   add a post
//  @access  private
export async function addPost(data) {
   try {
      await connectDB();

      const session = await checkSession();
      data.user = session?.userId;
      const response = await PostModel.create(data);
      if (!!response) {
         return {
            success: true,
            message: "post added successfully, waiting for admin approval",
         };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: e.message };
   }
}

//  @desc   add a comment
//  @access  private
export async function addComment(data) {
   try {
      await connectDB();

      const session = await checkSession();
      const userId = session?.userId;

      const comments = {
         user: userId,
         text: data.comment,
      };
      const response = await PostModel.findByIdAndUpdate(
         data.postId,
         {
            $push: { comments },
         },
         { new: true }
      );
      if (!!response) {
         revalidatePath(`/newsfeed/[id]`, data.postId);

         //adding notification to database
         const commentLen = response.comments.length;
         let message;
         if (commentLen == 1) {
            message = `${session?.user.name} commented on your post `;
         } else if (commentLen == 2) {
            message = `${session?.user.name} and 1 other commented on your post `;
         } else {
            message = `${session?.user.name} and ${
               commentLen - 1
            } others commented on your post `;
         }
         sendNotification(
            message, //message
            data.postId, //post id
            response.user // user who owns the post
         );
         return { success: true, message: "comment added successfully" };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: "could not comment" };
   }
}

//  @desc   like a post
//  @access  private
export async function likePost(data) {
   try {
      await connectDB();

      const session = await checkSession();
      const userId = session?.userId;

      let post = await PostModel.findById(data.postId);
      let update;

      if (post?.likes.includes(userId)) {
         update = {
            $pull: { likes: userId },
         };
      } else {
         update = {
            $addToSet: { likes: userId },
         };
      }

      const response = await PostModel.findByIdAndUpdate(data.postId, update, {
         new: true,
      });

      if (!!response) {
         // revalidatePath(`/newsfeed/[id]`, data.postId);
         return {
            success: true,
            message: "post liked successfully",
            likes: response.likes.length,
         };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: "could not like" };
   }
}

//  @desc   delete a post
//  @access  private
export async function deletePost(postId) {
   try {
      await connectDB();
      const session = await checkSession();
      const userId = session?.userId;

      const role = session?.role;

      const post = await PostModel.findById(postId);

      if (post?.user == userId || role == "admin") {
         const response = await PostModel.findByIdAndDelete(postId);
         if (!!response) {
            revalidatePath("/profile");
            revalidatePath("/admin/posts");
            deleteNotificationByPostId(postId);
            return { success: true, message: "post deleted successfully" };
         }
      } else {
         return { success: false, message: "unauthorized" };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: "could not delete" };
   }
}

//  @desc   approve a post
//  @access  private
export async function approvePost(postId) {
   try {
      await connectDB();
      const session = await checkSession();
      const userId = session?.userId;

      const role = session?.role;

      const post = await PostModel.findById(postId);

      if (post?.user == userId || role == "admin") {
         const response = await PostModel.findByIdAndUpdate(
            postId,
            {
               status: "approved",
            },
            {
               runValidators: true,
            }
         );

         if (!!response) {
            revalidatePath("/admin/posts");
            deleteNotificationByPostId(postId);
            return { success: true, message: "post approved successfully" };
         }
      } else {
         return { success: false, message: "unauthorized" };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: "could not approve" };
   }
}

//  @desc   hide a post
//  @access  private
export async function hidePost(postId) {
   try {
      await connectDB();
      const session = await checkSession();
      const userId = session?.userId;

      const role = session?.role;

      const post = await PostModel.findById(postId);

      if (post?.user == userId || role == "admin") {
         const response = await PostModel.findByIdAndUpdate(
            postId,
            {
               status: "pending",
            },
            {
               runValidators: true,
            }
         );

         if (!!response) {
            revalidatePath("/admin/posts");
            deleteNotificationByPostId(postId);
            return { success: true, message: "post hidden successfully" };
         }
      } else {
         return { success: false, message: "unauthorized" };
      }
   } catch (e) {
      console.log(e);
      return { success: false, message: "could not hide post" };
   }
}
