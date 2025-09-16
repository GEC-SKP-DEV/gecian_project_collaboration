import { db } from "@/lib/db";
import {
  users,
  projects,
  categories,
  categoryOptionValues,
  projectOptions,
  teamMembers,
} from "@/lib/schema";

async function seed() {
  try {
    // ---------------- Insert Dummy Users ----------------
    const insertedUsers = await db.insert(users).values([
      { uid: "student1", userRole: "student" },
      { uid: "student2", userRole: "student" },
      { uid: "student3", userRole: "student" },
    ]);
    console.log("✅ Dummy users inserted");

    // ---------------- Insert Categories ----------------
    const insertedCategories = await db
      .insert(categories)
      .values([
        { category: "Project Type" },       // id will be returned
        { category: "Department" },
        { category: "Programming Language" },
      ])
      .returning({ id: categories.categoryId, name: categories.category });
    console.log("✅ Categories inserted", insertedCategories);

    // ---------------- Insert Category Option Values ----------------
    // Use dynamic IDs from insertedCategories
    const projectTypeId = insertedCategories.find(c => c.name === "Project Type")!.id;
    const departmentId = insertedCategories.find(c => c.name === "Department")!.id;
    const languageId = insertedCategories.find(c => c.name === "Programming Language")!.id;

    const insertedOptions = await db
      .insert(categoryOptionValues)
      .values([
        // Project Type
        { optionName: "Web Development", categoryId: projectTypeId },
        { optionName: "Android Development", categoryId: projectTypeId },
        { optionName: "IoT", categoryId: projectTypeId },
        { optionName: "AI/ML", categoryId: projectTypeId },

        // Departments
        { optionName: "CSE", categoryId: departmentId },
        { optionName: "ECE", categoryId: departmentId },
        { optionName: "MECH", categoryId: departmentId },
        { optionName: "CIVIL", categoryId: departmentId },
        { optionName: "IT", categoryId: departmentId },
        { optionName: "EEE", categoryId: departmentId },

        // Programming Languages
        { optionName: "Python", categoryId: languageId },
        { optionName: "Java", categoryId: languageId },
        { optionName: "C++", categoryId: languageId },
        { optionName: "JavaScript", categoryId: languageId },
        { optionName: "Kotlin", categoryId: languageId },
      ])
      .returning({ id: categoryOptionValues.optionId, name: categoryOptionValues.optionName });
    console.log("✅ Category option values inserted", insertedOptions);

    // Helper to get option ID by name
    const getOptionId = (name: string) => insertedOptions.find(o => o.name === name)!.id;

    // ---------------- Insert Projects ----------------
    const insertedProjects = await db
      .insert(projects)
      .values([
        {
          projectName: "AI Chatbot for University",
          projectDescription: "A chatbot that answers student queries about courses and schedules.",
          projectLink: "https://github.com/example/chatbot",
          createdByUid: "student1",
          customDomain: "chatbot.gecianhub.com",
          contactEmail: "chatbot@example.com",
          contactLinkedIn: "https://linkedin.com/in/team-chatbot",
          contactInstagram: "@chatbot_team",
          contactWhatsApp: "+911234567890",
        },
        {
          projectName: "Smart Irrigation System",
          projectDescription: "IoT-based irrigation system to optimize water usage.",
          projectLink: "https://github.com/example/irrigation",
          createdByUid: "student2",
          customDomain: null,
          contactEmail: "irrigation@example.com",
          contactLinkedIn: "https://linkedin.com/in/team-irrigation",
          contactInstagram: "@irrigation_project",
          contactWhatsApp: "+919876543210",
        },
        {
          projectName: "Campus Navigation App",
          projectDescription: "Mobile app to help new students navigate campus buildings.",
          projectLink: "https://github.com/example/campus-nav",
          createdByUid: "student3",
          customDomain: "campusnav.gecianhub.com",
          contactEmail: "navapp@example.com",
          contactLinkedIn: "https://linkedin.com/in/campusnav",
          contactInstagram: "@campus_nav",
          contactWhatsApp: "+917700112233",
        },
      ])
      .returning({ id: projects.projectId, name: projects.projectName });
    console.log("✅ Projects inserted successfully", insertedProjects);

    // ---------------- Link Projects with Options ----------------
    const projectOptionData = [
      // AI Chatbot
      { projectId: insertedProjects[0].id, categoryId: projectTypeId, optionId: getOptionId("AI/ML") },
      { projectId: insertedProjects[0].id, categoryId: departmentId, optionId: getOptionId("CSE") },
      { projectId: insertedProjects[0].id, categoryId: languageId, optionId: getOptionId("Python") },

      // Smart Irrigation
      { projectId: insertedProjects[1].id, categoryId: projectTypeId, optionId: getOptionId("IoT") },
      { projectId: insertedProjects[1].id, categoryId: departmentId, optionId: getOptionId("MECH") },
      { projectId: insertedProjects[1].id, categoryId: languageId, optionId: getOptionId("Java") },

      // Campus Navigation
      { projectId: insertedProjects[2].id, categoryId: projectTypeId, optionId: getOptionId("Android Development") },
      { projectId: insertedProjects[2].id, categoryId: departmentId, optionId: getOptionId("CSE") },
      { projectId: insertedProjects[2].id, categoryId: languageId, optionId: getOptionId("Kotlin") },
    ];

    await db.insert(projectOptions).values(projectOptionData);
    console.log("✅ Projects linked with categories and options");

    console.log("🎉 Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
}

seed();
