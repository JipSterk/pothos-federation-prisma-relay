"use client";

import { getToken, linkOptions } from "@/lib/apolloLinkOptions";
import { initApollo } from "@/lib/initApollo";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const client = initApollo(linkOptions, {}, { getToken });
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ApolloProvider>
  );
}
