CREATE INDEX `idx_campaign_leads_status` ON `campaign_leads` (`status`);--> statement-breakpoint
CREATE INDEX `idx_campaign_scheduled_due` ON `campaign_scheduled_emails` (`status`,`scheduled_at`);