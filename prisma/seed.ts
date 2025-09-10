import { PrismaClient, LeadStatus, ActivityType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const [bar, restaurant, nightclub, priorityHigh] = await Promise.all([
    prisma.tag.upsert({ where: { label: 'bar' }, update: {}, create: { label: 'bar' } }),
    prisma.tag.upsert({ where: { label: 'restaurant' }, update: {}, create: { label: 'restaurant' } }),
    prisma.tag.upsert({ where: { label: 'nightclub' }, update: {}, create: { label: 'nightclub' } }),
    prisma.tag.upsert({ where: { label: 'priority-high' }, update: {}, create: { label: 'priority-high' } }),
  ]);

  const lead1 = await prisma.lead.create({
    data: {
      name: '612 Harlowe',
      phone: '416-555-0123',
      email: 'contact@612harlowe.example',
      website: 'https://612harlowe.example',
      city: 'Toronto',
      province: 'ON',
      source: 'Manual',
      score: 80,
      status: LeadStatus.QUEUED,
      activities: {
        create: [
          { type: ActivityType.NOTE, summary: 'Imported manually.' },
          { type: ActivityType.CALL, summary: 'Left voicemail; call back tomorrow.' },
        ],
      },
      tags: {
        create: [
          { tag: { connect: { id: nightclub.id } } },
          { tag: { connect: { id: priorityHigh.id } } },
        ],
      },
    },
  });

  const lead2 = await prisma.lead.create({
    data: {
      name: 'Durham Convention Centre',
      phone: '905-555-0456',
      email: 'events@durhamcc.example',
      website: 'https://durhamcc.example',
      city: 'Oshawa',
      province: 'ON',
      source: 'CSV',
      score: 70,
      status: LeadStatus.VALIDATED,
      activities: {
        create: [{ type: ActivityType.VISIT, summary: 'Walk-in visit; spoke with coordinator.' }],
      },
      tags: { create: [{ tag: { connect: { id: restaurant.id } } }] },
    },
  });

  const lead3 = await prisma.lead.create({
    data: {
      name: 'Metropolitan Centre',
      city: 'Toronto',
      province: 'ON',
      source: 'Scrape:AGCO',
      score: 60,
      status: LeadStatus.NEW,
      activities: { create: [{ type: ActivityType.NOTE, summary: 'Needs contact info enrichment.' }] },
      tags: { create: [{ tag: { connect: { id: bar.id } } }] },
    },
  });

  console.log('✅ Seeded leads:', lead1.name, lead2.name, lead3.name);
}

main()
  .catch((e) => { console.error('❌ Seeding failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
