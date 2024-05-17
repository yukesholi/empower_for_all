"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { BsPass } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

//custom packages
import { addUser } from "@/actions/userAction";

export default function AddUserForm() {
   //hooks here
   const { pending } = useFormStatus();
   const router = useRouter();

   //handle form submition here
   async function handleSubmit(e) {
      e.preventDefault();

      const form = e.target;
      const userName = form.elements["userName"].value;
      const password = form.elements["password"].value;
      const data = { userName, password };

      //calling server action here
      const response = await addUser(data);
      if (response.success == true) {
         toast.success(response.message);
         router.push("/admin/users");
      } else {
         toast.error(response.message);
      }
   }

   return (
      <form onSubmit={handleSubmit} className="min-w-96 w-[30rem]">
         <div className="mb-5">
            <label
               className="mb-3 block text-sm font-medium text-gray-800 "
               htmlFor="userName"
            >
               User Name
            </label>
            <div className="relative">
               <span className="absolute left-4 top-4">
                  <FiUser className="h-[20px] w-[20px]" />
               </span>
               <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11 pr-4 text-gray-800 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder=""
                  defaultValue=""
               />
            </div>
         </div>

         <div className="mb-5">
            <label
               className="mb-3 block text-sm font-medium text-gray-800 "
               htmlFor="password"
            >
               Password
            </label>
            <div className="relative">
               <span className="absolute left-4 top-4">
                  <BsPass className="h-[20px] w-[20px]" />
               </span>
               <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11 pr-4 text-gray-800 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
                  type="text"
                  name="password"
                  id="password"
                  placeholder=""
                  defaultValue=""
               />
            </div>
         </div>

         <div className="flex justify-end gap-4">
            <Link
               href="/admin/users"
               className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-gray-800 hover:shadow-md dark:border-strokedark "
            >
               Cancel
            </Link>
            <button
               className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-md"
               type="submit"
               aria-disabled={pending}
            >
               Save
            </button>
         </div>
      </form>
   );
}
