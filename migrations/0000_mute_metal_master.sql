CREATE TABLE "detections" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_ip" varchar,
	"crop_type" text NOT NULL,
	"image_data" text NOT NULL,
	"disease_name" text NOT NULL,
	"confidence" integer NOT NULL,
	"description" text NOT NULL,
	"symptoms" text NOT NULL,
	"treatment" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farming_cycles" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"farmer_name" text NOT NULL,
	"crop" text NOT NULL,
	"location" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farming_stages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cycle_id" varchar NOT NULL,
	"stage_name" text NOT NULL,
	"description" text NOT NULL,
	"date" timestamp NOT NULL,
	"image_url" text,
	"video_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fertilizer_history" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_ip" varchar,
	"crop" text NOT NULL,
	"area" text NOT NULL,
	"unit" text NOT NULL,
	"result" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "soil_history" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_ip" varchar,
	"location" text NOT NULL,
	"result" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "training_data" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_data" text NOT NULL,
	"disease_name" text NOT NULL,
	"user_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"ip" varchar PRIMARY KEY NOT NULL,
	"device_info" text,
	"user_agent" text,
	"country" text,
	"city" text,
	"region" text,
	"analysis_count" integer DEFAULT 0 NOT NULL,
	"last_seen" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
