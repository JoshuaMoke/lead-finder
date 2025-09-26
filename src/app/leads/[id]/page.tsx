import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type PageProps = { params: Promise<{ id: string }> } // Next 15: params is async

const STATUSES = ["NEW","VALIDATED","QUEUED","CONTACTED","BOOKED","WON","LOST"] as const

// --- Server Actions ---
async function updateStatus(formData: FormData) {
  "use server"
  const id = String(formData.get("id") ?? "")
  const statusStr = String(formData.get("status") ?? "")
  if (!id || !STATUSES.includes(statusStr as any)) return

  await prisma.lead.update({
    where: { id },
    data: { status: statusStr as any },
  })

  revalidatePath(`/leads/${id}`)
}

async function updateScore(formData: FormData) {
  "use server"
  const id = String(formData.get("id") ?? "")
  const delta = Number(formData.get("delta") ?? 0)
  if (!id) return

  await prisma.lead.update({
    where: { id },
    data: { score: { increment: delta } },
  })

  revalidatePath(`/leads/${id}`)
}

export default async function LeadDetailPage({ params }: PageProps) {
  // IMPORTANT: await params (Next 15)
  const { id } = await params

  // IMPORTANT: use Activity and LeadTag (NOT activities/leadTags)
  const lead: any = await prisma.lead.findUnique({
    where: { id },
    include: {
      Activity: {
        orderBy: { when: "desc" as const },
        select: { id: true, type: true, summary: true, when: true },
      },
      LeadTag: {
        select: { Tag: { select: { id: true, label: true } } },
      },
    },
  })

  if (!lead) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Lead not found</h1>
        <p>ID: {id}</p>
      </main>
    )
  }

  const tagLabels: string[] = (lead.LeadTag ?? [])
    .map((t: any) => t.Tag?.label ?? "")
    .filter(Boolean)

  return (
    <main style={{ padding: 24, display: "grid", gap: 16, maxWidth: 900 }}>
      {/* Header */}
      <header>
        <h1 style={{ marginBottom: 4 }}>{lead.name}</h1>
        <p style={{ color: "#555" }}>
          {lead.city ?? "—"}
          {lead.province ? `, ${lead.province}` : ""}
        </p>
      </header>

      {/* Summary + Controls */}
      <section style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, display: "grid", gap: 12 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <div><strong>Phone:</strong> {lead.phone ?? "—"}</div>
          <div><strong>Email:</strong> {lead.email ?? "—"}</div>
          <div>
            <strong>Website:</strong>{" "}
            {lead.website ? <a href={lead.website} target="_blank" rel="noreferrer">{lead.website}</a> : "—"}
          </div>
          <div><strong>Source:</strong> {lead.source ?? "—"}</div>
          <div><strong>Tags:</strong> {tagLabels.length ? tagLabels.join(", ") : "—"}</div>
          <div style={{ color: "#777", fontSize: 12 }}>
            Created: {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "—"} ·{" "}
            Updated: {lead.updatedAt ? new Date(lead.updatedAt).toLocaleString() : "—"}
          </div>
        </div>

        {/* Status control */}
        <form action={updateStatus} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="hidden" name="id" value={lead.id} />
          <label htmlFor="status"><strong>Status:</strong></label>
          <select
            id="status"
            name="status"
            defaultValue={String(lead.status)}
            style={{ padding: 6, border: "1px solid #ddd", borderRadius: 8 }}
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button type="submit" style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 8, background: "#f8f8f8", cursor: "pointer" }}>
            Update
          </button>
        </form>

        {/* Score control */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <strong>Score:</strong> {lead.score}
          <form action={updateScore}>
            <input type="hidden" name="id" value={lead.id} />
            <input type="hidden" name="delta" value={-1} />
            <button type="submit" style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 8, background: "#f8f8f8", cursor: "pointer" }}>−</button>
          </form>
          <form action={updateScore}>
            <input type="hidden" name="id" value={lead.id} />
            <input type="hidden" name="delta" value={1} />
            <button type="submit" style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 8, background: "#f8f8f8", cursor: "pointer" }}>+</button>
          </form>
        </div>
      </section>

      {/* Activities */}
      <section style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, display: "grid", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Activities</h2>
        {lead.Activity.length === 0 ? (
          <p style={{ color: "#777" }}>No activities yet.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {lead.Activity.map((a: any) => (
              <li key={a.id} style={{ marginBottom: 8 }}>
                <strong>{a.type}</strong> — {a.summary}{" "}
                <span style={{ color: "#777" }}>
                  ({a.when ? new Date(a.when).toLocaleString() : "—"})
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
