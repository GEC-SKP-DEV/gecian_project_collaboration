CREATE TABLE "categories" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"category" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category_option_values" (
	"option_id" serial PRIMARY KEY NOT NULL,
	"option_name" varchar(255) NOT NULL,
	"category_id" integer
);
--> statement-breakpoint
CREATE TABLE "project_options" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"category_id" integer,
	"option_id" integer
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"project_id" serial PRIMARY KEY NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"project_description" text,
	"project_link" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"created_by_uid" varchar(255),
	"custom_domain" varchar(255),
	"contact_instagram" varchar(255),
	"contact_linkedin" varchar(255),
	"contact_email" varchar(255),
	"contact_whatsapp" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"member_id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"name" varchar(100),
	"linkedin" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"uid" varchar(255) PRIMARY KEY NOT NULL,
	"user_role" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "category_option_values" ADD CONSTRAINT "category_option_values_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_options" ADD CONSTRAINT "project_options_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("project_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_options" ADD CONSTRAINT "project_options_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_options" ADD CONSTRAINT "project_options_option_id_category_option_values_option_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."category_option_values"("option_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_uid_users_uid_fk" FOREIGN KEY ("created_by_uid") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("project_id") ON DELETE no action ON UPDATE no action;