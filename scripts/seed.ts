const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Data Structure & Algorithm" },
        { name: "Development" },
        { name: "Devops" },
        { name: "Data Science" },
        { name: "AI & ML" },
      ],
    });
    console.log("success");
  } catch (err) {
    console.log("Error seeding the database category");
  } finally {
    await db.$disconnect();
  }
}

main();

