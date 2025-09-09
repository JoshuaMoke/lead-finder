// src/app/verify-request/page.tsx

export default function VerifyRequestPage() {
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
        padding: "1rem",
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>Check your email 📩</h1>
      <p>
        We’ve sent you a secure magic link.  
        Click it to sign in to <strong>Lead Finder</strong>.
      </p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Didn’t get the email? Check your spam folder or try again.
      </p>
    </main>
  );
}
