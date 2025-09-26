"use client"
import Link from "next/link"

type Lead = { id: string; name: string; city: string | null; score: number; status: string }

export default function LeadTable({ leads }: { leads: Lead[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Name</th>
          <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>City</th>
          <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Score</th>
          <th style={{ borderBottom: "1px solid #ccc", textAlign: "left", padding: 8 }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
              <Link href={`/leads/${lead.id}`}>{lead.name}</Link>
            </td>
            <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{lead.city ?? "—"}</td>
            <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{lead.score}</td>
            <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{lead.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
