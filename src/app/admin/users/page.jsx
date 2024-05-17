import Loader from "@/components/admin/shared/Loader";
import Breadcrumb from "@/components/admin/shared/Breadcrumb";
import UserTable from "@/components/admin/shared/table/UserTable";
import React, { Suspense } from "react";

import { fetchAllUsers } from "@/data/userData";
import { unstable_noStore as noStore } from "next/cache";

const AdminGoodsPage = async () => {
   noStore();
   const userData = await fetchAllUsers();

   return (
      <>
         <Breadcrumb pageNames={["Users"]} hrefs={["/admin/users"]} />
         <Suspense fallback={<Loader />}>
            <UserTable userData={userData} />
         </Suspense>
      </>
   );
};

export default AdminGoodsPage;
