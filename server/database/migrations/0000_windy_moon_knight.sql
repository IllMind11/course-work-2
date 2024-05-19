CREATE TABLE `materials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`material_id` integer,
	`year` integer NOT NULL,
	`month` integer NOT NULL,
	`starting_balance` integer NOT NULL,
	`ending_balance` integer NOT NULL,
	`receipts_accountable` integer NOT NULL,
	`receipts_warehouse` integer NOT NULL,
	`issues_production` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`material_id`) REFERENCES `materials`(`id`) ON UPDATE no action ON DELETE no action
);
