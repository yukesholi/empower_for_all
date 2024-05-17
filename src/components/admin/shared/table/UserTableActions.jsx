"use client";

import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";

//custom imports
import { deleteUser, suspendUser, unsuspendUser } from "@/actions/userAction";

export default function UserTableActions({ info }) {
   //handle delete function
   const handleDelete = async (id) => {
      if (confirm("Are you sure you want to delete this user?")) {
         try {
            const response = await deleteUser(id);
            if (response.success == true) {
               toast.success(response.message);
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

   // handle suspend function
   const handleSuspend = async (id) => {
      if (confirm("Are you sure you want to suspend this user?")) {
         try {
            const response = await suspendUser(id);
            if (response.success == true) {
               const res = await fetch(
                  `${process.env.NEXT_PUBLIC_SITE}/api/socket`,
                  {
                     cache: "no-store",
                     method: "POST",
                     body: JSON.stringify({ id }),
                     headers: {
                        "Content-Type": "application/json",
                     },
                  }
               );
               if (res.status == 200) toast.success(response.message);
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

   //handle unsuspension function
   const handleUnsuspension = async (id) => {
      if (confirm("Are you sure you want to unsuspend this user?")) {
         try {
            const response = await unsuspendUser(id);
            if (response.success == true) {
               const res = await fetch(
                  `${process.env.NEXT_PUBLIC_SITE}/api/socket`,
                  {
                     cache: "no-store",
                     method: "POST",
                     body: JSON.stringify({ id }),
                     headers: {
                        "Content-Type": "application/json",
                     },
                  }
               );
               toast.success(response.message);
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
         {info.row.original.status === "active" ? (
            <button
               onClick={() => handleSuspend(info.row.original._id)}
               className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-stone-500 rounded-lg hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-stone-700 "
            >
               <BiEdit className="me-1 h-[18px] w-[18px]" />
               Suspend
            </button>
         ) : (
            <button
               onClick={() => handleUnsuspension(info.row.original._id)}
               className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-green-500 rounded-lg hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-green-700 "
            >
               <BiEdit className="me-1 h-[18px] w-[18px]" />
               Unsuspend
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
