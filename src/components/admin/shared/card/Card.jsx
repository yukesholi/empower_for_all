import React from "react";

export default function Card({ title, count }) {
   return (
      <div>
         <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <div className="card-body">
               <h2 className="card-title">{title}</h2>
               <p>{count}</p>
               <div className="card-actions justify-end"></div>
            </div>
         </div>
      </div>
   );
}
