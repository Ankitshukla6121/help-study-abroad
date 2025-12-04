// app/layout.js
"use client";

import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import theme from "../lib/theme";
import Sidebar from "../components/Layout/Sidebar";
import Topbar from "../components/Layout/Topbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <div style={{ display: "flex", minHeight: "100vh" }}>
              <Sidebar />

              <div style={{ flex: 1 }}>
                <Topbar />
                <main style={{ padding: 20 }}>
                  {children}
                </main>
              </div>
            </div>

          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
