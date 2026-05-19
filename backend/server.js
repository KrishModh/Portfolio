const { app } = require("./src/app");
const { connectDatabase } = require("./src/config/database");
const { env } = require("./src/config/env");

connectDatabase().then(() => {
  app.listen(env.PORT, () => {
    console.log(`API running on port ${env.PORT}`);
  });
});
