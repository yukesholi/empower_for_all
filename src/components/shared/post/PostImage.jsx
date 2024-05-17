import React from "react";
import Image from "next/image";
export default function PostImage({ image }) {
   return (
      <figure className="mt-5">
         {/* <Image src={fundraiser} alt="Fundraiser" width={650} height={329} /> */}
         <div className="relative w-[650px] h-[329px] ">
            <Image
               src={image}
               alt="post image"
               fill={true}
               className="object-contain"
            />
         </div>
      </figure>
   );
}
