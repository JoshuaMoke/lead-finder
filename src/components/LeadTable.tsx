"use client";

type Lead = {
  id: string;
  name: string;
  city: string | null;
  score: number;
  status: string;
};

type LeadTableProps = {
  leads: Lead[];
};

export default function LeadTable({ leads }: LeadTableProps) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ddd" }}>Name</th>
          <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ddd" }}>City</th>
          <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ddd" }}>Score</th>
          <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #ddd" }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
              <a
                href={`/leads/${lead.id}`}
                style={{ textDecoration: "underline", color: "#2563eb", cursor: "pointer" }}
              >
                {lead.name}
              </a>
            </td>
            <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
              {lead.city ?? ""}
            </td>
            <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
              {lead.score}
            </td>
            <td style={{ padding: 8, borderBottom: "1px solid " + "#eee" }}>
              {lead.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
