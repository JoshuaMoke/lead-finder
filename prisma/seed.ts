// prisma/seed.ts
import { PrismaClient, ActivityType, LeadStatus } from "@prisma/client"
import { randomUUID } from "crypto"

const prisma = new PrismaClient()
const uid = () => randomUUID()

async function main() {
  // 1) Tags (label is unique). Your schema requires id: String, so we provide one.
  const tagLabels = ["bar", "restaurant", "nightclub", "priority-high"]
  await Promise.all(
    tagLabels.map((label) =>
      prisma.tag.upsert({
        where: { label },
        update: {},
        create: { id: uid(), label }, // <-- NOTE: id provided
      })
    )
  )

  // Helper: attach Tag by label via join table (LeadTag)
  const connectTag = (label: string) => ({
    LeadTag: { create: [{ Tag: { connect: { label } } }] },
  })

  // 2) Leads. Your schema requires:
  //    - id: String (no default) -> we provide uid()
  //    - updatedAt: DateTime (no default) -> we provide new Date()
  //    - relations named Activity and LeadTag (NOT activities/leadTags)
  const leadsData = [
    {
      id: uid(),
      name: "Metropolitan Centre",
      city: "Toronto",
      province: "ON",
      status: LeadStatus.NEW,
      score: 60,
      source: "seed",
      website: null,
      email: null,
      phone: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      Activity: {
        create: [
          {
            id: uid(),
            type: ActivityType.NOTE,
            summary: "Initial seed note: prospect identified.",
            when: new Date(),
          },
        ],
      },
      ...connectTag("bar"),
    },
    {
      id: uid(),
      name: "Durham Convention Centre",
      city: "Oshawa",
      province: "ON",
      status: LeadStatus.VALIDATED,
      score: 70,
      source: "seed",
      website: null,
      email: null,
      phone: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      Activity: {
        create: [
          {
            id: uid(),
            type: ActivityType.NOTE,
            summary: "Validated contact info.",
            when: new Date(),
          },
        ],
      },
      ...connectTag("restaurant"),
    },
    {
      id: uid(),
      name: "612 Harlowe",
      city: "Toronto",
      province: "ON",
      status: LeadStatus.QUEUED,
      score: 80,
      source: "seed",
      website: null,
      email: null,
      phone: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      Activity: {
        create: [
          {
            id: uid(),
            type: ActivityType.NOTE,
            summary: "Needs contact info enrichment.",
            when: new Date(),
          },
        ],
      },
      ...connectTag("nightclub"),
    },
  ]

  for (const data of leadsData) {
    await prisma.lead.upsert({
      where: { id: data.id },
      update: {},
      create: data, // <-- IMPORTANT: key is `create`, not `data`
    })
  }

  console.log("Seed complete ✅")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
