require("dotenv").config();
const Admin = require("../models/Admin");
const { connectDatabase } = require("../config/database");
const { env } = require("../config/env");

async function seedAdmin() {
  await connectDatabase();

  if (!env.ADMIN_SEED_EMAIL || !env.ADMIN_SEED_PASSWORD) {
    throw new Error("ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD are required");
  }

  const existing = await Admin.findOne({ email: env.ADMIN_SEED_EMAIL });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await Admin.create({
    name: env.ADMIN_SEED_NAME || "Portfolio Admin",
    email: env.ADMIN_SEED_EMAIL,
    password: env.ADMIN_SEED_PASSWORD
  });

  console.log("Admin seeded");
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
