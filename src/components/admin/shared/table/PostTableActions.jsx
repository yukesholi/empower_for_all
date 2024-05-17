"use client";

import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import toast from "react-hot-toast";

//custom imports
import { deletePost, approvePost, hidePost } from "@/actions/postActions";
import notificationSound from "@/utils/notificationSound";

export default function PostTableActions({ info }) {
   //mount router here

   //handle delete function
   const handleDelete = async (id) => {
      if (confirm("Are you sure you want to delete this post?")) {
         try {
            const response = await deletePost(id);
            if (response.success == true) {
               toast.success(response.message);
               notificationSound();
            } else {
               toast.error(response.message);
            }
         } catch (error) {
            toast.error(
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.response
            );
         }
      } else {
         return;
      }
   };

   //handle approval of post
   const handleApproval = async (id) => {
      if (confirm("Are you sure you want to approve this post?")) {
         try {
            const response = await approvePost(id);
            if (response.success == true) {
               toast.success(response.message);
               notificationSound();
            } else {
               toast.error(response.message);
            }
         } catch (error) {
            toast.error(
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.response
            );
         }
      } else {
         return;
      }
   };

   const handleHide = async (id) => {
      if (confirm("Are you sure you want to hide this post?")) {
         try {
            const response = await hidePost(id);
            if (response.success == true) {
               toast.success(response.message);
               notificationSound();
            } else {
               toast.error(response.message);
            }
         } catch (error) {
            toast.error(
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.response
            );
         }
      } else {
         return;
      }
   };

   return (
      <div className="flex justify-center space-x-3.5  ">
         {info.row.original.status !== "approved" ? (
            <button
               onClick={() => handleApproval(info.row.original._id)}
               className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-green-500 rounded-lg hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-green-700 "
            >
               <FaCheckCircle className="me-1 h-[18px] w-[18px]" />
               Approve
            </button>
         ) : (
            <button
               onClick={() => handleHide(info.row.original._id)}
               className="px-6 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-yellow-500 rounded-lg hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-yellow-700  "
            >
               <RxCross2 className="me-1 h-[18px] w-[18px]" />
               Hide
            </button>
         )}
         <button
            onClick={() => handleDelete(info.row.original._id)}
            className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-red-600 rounded-lg hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-red-700 "
         >
            <RiDeleteBinLine className="me-1 h-[18px] w-[18px]" />
            Delete
         </button>
      </div>
   );
}
