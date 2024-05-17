import React from "react";
import { lazy } from "react";
import { Toaster } from "react-hot-toast";

const DefaultLayout = lazy(() => import("@/components/admin/layout/Layout"));

export const metadata = {
   title: "Admin - Empower For All",
   description: "Admin panel",
};

const AdminLayout = async ({ children }) => {
   return (
      <DefaultLayout>
         <Toaster position="top-center" reverseOrder={false} />
         {children}
      </DefaultLayout>
   );
};

export default AdminLayout;
