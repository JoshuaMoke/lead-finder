// src/app/signin/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("email", {
      email,
      callbackUrl: "/",
    });
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "sans-serif",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>Sign in to Lead Finder</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "250px",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{
            padding: "0.75rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#0070f3",
            color: "#fff",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send Magic Link
        </button>
      </form>
    </main>
  );
}
