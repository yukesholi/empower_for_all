"use client";
import { useState, useEffect } from "react";
import { likePost } from "@/actions/postActions";
import { BiLike } from "react-icons/bi";

export default function Like({ likes, postId, userId, selfLike }) {
   const [like, setLike] = useState(selfLike);
   const [numOfLikes, setNumOfLikes] = useState(likes);

   const likeAPost = async () => {
      like
         ? (setNumOfLikes((prev) => prev - 1), setLike(false))
         : (setNumOfLikes((prev) => prev + 1), setLike(true));
      const response = await likePost({ postId });
   };

   return (
      <div className="flex items-center gap-2 px-2">
         <BiLike
            className={`transform duration-75 hover:scale-110 text-xl ${
               like && "text-blue-600"
            } `}
            onClick={likeAPost}
         />
         {numOfLikes}
         {/* this like is a state which contains the length of the like */}
      </div>
   );
}
