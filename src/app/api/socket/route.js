import { NextResponse } from "next/server";
import { io } from "socket.io-client";

export async function POST(request) {
   try {
      const req = await request.json();
      const socket = io("https://server-socket-vcta.onrender.com");
      socket.emit("send-message", req.id);

      return NextResponse.json("success", { status: 200 });
   } catch (e) {
      console.log(e);
   }
}
