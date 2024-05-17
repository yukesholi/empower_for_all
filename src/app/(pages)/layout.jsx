import React from "react";
import Header from "@/components/layouts/Header/Header";

export default function layout({ children }) {
   return (
      <div>
         <Header />
         <div className="lg:w-[650px] mx-auto my-4 px-4 ">{children}</div>
      </div>
   );
}
