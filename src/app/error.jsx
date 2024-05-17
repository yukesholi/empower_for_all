"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error);
   }, [error]);

   return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-2 ">
         <p>Something went wrong...</p>

         <button
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            onClick={
               // Attempt to recover by trying to re-render the segment
               () => reset()
            }
         >
            Try again
         </button>
      </div>
   );
}
