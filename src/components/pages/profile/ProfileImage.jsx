"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { useSession } from "next-auth/react";

import userAvatar from "@/assets/images/user-avatar.png";
import { FaCamera } from "react-icons/fa6";

import { updateProfilePicture } from "@/actions/profileAction";

import notificationSound from "@/utils/notificationSound";

export default function ProfileImage(props) {
   const session = useSession();
   const [profileImage, setProfileImage] = useState(props.image);

   useEffect(() => {
      if (session.status == "authenticated") {
         setProfileImage(session.data.user.image);
      }
   }, [session?.data?.user?.image]);

   const changePhoto = async (event) => {
      try {
         const selectedFile = URL.createObjectURL(event.target.files[0]);

         const imageResponse = await fetch(selectedFile);
         const imageBlob = await imageResponse.blob();

         const formData = new FormData();
         formData.append("image", imageBlob);
         const imgbbRes = await fetch(`${process.env.NEXT_PUBLIC_IMGBB_API}`, {
            method: "POST",
            body: formData,
         });
         if (imgbbRes.ok && imgbbRes.status === 200) {
            const imgbbJson = await imgbbRes.json();
            const img = imgbbJson.data.image?.url;
            const response = await updateProfilePicture({ image: img });
            if (response.success) {
               notificationSound();
               toast.success(response.message);
               setProfileImage(img);

               session.update({
                  user: {
                     image: img,
                  },
               });
            }
         }
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <>
         <div className="avatar hover:cursor-pointer relative">
            <span className="absolute left-0 right-0 bottom-0 top-0 rounded-full hover:bg-[rgba(84,82,82,0.20)] transition-all duration-150"></span>
            <div className="w-36 rounded-full ring-2 ring-slate-500">
               {profileImage ? (
                  <Image
                     src={profileImage}
                     alt="profile image"
                     height={144}
                     width={144}
                  />
               ) : (
                  <Image
                     src={userAvatar}
                     alt="profile image"
                     height={144}
                     width={144}
                  />
               )}
            </div>

            <span className="bg-slate-600 h-fit p-2 rounded-full absolute bottom-2 right-1 hover:bg-slate-500 transition-all duration-150 hover:scale-105">
               <label className=" hover:cursor-pointer">
                  <FaCamera className="text-white" />
                  <input
                     type="file"
                     name="images"
                     onChange={changePhoto}
                     accept="image/png , image/jpeg, image/webp"
                     className="hidden"
                  />
               </label>
            </span>
         </div>
      </>
   );
}
