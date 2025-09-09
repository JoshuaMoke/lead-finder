// src/app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

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
      <h1 style={{ fontSize: "2rem" }}>Welcome to Lead Finder 🚀</h1>

      {!session ? (
        <>
          <p>Please sign in to access your dashboard.</p>
          <a
            href="/api/auth/signin"
            style={{
              background: "#0070f3",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Sign in
          </a>
        </>
      ) : (
        <>
          <p>
            Signed in as <strong>{session.user?.email}</strong>
          </p>
          <a
            href="/dashboard"
            style={{
              background: "#444",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Go to Dashboard
          </a>
          <a
            href="/api/auth/signout"
            style={{
              background: "#e00",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Sign out
          </a>
        </>
      )}
    </main>
  );
}
