'use client';
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  console.log("Rendering Layout Component"); // Console log for client-side component
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default Layout;