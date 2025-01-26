"use client";
// import ReactQueryProvider from "@/providers/react-query-provider";
import { UserProvider, useUser } from "@/providers/UserContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { user } = useUser();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const guestRoutes = ["/login", "/register", "/"];

    if (guestRoutes.includes(path)) {
      if (user) {
        router.push("/dashboard");
      }
    }

    if (!user) {
      router.push("/login");
    }
  }, []);
  return <>{children}</>;
}

export default Layout;
