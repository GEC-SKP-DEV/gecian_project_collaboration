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
    await db.insert(users).values([
      { uid: "student1", userRole: "student" },
      { uid: "student2", userRole: "student" },
      { uid: "student3", userRole: "student" },
    ]);
    console.log("✅ Dummy users inserted");

    // ---------------- Insert Categories ----------------
    const insertedCategories = await db
      .insert(categories)
      .values([
        { category: "Project Type" },
        { category: "Department" },
        { category: "Programming Language" },
        { category: "Year of Submission" },
        { category: "Domain" },
      ])
      .returning({ id: categories.categoryId, name: categories.category });
    console.log("✅ Categories inserted");

    // Map category names to IDs
    const catId = (name: string) => insertedCategories.find(c => c.name === name)!.id;

    // ---------------- Insert Category Option Values ----------------
    const insertedOptions = await db
      .insert(categoryOptionValues)
      .values([
        // Project Type
        { optionName: "Web Development", categoryId: catId("Project Type") },
        { optionName: "Android Development", categoryId: catId("Project Type") },
        { optionName: "IoT", categoryId: catId("Project Type") },
        { optionName: "AI/ML", categoryId: catId("Project Type") },

        // Departments
        { optionName: "CSE", categoryId: catId("Department") },
        { optionName: "ECE", categoryId: catId("Department") },
        { optionName: "MECH", categoryId: catId("Department") },
        { optionName: "CIVIL", categoryId: catId("Department") },
        { optionName: "IT", categoryId: catId("Department") },
        { optionName: "EEE", categoryId: catId("Department") },

        // Programming Languages
        { optionName: "Python", categoryId: catId("Programming Language") },
        { optionName: "Java", categoryId: catId("Programming Language") },
        { optionName: "C++", categoryId: catId("Programming Language") },
        { optionName: "JavaScript", categoryId: catId("Programming Language") },
        { optionName: "Kotlin", categoryId: catId("Programming Language") },

        // Year of Submission
        { optionName: "2025", categoryId: catId("Year of Submission") },

        // Domain
        { optionName: "Education", categoryId: catId("Domain") },
        { optionName: "Agriculture", categoryId: catId("Domain") },
        { optionName: "Campus", categoryId: catId("Domain") },
      ])
      .returning({ id: categoryOptionValues.optionId, name: categoryOptionValues.optionName });
    console.log("✅ Category option values inserted");

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
    console.log("✅ Projects inserted");

    // ---------------- Link Projects with Options ----------------
    const projectOptionData = [
      // AI Chatbot
      { projectId: insertedProjects[0].id, categoryId: catId("Project Type"), optionId: getOptionId("AI/ML") },
      { projectId: insertedProjects[0].id, categoryId: catId("Department"), optionId: getOptionId("CSE") },
      { projectId: insertedProjects[0].id, categoryId: catId("Programming Language"), optionId: getOptionId("Python") },
      { projectId: insertedProjects[0].id, categoryId: catId("Year of Submission"), optionId: getOptionId("2025") },
      { projectId: insertedProjects[0].id, categoryId: catId("Domain"), optionId: getOptionId("Education") },

      // Smart Irrigation
      { projectId: insertedProjects[1].id, categoryId: catId("Project Type"), optionId: getOptionId("IoT") },
      { projectId: insertedProjects[1].id, categoryId: catId("Department"), optionId: getOptionId("MECH") },
      { projectId: insertedProjects[1].id, categoryId: catId("Programming Language"), optionId: getOptionId("Java") },
      { projectId: insertedProjects[1].id, categoryId: catId("Year of Submission"), optionId: getOptionId("2025") },
      { projectId: insertedProjects[1].id, categoryId: catId("Domain"), optionId: getOptionId("Agriculture") },

      // Campus Navigation
      { projectId: insertedProjects[2].id, categoryId: catId("Project Type"), optionId: getOptionId("Android Development") },
      { projectId: insertedProjects[2].id, categoryId: catId("Department"), optionId: getOptionId("CSE") },
      { projectId: insertedProjects[2].id, categoryId: catId("Programming Language"), optionId: getOptionId("Kotlin") },
      { projectId: insertedProjects[2].id, categoryId: catId("Year of Submission"), optionId: getOptionId("2025") },
      { projectId: insertedProjects[2].id, categoryId: catId("Domain"), optionId: getOptionId("Campus") },
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
