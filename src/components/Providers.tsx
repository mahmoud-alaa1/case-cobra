"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <KindeProvider>{children}</KindeProvider>
    </QueryClientProvider>
  );
}
