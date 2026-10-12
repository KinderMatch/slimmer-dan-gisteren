CREATE TABLE `campaign_events` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text,
	`email` text DEFAULT '' NOT NULL,
	`type` text NOT NULL,
	`detail` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `campaign_leads` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`first_name` text DEFAULT '' NOT NULL,
	`company` text DEFAULT '' NOT NULL,
	`role` text DEFAULT '' NOT NULL,
	`vacancy_hook` text DEFAULT '' NOT NULL,
	`personal_observation` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`unsubscribe_token` text NOT NULL,
	`source` text DEFAULT 'vacature' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_campaign_leads_email` ON `campaign_leads` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_campaign_leads_unsubscribe_token` ON `campaign_leads` (`unsubscribe_token`);--> statement-breakpoint
CREATE TABLE `campaign_scheduled_emails` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`step` integer NOT NULL,
	`campaign_slug` text DEFAULT 'content-engine-vacature-leads' NOT NULL,
	`template` text NOT NULL,
	`subject` text NOT NULL,
	`scheduled_at` text NOT NULL,
	`status` text DEFAULT 'queued' NOT NULL,
	`provider_message_id` text,
	`last_error` text,
	`sent_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_campaign_scheduled_lead_step` ON `campaign_scheduled_emails` (`lead_id`,`step`);--> statement-breakpoint
CREATE TABLE `campaign_suppressions` (
	`email` text PRIMARY KEY NOT NULL,
	`reason` text DEFAULT 'unsubscribed' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
