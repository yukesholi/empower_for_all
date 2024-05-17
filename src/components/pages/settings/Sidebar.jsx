import React from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Sidebar() {
   return (
      <div className="w-1/5  border-r-2 min-h-[90vh] ">
         <ul className="menu w-full rounded-box">
            <li>
               <a>
                  <FaUser />
                  User Information
               </a>
            </li>
            <li>
               <a>
                  <RiLockPasswordFill />
                  Password{" "}
               </a>
            </li>
         </ul>
      </div>
   );
}
