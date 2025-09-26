export const metadata = {
  title: "Lead Finder",
  description: "CRM/Outreach basics"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  )
}
