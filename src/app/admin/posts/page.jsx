import Loader from "@/components/admin/shared/Loader";
import Breadcrumb from "@/components/admin/shared/Breadcrumb";
import PostTable from "@/components/admin/shared/table/PostTable";
import React, { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

import { fetchAllPost } from "@/data/postData";

const AdminGoodsPage = async () => {
   noStore();
   const postData = await fetchAllPost();

   return (
      <>
         <Breadcrumb pageNames={["Posts"]} hrefs={["/admin/posts"]} />
         <Suspense fallback={<Loader />}>
            <PostTable postData={postData} />
         </Suspense>
      </>
   );
};

export default AdminGoodsPage;
