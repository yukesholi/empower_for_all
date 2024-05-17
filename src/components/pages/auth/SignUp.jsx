"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { registerUser } from "@/actions/authActions";
import toast from "react-hot-toast";

export default function page() {
   const router = useRouter();

   // for form submittion
   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const password = formData.get("password").trim();
      const confirmPassword = formData.get("confirmPassword").trim();

      if (password !== confirmPassword) {
         toast.error("passwords do not match");
         return;
      } else {
         const response = await registerUser({ name, email, password });
         if (response?.success) {
            toast.success(response.message);
            router.push("./signIn");
         } else {
            toast.error(response.message);
         }
      }
   };

   return (
      <div>
         <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-stone-100">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
               <h1 className="text-3xl font-semibold text-center text-gray-700 underline">
                  {/* DaisyUI */}
                  Sign Up
               </h1>
               <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                     <label className="label">
                        <span className="text-base label-text">Name</span>
                     </label>
                     <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="w-full input input-bordered"
                     />
                  </div>
                  <div>
                     <label className="label">
                        <span className="text-base label-text">Email</span>
                     </label>
                     <input
                        type="text"
                        placeholder="Email Address"
                        className="w-full input input-bordered"
                        name="email"
                     />
                  </div>
                  <div>
                     <label className="label">
                        <span className="text-base label-text">Password</span>
                     </label>
                     <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full input input-bordered"
                        name="password"
                     />
                  </div>
                  <div>
                     <label className="label">
                        <span className="text-base label-text">
                           Confirm Password
                        </span>
                     </label>
                     <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full input input-bordered"
                        name="confirmPassword"
                     />
                  </div>
                  <div>
                     <button className="btn btn-block bg-primary">
                        Sign Up
                     </button>
                  </div>
                  <span>
                     Already have an account ?{" "}
                     <Link
                        href="/auth/signIn"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                     >
                        SignIn
                     </Link>
                  </span>
               </form>
            </div>
         </div>
      </div>
   );
}
