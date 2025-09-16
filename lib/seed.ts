import { db } from "@/lib/db";
import {
  users,
  projects,
  categories,
  categoryOptionValues,
  projectOptions,
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
        { optionName: "Research Project", categoryId: catId("Project Type") },
        { optionName: "Personal Project", categoryId: catId("Project Type") },
        { optionName: "Others ", categoryId: catId("Project Type") },


        // Departments
        { optionName: "CSE", categoryId: catId("Department") },
        { optionName: "ECE", categoryId: catId("Department") },
        { optionName: "MECH", categoryId: catId("Department") },
        { optionName: "CIVIL", categoryId: catId("Department") },
        { optionName: "IT", categoryId: catId("Department") },
        { optionName: "EEE", categoryId: catId("Department") },

        

        // Year of Submission
        { optionName: "2025", categoryId: catId("Year of Submission") },
        { optionName: "2024", categoryId: catId("Year of Submission") },
        { optionName: "2023", categoryId: catId("Year of Submission") },




        // Domain
{ optionName: "Web Development", categoryId: catId("Domain") },
{ optionName: "Mobile App Development", categoryId: catId("Domain") },
{ optionName: "AI/ML", categoryId: catId("Domain") },
{ optionName: "Data Science / Analytics", categoryId: catId("Domain") },
{ optionName: "IoT / Embedded Systems", categoryId: catId("Domain") },
{ optionName: "Cloud Computing", categoryId: catId("Domain") },
{ optionName: "Cybersecurity", categoryId: catId("Domain") },
{ optionName: "Blockchain", categoryId: catId("Domain") },
{ optionName: "AR/VR", categoryId: catId("Domain") },
{ optionName: "Robotics", categoryId: catId("Domain") },
{ optionName: "Networking / Communication", categoryId: catId("Domain") },
{ optionName: "Game Development", categoryId: catId("Domain") },
{ optionName: "Database Systems", categoryId: catId("Domain") },
{ optionName: "Simulation & Modeling", categoryId: catId("Domain") },
{ optionName: "Control Systems", categoryId: catId("Domain") },
{ optionName: "Mechanical Design / CAD", categoryId: catId("Domain") },
{ optionName: "Civil Structural Design", categoryId: catId("Domain") },
{ optionName: "Renewable Energy / Electrical Systems", categoryId: catId("Domain") },
{ optionName: "Biotechnology / Bioinformatics", categoryId: catId("Domain") },
{ optionName: "Chemical Process Design", categoryId: catId("Domain") },
{ optionName: "Power Systems", categoryId: catId("Domain") },
{ optionName: "Electrical Machines", categoryId: catId("Domain") },
{ optionName: "Control Systems", categoryId: catId("Domain") },
{ optionName: "Renewable Energy Systems", categoryId: catId("Domain") },
{ optionName: "Power Electronics", categoryId: catId("Domain") },
{ optionName: "Instrumentation & Measurements", categoryId: catId("Domain") },
{ optionName: "Smart Grids", categoryId: catId("Domain") },
{ optionName: "Embedded Systems in EEE", categoryId: catId("Domain") },
{ optionName: "Electric Vehicle Systems", categoryId: catId("Domain") },
{ optionName: "Other EEE Domain", categoryId: catId("Domain") },
{ optionName: "Other CSE Domain", categoryId: catId("Domain") },
{ optionName: "Other MECH Domain", categoryId: catId("Domain") },
{ optionName: "Other ECE Domain", categoryId: catId("Domain") },
{ optionName: "Other CIVIL Domain", categoryId: catId("Domain") },
{ optionName: "Other IT Domain", categoryId: catId("Domain") },
{ optionName: "Other EEE Domain", categoryId: catId("Domain") },
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
      projectDescription: "A chatbot that answers student queries about courses and schedules. Needs help with improving NLP accuracy, adding more course data, and integration with the university portal.",
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
      projectDescription: "IoT-based irrigation system to optimize water usage. Needs help with sensor calibration, mobile app connectivity, and cloud data analytics for water optimization.",
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
      projectDescription: "Mobile app to help new students navigate campus buildings. Needs help with map integration, real-time location tracking, and accessibility features for visually impaired students.",
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
      { projectId: insertedProjects[0].id, categoryId: catId("Project Type"), optionId: getOptionId("Personal Project") },
      { projectId: insertedProjects[0].id, categoryId: catId("Department"), optionId: getOptionId("CSE") },
      { projectId: insertedProjects[0].id, categoryId: catId("Year of Submission"), optionId: getOptionId("2025") },
      { projectId: insertedProjects[0].id, categoryId: catId("Domain"), optionId: getOptionId("AI/ML") },

      // Smart Irrigation
      { projectId: insertedProjects[1].id, categoryId: catId("Project Type"), optionId: getOptionId("Personal Project") },
      { projectId: insertedProjects[1].id, categoryId: catId("Department"), optionId: getOptionId("MECH") },
      { projectId: insertedProjects[1].id, categoryId: catId("Year of Submission"), optionId: getOptionId("2025") },
      { projectId: insertedProjects[1].id, categoryId: catId("Domain"), optionId: getOptionId("IoT / Embedded Systems") },

      // Campus Navigation
      { projectId: insertedProjects[2].id, categoryId: catId("Project Type"), optionId: getOptionId("Personal Project") },
      { projectId: insertedProjects[2].id, categoryId: catId("Department"), optionId: getOptionId("CSE") },
      { projectId: insertedProjects[2].id, categoryId: catId("Year of Submission"), optionId: getOptionId("2025") },
      { projectId: insertedProjects[2].id, categoryId: catId("Domain"), optionId: getOptionId("Web Development") },
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
