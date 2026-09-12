"use client";

import React, { ReactNode } from "react";
import QueryProvider from "./query.provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Providers = ({ children }: { children: ReactNode }) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return <QueryProvider>{children}</QueryProvider>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <QueryProvider>{children}</QueryProvider>
    </GoogleOAuthProvider>
  );
};

export default Providers;
