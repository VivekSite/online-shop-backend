import db_connect from './connection.js';
import AppConfig from './config.js';
import app from './app.js';


validateEnv().then(
  db_connect(AppConfig.MONGO_URI).then(
    app.listen(AppConfig.PORT, async () => {
      console.log(`Server is running on port ${AppConfig.PORT}`);
    })
  )
)

async function validateEnv() {
  if (!AppConfig.PORT) {
    console.error("PORT is undefined!")
    exit(1);
  }

  if (!AppConfig.MONGO_URI) {
    console.error("MONGO_URI is undefined!")
    exit(1);
  }

}

