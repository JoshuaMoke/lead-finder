// src/app/page.tsx

export default function HomePage() {
  return (
    <main style={{ padding: "24px", maxWidth: "640px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "16px" }}>Lead Finder</h1>
      <p style={{ marginBottom: "24px" }}>
        Welcome to your lead-finder app. Use the navigation above to explore your leads.
      </p>
      <ul>
        <li><a href="/inbox">📥 Go to Inbox</a></li>
        <li><a href="/queue">📊 View Queue</a></li>
        <li><a href="/leads/new">➕ Add a new Lead</a></li>
      </ul>
    </main>
  );
}
