"use client";
import { useEffect, useRef } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import toast from "react-hot-toast";

import { deletePost } from "@/actions/postActions";

export default function Dropdown({ postId }) {
   const dropdownRef = useRef();

   useEffect(() => {
      const checkIfClickedOutside = (e) => {
         // If the menu is open and the clicked target is not within the menu, then close it
         if (
            dropdownRef.current.open &&
            !dropdownRef.current.contains(e.target)
         ) {
            dropdownRef.current.open = false;
         }
      };

      document.addEventListener("mousedown", checkIfClickedOutside);

      return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", checkIfClickedOutside);
      };
   }, []);

   return (
      <details
         className="dropdown dropdown-end w-fit ml-auto"
         ref={dropdownRef}
      >
         <summary className="m-1 btn">
            {" "}
            <SlOptionsVertical className="w-fit ml-auto" />
         </summary>
         <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li
               onClick={async () => {
                  const res = await deletePost(postId);
                  if (res.success) toast.success(res.message);
               }}
            >
               Delete Post
            </li>
         </ul>
      </details>
   );
}
