"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateNotificationToSeen } from "@/actions/notificationAction";

export default function Notification({
   notificationId,
   postId,
   message,
   postTitle,
   notificationImage,
   seen,
}) {
   const router = useRouter();

   const handleClick = () => {
      updateNotificationToSeen(notificationId);
      router.push(`/newsfeed/${postId}`);
   };

   return (
      <div
         role="alert"
         className={`alert mx-2 my-1 hover:cursor-pointer hover:bg-stone-200 transition-all duration-150 ${
            !seen && "bg-slate-200"
         }`}
         onClick={handleClick}
      >
         <div className="relative h-12 w-12">
            <Image
               src={notificationImage}
               className="rounded-full object-cover object-center"
               fill={true}
               alt="post image"
            />
         </div>
         <div>
            <div>{message}</div>
            <div className="text-xs text-gray-500">{postTitle}</div>
         </div>
      </div>
   );
}
