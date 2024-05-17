import React from "react";
import Image from "next/image";
import CommentBox from "./CommentBox";

import userAvatar from "@/assets/images/user-avatar.png";
import { formatDistanceToNow } from "date-fns";

export default async function CommentSection({ link, post }) {
   return (
      <div>
         <div>
            <CommentBox postId={post?.id} link={link} />
         </div>
         <br />
         <hr />
         <br />
         <div className="">
            {post?.comments.map((comment) => (
               <section className="bg-white  antialiased" key={comment.id}>
                  <div className="w-full mx-auto ">
                     <article className="px-6 my-5 text-base bg-white rounded-lg ">
                        <footer className="flex justify-between items-center mb-2">
                           <div className="flex items-center">
                              <p className="inline-flex items-center mr-3 text-sm text-gray-700  font-semibold">
                                 <span className="w-8 rounded-lg mr-4">
                                    {comment.user.image ? (
                                       <Image
                                          src={comment.user.image}
                                          height={200}
                                          width={200}
                                          alt="profile image"
                                          className="rounded-full ring-1 ring-stone-300"
                                       />
                                    ) : (
                                       <Image
                                          src={userAvatar}
                                          height={200}
                                          width={200}
                                          alt="profile image"
                                          className="rounded-full ring-1 ring-stone-300"
                                       />
                                    )}
                                 </span>
                                 {comment.user.name}{" "}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                 <time
                                    pubdate
                                    datetime="2022-02-08"
                                    title="February 8th, 2022"
                                    className="text-gray-600 "
                                 >
                                    {formatDistanceToNow(
                                       new Date(comment.createdAt),
                                       { addSuffix: true }
                                    )}
                                 </time>
                              </p>
                           </div>
                        </footer>
                        <p className="text-gray-600 px-12 ">{comment.text}</p>
                     </article>
                  </div>
               </section>
            ))}
            {/* {post?.comments.map((comment) => (
               <div key={comment.id} className="chat chat-start">
                  <div className="chat-image avatar" key={comment.id}>
                     <div className="w-10 rounded-full">
                        {comment.user.image ? (
                           <Image
                              src={comment.user.image}
                              height={20}
                              width={200}
                              alt="profile image"
                           />
                        ) : (
                           <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        )}
                     </div>
                  </div>
                  <div className="chat-bubble bg-stone-200">{comment.text}</div>
               </div>
            ))} */}
         </div>
      </div>
   );
}
