import React from "react";
import Post from "@/components/shared/post/Post";

import { fetechSinglePost } from "@/data/postData";

import { notFound } from "next/navigation";

export default async function page({ params }) {
   const { id: [firstId] = [] } = params || {};
   if (!firstId) {
      notFound();
   }

   const post = await fetechSinglePost(params.id);
   return (
      <div>
         <Post post={post} />
      </div>
   );
}
