"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function Suspended({ res, session }) {
   return (
      <div>You have been suspended, contact the admin for more information</div>
   );
}
