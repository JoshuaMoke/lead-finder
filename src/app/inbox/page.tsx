import { prisma } from "@/lib/prisma";
import LeadTable from "@/components/LeadTable";

export default async function InboxPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, city: true, score: true, status: true },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Inbox</h1>
      <LeadTable leads={leads as any} />
    </main>
  );
}
