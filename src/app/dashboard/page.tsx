// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
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
        <h1 style={{ fontSize: "1.5rem" }}>Not signed in</h1>
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
      </main>
    );
  }

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
      <h1 style={{ fontSize: "2rem" }}>Dashboard</h1>
      <p>
        Signed in as <strong>{session.user?.email}</strong>
      </p>
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
    </main>
  );
}
