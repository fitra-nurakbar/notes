import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import materialTheme from "../../material-theme";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PlausibleProvider from "next-plausible";

const NEXT_PUBLIC_WEBSITE_DOMAIN = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;
if (NEXT_PUBLIC_WEBSITE_DOMAIN == null) {
  throw new Error("NEXT_PUBLIC_WEBSITE_DOMAIN is not set");
}

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <PlausibleProvider domain={NEXT_PUBLIC_WEBSITE_DOMAIN}>
            <Component {...pageProps} />
          </PlausibleProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
