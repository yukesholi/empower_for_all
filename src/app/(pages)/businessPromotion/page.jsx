import React from "react";
import Post from "@/components/shared/post/Post";
import { fetchBusinessPromotion } from "@/data/postData";

export default async function page() {
   const businessPromotion = await fetchBusinessPromotion();
   return (
      <div>
         {businessPromotion?.map((post) => (
            <Post key={post?._id} post={post} link={post.id} />
         ))}
      </div>
   );
}
