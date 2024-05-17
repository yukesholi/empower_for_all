import React from "react";
import Post from "@/components/shared/post/Post";
import { fetchAwareness } from "@/data/postData";

export default async function page() {
   const awareness = await fetchAwareness();
   return (
      <div>
         {awareness?.map((post) => (
            <Post key={post?._id} post={post} link={post.id} />
         ))}
      </div>
   );
}
