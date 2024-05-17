import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import Provider from "@/components/Provider";
import UseSocket from "@/components/UseSocket";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Empower For All",
   description:
      "Empower For All is a social media platform for social good, where you can share your thoughts, ideas, and projects to make the world a better place.",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <Provider>
            <body className={`${inter.className} overflow-y-scroll`}>
               <UseSocket />
               <Toaster position="top-center" reverseOrder={false} />
               {children}
            </body>
         </Provider>
      </html>
   );
}
