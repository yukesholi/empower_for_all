"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignIn() {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   // for form submittion
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);

      const response = await signIn("credentials", {
         email: formData.get("email").trim(),
         password: formData.get("password").trim(),
         redirect: false,
         // redirect: true,
         // callbackUrl: "/newsfeed", // if the user is authenticated, redirect to this page
      });
      if (response?.status === 200) {
         // alert("correct password");
         router.replace("/newsfeed");
      } else if (response?.status === 401) {
         setLoading(false);
         toast.error("invalid credentials");
      }
   };

   return (
      <div className="bg-no-repeat bg-cover bg-center relative bg-stone-100">
         <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center ">
            <div className="flex justify-center self-center  z-10 border-2 border-stone-400 rounded-md shadow-xl ">
               <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                  <div className="mb-4">
                     <h3 className="font-semibold text-2xl text-gray-800">
                        Sign In{" "}
                     </h3>
                     <p className="text-gray-500">
                        Please sign in to your account.
                     </p>
                  </div>
                  <form action="" onSubmit={handleSubmit}>
                     <div className="space-y-5">
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-gray-700 tracking-wide">
                              Email
                           </label>
                           <input
                              className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                              type=""
                              placeholder="mail@gmail.com"
                              name="email"
                              required={true}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                              Password
                           </label>
                           <input
                              className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                              type="password"
                              placeholder="Enter your password"
                              name="password"
                              required={true}
                           />
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center">
                              <input
                                 id="remember_me"
                                 name="remember_me"
                                 type="checkbox"
                                 className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                              />
                              <label
                                 htmlFor="remember_me"
                                 className="ml-2 block text-sm text-gray-800"
                              >
                                 Remember me
                              </label>
                           </div>
                           <div className="text-sm">
                              <a
                                 href="#"
                                 className="text-green-400 hover:text-green-500"
                              >
                                 Forgot your password?
                              </a>
                           </div>
                        </div>

                        <div>
                           <button
                              type="submit"
                              className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                              disabled={loading}
                           >
                              {loading ? "Signing in..." : "Sign in"}
                           </button>

                           <p className="mt-2 mx-auto w-fit">
                              Don't have an account ?{" "}
                              <Link href={"./signUp"}>
                                 {" "}
                                 <span className="text-blue-800 hover:underline">
                                    {" "}
                                    SignUp{" "}
                                 </span>{" "}
                              </Link>
                           </p>

                           <div className="relative text-center mt-3">
                              <hr className="absolute inset-0 w-full h-0.5 bg-gray-400" />
                              <span className="absolute bg-white px-2 -top-2  transform -translate-x-1/2">
                                 or
                              </span>
                           </div>
                           <br />

                           <button
                              type="button"
                              className="flex btn items-center bg-gray-100 w-fit mx-auto px-4 py-3 rounded-md"
                              onClick={() => {
                                 signIn("google");
                              }}
                           >
                              <FcGoogle className="text-2xl" />
                              <span> &nbsp; sign in with Google</span>
                           </button>
                        </div>
                     </div>
                  </form>
                  <div className="pt-5 text-center text-gray-400 text-xs"></div>
               </div>
            </div>
         </div>
      </div>
   );
}
