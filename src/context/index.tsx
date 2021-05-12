import { AuthProvider } from "./auth-context";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
