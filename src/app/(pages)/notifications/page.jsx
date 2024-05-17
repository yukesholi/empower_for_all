//next js components
import React from "react";
import checkSession from "@/utils/checkSession";

console.log("hello   ");

//datas
import { fetchNotifications } from "@/data/notificationData";

// server action
import { updateAllNotificationsToSeen } from "@/actions/notificationAction";

//componetns
import Notification from "@/components/shared/notification/Notification";

export default async function page() {
   const { userId } = await checkSession();

   const notifications = await fetchNotifications(userId);
   return (
      <>
         <form action={updateAllNotificationsToSeen}>
            <button className="flex rounded-lg w-3/5 py-3 transition-all duration-105 hover:scale-105 hover:shadow-sm mx-auto hover:cursor-pointer hover:bg-stone-200 justify-center items-center h-5 bg-stone-100 text-gray-500 text-md ">
               mark all as read
            </button>
         </form>
         {notifications?.map((notification) => (
            <div key={notification.id}>
               <Notification
                  notificationId={notification.id}
                  postId={notification.post?.id}
                  postTitle={notification.post?.caption}
                  message={notification.message}
                  seen={notification.seen}
                  notificationImage={notification.post?.image}
               />
            </div>
         ))}
      </>
   );
}
