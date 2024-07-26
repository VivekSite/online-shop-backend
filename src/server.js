import { ConnectDB } from './utils/db.util.js';
import { AppConfig } from './env.config.js';
import app from './app.js';


validateEnv().then(
  app.listen(AppConfig.PORT, async () => {
    console.log(`Server is running on port ${AppConfig.PORT}`);
    await ConnectDB(AppConfig.MONGO_URI);
  })
)

async function validateEnv() {
  if (!AppConfig.PORT) {
    console.error("PORT is undefined!")
    process.exit(1)
  }

  if (!AppConfig.MONGO_URI) {
    console.error("MONGO_URI is undefined!")
    process.exit(1)
  }

}

