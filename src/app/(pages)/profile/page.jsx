import React from "react";

import checkSession from "@/utils/checkSession";

import ProfileImage from "@/components/pages/profile/ProfileImage";
import Post from "@/components/shared/post/Post";

import { fetchPostByUser } from "@/data/postData";

export default async function page() {
   const {
      user: { image, name },
      userId,
   } = await checkSession();

   const posts = await fetchPostByUser(userId);

   return (
      <div className="mt-24">
         <ProfileImage image={image} />
         <div className="font-bold text-2xl text-slate-700">{name}</div>

         <div className="mt-12">
            <div className="font-semibold text-2xl text-center text-stone-600 mb-2">
               My Timeline
            </div>
            <hr />
            {posts.map((post) => (
               <Post
                  key={post.id}
                  post={post}
                  link={post.id}
                  deleteable={true}
               />
            ))}
         </div>
      </div>
   );
}
