import { AuthProvider } from "./auth-context";
import React from "react";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
