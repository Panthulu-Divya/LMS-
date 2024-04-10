const { PrismaClient } = require("@prisma/client");

const db  = new PrismaClient();

async function main() {
    try{
        await db.category.createMany({
            data:[
                { name : "DSA" },
                { name : "Frontend Development" },
                { name : "Backend Development" },
                { name : "Full Stack Development" },
                { name : "CP" },
                { name : "Devops" },
            ]
        });
        console.log("success");
    } catch (err) {
        console.log("Error seeding the database category");
    } finally {
        await db.$disconnect();
    }
}

main();