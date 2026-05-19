require("dotenv").config();
const { env } = require("../config/env");

async function seedAdmin() {
  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD are required");
  }

  console.log("Admin login now uses ADMIN_USERNAME and ADMIN_PASSWORD from .env. No database seed is required.");
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
