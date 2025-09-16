type PageProps = { params: { id: string } };

export default function LeadDetailPage({ params }: PageProps) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Lead Detail</h1>
      <p>Lead ID: {params.id}</p>
      <p>(Routing works. We’ll load real data next.)</p>
    </main>
  );
}
