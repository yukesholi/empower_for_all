import React from "react";
import Post from "@/components/shared/post/Post";
import { fetchFundraiser } from "@/data/postData";

export default async function page() {
   const fundraiser = await fetchFundraiser();
   return (
      <div>
         {fundraiser?.map((post) => (
            <Post key={post?._id} post={post} link={post.id} />
         ))}
      </div>
   );
}
