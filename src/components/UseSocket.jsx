"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSession, signOut } from "next-auth/react";

import { fetchUserById } from "@/data/userData";

export default function UseSocket() {
   const { data: session } = useSession();

   useEffect(() => {
      const socket = io("https://server-socket-k10p.onrender.com/");

      socket.on("receive-message", (user) => {
         if (session?.userId == user) {
            signOut();
         }
      });

      //fetch user

      (async () => {
         const res = await fetchUserById(session?.userId);
         if (res?.status !== session?.status) {
            signOut();
         }
      })();

      // Clean up the effect by disconnecting the socket when the component unmounts
      // return () => {
      //    socket.disconnect();
      // };
   }, [session]);

   return <> </>;
}
