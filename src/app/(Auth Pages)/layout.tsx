"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create the query client
const queryClient = new QueryClient();

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    // Wrap the children with QueryClientProvider
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Layout;
