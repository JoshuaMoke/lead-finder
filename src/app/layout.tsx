// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import AuthSessionProvider from "../components/session-provider"; // adjust if your path differs

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
