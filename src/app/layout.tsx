export const metadata = {
  title: "Lead Finder",
  description: "Inbox → Queue → Lead Detail",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <nav style={{ padding: "12px 20px", borderBottom: "1px solid #eee" }}>
          <a href="/inbox" style={{ marginRight: 16 }}>Inbox</a>
          <a href="/queue" style={{ marginRight: 16 }}>Queue</a>
          <a href="/leads/new">Add Lead</a>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}
