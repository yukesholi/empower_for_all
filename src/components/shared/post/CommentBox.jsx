"use client";
import { useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { addComment } from "@/actions/postActions";

import notificationSound from "@/utils/notificationSound";

import toast from "react-hot-toast";

export default function CommentBox({ postId }) {
   const [comment, setComment] = useState("");
   const inputRef = useRef(null);

   // handling comment submittion
   const handleSubmit = async () => {
      if (comment.length > 0) {
         const response = await addComment({ postId, comment });
         if (response.success) {
            setComment("");
            inputRef.current.value = "";
            notificationSound();
            toast.success(response.message);
         } else {
            toast.error(response.message);
         }
      }
   };

   return (
      <div className="relative">
         <input
            ref={inputRef}
            type="text"
            placeholder="Add a comment..."
            className="input input-bordered w-full"
            onChange={(e) => setComment(e.target.value)}
         />
         <button
            className="btn absolute right-0 h-0 bg-none hover:bg-none "
            disabled={comment.length == 0}
            onClick={handleSubmit}
         >
            <IoSend />
         </button>
      </div>
   );
}
