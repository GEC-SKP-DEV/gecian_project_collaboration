import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
  foreignKey,
} from "drizzle-orm/pg-core";

// -------------------- Users --------------------
export const users = pgTable("users", {
  uid: varchar("uid", { length: 255 }).primaryKey(),
  userRole: varchar("user_role", { length: 50 }).notNull(),
});


// -------------------- Categories --------------------
export const categories = pgTable("categories", {
  categoryId: serial("category_id").primaryKey(),
  category: varchar("category", { length: 100 }).notNull(), // e.g. Project Type, Department, Programming Language
});

// -------------------- Projects --------------------
export const projects = pgTable("projects", {
  projectId: serial("project_id").primaryKey(),
  projectName: varchar("project_name", { length: 255 }).notNull(),
  projectDescription: text("project_description"),
  projectLink: varchar("project_link", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  createdByUid: varchar("created_by_uid", { length: 255 }),
  customDomain: varchar("custom_domain", { length: 255 }),
  // New contact fields for collaboration
  contactInstagram: varchar("contact_instagram", { length: 255 }),
  contactLinkedIn: varchar("contact_linkedin", { length: 255 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  contactWhatsApp: varchar("contact_whatsapp", { length: 255 }),
}, (table) => ({
  fk_createdBy: foreignKey({
    columns: [table.createdByUid],
    foreignColumns: [users.uid],
  }),
}));


// -------------------- Team Members --------------------
export const teamMembers = pgTable("team_members", {
  memberId: serial("member_id").primaryKey(),
  projectId: integer("project_id"),
  name: varchar("name", { length: 100 }),
  linkedin: varchar("linkedin", { length: 255 }),
}, (table) => ({
  fk_projectId: foreignKey({
    columns: [table.projectId],
    foreignColumns: [projects.projectId],
  }),
}));


// -------------------- Generic Category Options Values --------------------
export const categoryOptionValues = pgTable("category_option_values", {
  optionId: serial("option_id").primaryKey(),
  optionName: varchar("option_name", { length: 255 }).notNull(),
  categoryId: integer("category_id"),
}, (table) => ({
  fk_categoryId: foreignKey({
    columns: [table.categoryId],
    foreignColumns: [categories.categoryId],
  }),
}));

// -------------------- Project-Category Options Link Table --------------------
export const projectOptions = pgTable("project_options", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id"),
  categoryId: integer("category_id"),
  optionId: integer("option_id"),
}, (table) => ({
  fk_projectId: foreignKey({
    columns: [table.projectId],
    foreignColumns: [projects.projectId],
  }),
  fk_categoryId: foreignKey({
    columns: [table.categoryId],
    foreignColumns: [categories.categoryId],
  }),
  fk_optionId: foreignKey({
    columns: [table.optionId],
    foreignColumns: [categoryOptionValues.optionId],
  }),
}));

  
// import {
//   pgTable,
//   serial,
//   text,
//   timestamp,
//   integer,
//   varchar,
//   primaryKey,
//   foreignKey,
// } from "drizzle-orm/pg-core";

// // -------------------- Users --------------------
// export const users = pgTable("users", {
//   uid: varchar("uid", { length: 255 }).primaryKey(),
//   userRole: varchar("user_role", { length: 50 }).notNull(),
// });


// // -------------------- Categories --------------------
// export const categories = pgTable("categories", {
//   categoryId: serial("category_id").primaryKey(),
//   category: varchar("category", { length: 100 }).notNull(), // e.g. Project Type, Department, Programming Language
// });

// // -------------------- Projects --------------------
// export const projects = pgTable("projects", {
//   projectId: serial("project_id").primaryKey(),
//   projectName: varchar("project_name", { length: 255 }).notNull(),
//   projectDescription: text("project_description"),
//   projectLink: varchar("project_link", { length: 255 }),
//   createdAt: timestamp("created_at").defaultNow(),
//   createdByUid: varchar("created_by_uid",{length: 255}).references(() => users.uid),
//   customDomain: varchar("custom_domain", { length: 255 }),
//   // These will now be handled via projectOptions table
//   // projectType: varchar("project_type", { length: 100 }),
//   // department: varchar("department", { length: 100 }),
//   // domain: varchar("domain", { length: 100 }),
//   // yearOfSubmission: varchar("year_of_submission", { length: 50 }),
// });

// // -------------------- Team Members --------------------
// export const teamMembers = pgTable("team_members", {
//   memberId: serial("member_id").primaryKey(),
//   projectId: integer("project_id").references(() => projects.projectId),
//   name: varchar("name", { length: 100 }),
//   linkedin: varchar("linkedin", { length: 255 }),
// });

// // -------------------- Generic Category Options Values --------------------
// export const categoryOptionValues = pgTable("category_option_values", {
//   optionId: serial("option_id").primaryKey(),
//   optionName: varchar("option_name", { length: 255 }).notNull(),
//   categoryId: integer("category_id").references(() => categories.categoryId).notNull(),
// });

// // -------------------- Project-Category Options Link Table --------------------
// export const projectOptions = pgTable("project_options", {
//     id: serial("id").primaryKey(),
//     projectId: integer("project_id").references(() => projects.projectId).notNull(),
//     categoryId: integer("category_id").references(() => categories.categoryId).notNull(),
//     optionId: integer("option_id").references(() => categoryOptionValues.optionId).notNull(),
//   });
  