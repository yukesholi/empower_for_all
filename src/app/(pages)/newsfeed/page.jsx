import React from "react";
import Post from "@/components/shared/post/Post";
import { fetchNewsfeed } from "@/data/postData";

export default async function page() {
   const newsfeed = await fetchNewsfeed();
   return (
      <div>
         {newsfeed?.map((post) => (
            <Post key={post?._id} post={post} link={post.id} />
         ))}
      </div>
   );
}
