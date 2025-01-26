'use client';

import React from 'react';
import { UserProvider } from '@/app/context/userContext'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <UserProvider> {/* Wrap your app with UserProvider */}
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </UserProvider>
  );
}

export default Layout;
