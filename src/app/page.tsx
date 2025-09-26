import Link from "next/link"

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Lead Finder</h1>
      <p>Go to your <Link href="/inbox">Inbox</Link>.</p>
    </main>
  )
}
