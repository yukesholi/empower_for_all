"use client";
import React from "react";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

import { changePassword } from "@/actions/authActions";

export default function page() {
   const handleSubmit = async (e) => {
      e.preventDefault();
      // alert("change");
      const password = e.target[0].value;
      const newPassword = e.target[1].value;
      const confirmPassword = e.target[2].value;

      //throws error if the new password and confirm password do not match
      if (newPassword !== confirmPassword) {
         return toast.error("Passwords do not match");
      }

      const data = {
         password,
         newPassword,
         confirmPassword,
      };

      const res = await changePassword(data);
      if (res.success) {
         toast.success(res.message);

         setTimeout(() => {
            signOut();
         }, 1000);
      } else {
         toast.error(res.message);
      }
   };

   return (
      <div className="mx-auto w-full mt-28 border border-stone-300 p-6 rounded-lg shadow-xl">
         <div className="text-center font-semibold text-xl text-slate-600 mb-5">
            Change your password
         </div>
         <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
               <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
               >
                  Your password
               </label>
               <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
               />
            </div>
            <div className="mb-5">
               <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
               >
                  New password
               </label>
               <input
                  type="password"
                  id="newPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
               />
            </div>

            <div className="mb-5">
               <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
               >
                  Confirm password
               </label>
               <input
                  type="password"
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
               />
            </div>
            <button
               type="submit"
               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               Submit
            </button>
         </form>
      </div>
   );
}
