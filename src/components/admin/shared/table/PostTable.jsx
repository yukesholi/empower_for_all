"use client";
//library imports
import { useEffect, useState } from "react";
import {
   getCoreRowModel,
   useReactTable,
   getPaginationRowModel,
   flexRender,
   createColumnHelper,
   getSortedRowModel,
   getFilteredRowModel,
} from "@tanstack/react-table";

//custom imports
import PostTableActions from "./PostTableActions";

export default function UserTable({ postData }) {
   //states here
   const [data, setData] = useState(postData);
   const [filtering, setFiltering] = useState("");
   const [sorting, setSorting] = useState([]);

   //updates user data when the postData prop changes
   useEffect(() => {
      setData(postData);
   }, [postData]);

   //defining columns for the table
   const columnHelper = createColumnHelper();

   const columns = [
      columnHelper.accessor((row, index) => index, {
         id: "sn",
         cell: (info) => (
            <p className="text-black text-center ">{info.getValue() + 1}</p>
         ),
         header: () => <h5 className="text-center">S.N.</h5>,
         footer: (info) => info.column.id,
      }),
      columnHelper.accessor("user", {
         id: "user",
         cell: (info) => (
            <h5 className="font-medium  text-black w-full text-center ">
               {info.getValue()}
            </h5>
         ),
         header: () => <h5 className="text-center">User Name</h5>,
         footer: (info) => info.column.user.name,
      }),

      columnHelper.accessor("caption", {
         id: "caption",
         cell: (info) => (
            <h5 className="font-medium  text-black w-[250px] mx-auto text-center truncate  ">
               {info.getValue()}
            </h5>
         ),
         header: () => <h5 className="text-center">Caption</h5>,

         footer: (info) => info.column.caption,
      }),
      columnHelper.accessor("image", {
         id: "image",
         cell: (info) => <img src={info.getValue()} className="w-16" />,
         header: () => <h5 className="text-center">Image</h5>,

         footer: (info) => info.column.image,
      }),

      columnHelper.accessor("status", {
         id: "status",
         cell: (info) => (
            <h5
               className={`py-2 rounded-md font-medium text-gray-50 w-full text-center ${
                  info.row.original.status === "approved"
                     ? "bg-green-500"
                     : "bg-yellow-400"
               }`}
            >
               {info.getValue()}
            </h5>
         ),
         header: () => <h5 className="text-center">status</h5>,
         footer: (info) => info.column.status,
      }),

      columnHelper.accessor("action", {
         id: "action",
         header: () => <h5 className="text-center">Action</h5>,
         cell: (info) => <PostTableActions info={info} />,
      }),
   ];

   const table = useReactTable({
      data,
      columns,
      defaultColumn: getCoreRowModel(), // Use defaultColumn instead of getCoreRowModel
      getSortedRowModel: getSortedRowModel(sorting),
      state: {
         sorting,
         globalFilter: filtering, // Combine sorting and filtering in a single state object
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
   });

   //redering the table
   return (
      <div className="rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default  sm:px-7.5 xl:pb-1">
         <div className="max-w-full overflow-x-auto">
            <div className="flex mb-5 items-center justify-between">
               <input
                  className="rounded border bg-gray py-3 px-[1.125rem] text-black focus:border-blue-600 focus-visible:outline-none"
                  type="text"
                  placeholder="Search..."
                  value={filtering}
                  onChange={(e) => setFiltering(e.target.value)}
               />
            </div>
            <table className="w-full table-auto text-sm">
               <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id} className="bg-gray-2 text-left">
                        {headerGroup.headers.map((header) => (
                           <th
                              key={header.id}
                              className="py-4 px-4 font-medium text-black cursor-pointer"
                              onClick={header.column.getToggleSortingHandler()}
                           >
                              {/* {header.column.columnDef.header} */}
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                   )}
                           </th>
                        ))}
                     </tr>
                  ))}
               </thead>

               <tbody className="text-sm">
                  {table.getRowModel().rows.map((row) => (
                     <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                           <td
                              key={cell.id}
                              className="border-b border-[#eee] py-5 px-4  xl:pl-3"
                           >
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>

            <div className="flex justify-between items-center my-5">
               <div className="flex gap-2 items-center">
                  <p className="text-sm text-black ">
                     Showing{" "}
                     <span className="font-medium">
                        {table.getRowModel().rows.length}
                     </span>{" "}
                     of <span className="font-medium">{data.length}</span>{" "}
                     entries
                  </p>
               </div>
               <div className="flex gap-2 items-center">
                  <button
                     className="rounded border disabled:bg-black/5 disabled:text-black/50 bg-blue-600 text-white py-2 px-4 focus:border-blue-600 focus-visible:outline-none dark:border-strokedark"
                     onClick={() => {
                        table.setPageIndex(0);
                     }}
                     disabled={!table.getCanPreviousPage()}
                  >
                     First Page
                  </button>
                  <button
                     className="rounded border disabled:bg-black/5 disabled:text-black/50 bg-blue-600 text-white  py-2 px-4  focus:border-blue-600 focus-visible:outline-none dark:border-strokedark "
                     onClick={() => table.previousPage()}
                     disabled={!table.getCanPreviousPage()}
                  >
                     {"<<"}
                  </button>
                  <button
                     className="rounded border disabled:bg-black/5 disabled:text-black/50 bg-blue-600 text-white  py-2 px-4  focus:border-blue-600 focus-visible:outline-none dark:border-strokedark "
                     onClick={() => table.nextPage()}
                     disabled={!table.getCanNextPage()}
                  >
                     {">>"}
                  </button>
                  <button
                     className="rounded border disabled:bg-black/5 disabled:text-black/50 bg-blue-600 text-white  py-2 px-4  focus:border-blue-600 focus-visible:outline-none dark:border-strokedark "
                     onClick={() => {
                        table.setPageIndex(table.getPageCount() - 1);
                     }}
                     disabled={!table.getCanNextPage()}
                  >
                     Last Page
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
