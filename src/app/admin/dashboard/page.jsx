import Loader from "@/components/admin/shared/Loader";
import Breadcrumb from "@/components/admin/shared/Breadcrumb";
import React, { Suspense } from "react";

import LineChart from "@/components/admin/shared/chart/LineChart";

import { fetchAllUsers } from "@/data/userData";
import { fetchAllPost } from "@/data/postData";

import Card from "@/components/admin/shared/card/Card";
import { unstable_noStore as noStore } from "next/cache";

export default async function page() {
   const [users, posts] = await Promise.all([fetchAllUsers(), fetchAllPost()]);

   noStore();

   return (
      <>
         <Breadcrumb pageNames={["Dashboard"]} hrefs={["/admin/dashboard"]} />
         <div className="flex gap-2">
            <Card title="Total Posts" count={posts.length} />
            <Card title="Total Users" count={users.length} />
         </div>
         <div className="mt-10">
            <Suspense fallback={<Loader />}>
               <LineChart users={users} posts={posts} />
            </Suspense>
         </div>
      </>
   );
}
