import React from "react";
import Link from "next/link";

const Breadcrumb = ({ pageNames, hrefs }) => {
   const length = pageNames?.length;
   return (
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
         <h2 className="text-2xl font-semibold text-black">
            {pageNames[length - 1]}
         </h2>
         <nav>
            <ol className="flex items-center gap-2">
               <li>
                  <Link href="/admin">admin /</Link>
               </li>
               {pageNames.map((pageName, index) => (
                  <li
                     key={index}
                     className={`${
                        index !== length - 1 ? "" : "text-blue-600"
                     } `}
                  >
                     {index !== length - 1 ? (
                        <Link href={`${hrefs[index]}`}>
                           {pageName} {index !== length - 1 && "/"}
                        </Link>
                     ) : (
                        pageName
                     )}
                  </li>
               ))}
            </ol>
         </nav>
      </div>
   );
};

export default Breadcrumb;
