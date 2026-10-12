import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const campaignLeads = sqliteTable(
  "campaign_leads",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    firstName: text("first_name").notNull().default(""),
    company: text("company").notNull().default(""),
    role: text("role").notNull().default(""),
    vacancyHook: text("vacancy_hook").notNull().default(""),
    personalObservation: text("personal_observation").notNull().default(""),
    status: text("status").notNull().default("active"),
    unsubscribeToken: text("unsubscribe_token").notNull(),
    source: text("source").notNull().default("vacature"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    emailIdx: uniqueIndex("idx_campaign_leads_email").on(table.email),
    unsubscribeTokenIdx: uniqueIndex("idx_campaign_leads_unsubscribe_token").on(table.unsubscribeToken),
    statusIdx: index("idx_campaign_leads_status").on(table.status),
  }),
);

export const campaignSuppressions = sqliteTable(
  "campaign_suppressions",
  {
    email: text("email").primaryKey(),
    reason: text("reason").notNull().default("unsubscribed"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
);

export const campaignScheduledEmails = sqliteTable(
  "campaign_scheduled_emails",
  {
    id: text("id").primaryKey(),
    leadId: text("lead_id").notNull(),
    step: integer("step").notNull(),
    campaignSlug: text("campaign_slug").notNull().default("content-engine-vacature-leads"),
    template: text("template").notNull(),
    subject: text("subject").notNull(),
    scheduledAt: text("scheduled_at").notNull(),
    status: text("status").notNull().default("queued"),
    providerMessageId: text("provider_message_id"),
    lastError: text("last_error"),
    sentAt: text("sent_at"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    leadStepIdx: uniqueIndex("idx_campaign_scheduled_lead_step").on(table.leadId, table.step),
    dueIdx: index("idx_campaign_scheduled_due").on(table.status, table.scheduledAt),
  }),
);

export const campaignEvents = sqliteTable("campaign_events", {
  id: text("id").primaryKey(),
  leadId: text("lead_id"),
  email: text("email").notNull().default(""),
  type: text("type").notNull(),
  detail: text("detail").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
