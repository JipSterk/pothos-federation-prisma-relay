"use client";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { getToken, linkOptions } from "../../lib/apolloLinkOptions";
import { initApollo } from "../../lib/initApollo";

export function Providers({ children }: { children: ReactNode }) {
  const client = initApollo(linkOptions, {}, { getToken });
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ApolloProvider>
  );
}
