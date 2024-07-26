import mongoose, { connect } from "mongoose";
import { AppConfig } from "../env.config.js";

let connection = null;
const options = {
  serverSelectionTimeoutMS: 5000, // Timeout for server selection
  retryWrites: true, // Enable retry writes
  retryReads: true, // Enable retry reads
  bufferCommands: false, // Disable mongoose buffering,
  connectTimeoutMS: 10000
};

const ConnectDB = async (MONGO_URI) => {
  if(connection == null) {
    connection = await connect( MONGO_URI, options )
      .catch(err => {
        if (err.code === 'ETIMEDOUT') {
          console.error('Connection timed out!', err);
        } else {
          console.error('Connection error:', err);
        }
      })
    console.log('New database connection established.');
  }

  return connection;
};

if (mongoose.connection) {
  mongoose.connection.on('error', err => {
    console.error('Connection error:', err);
  });
}

const syncIndexes = async (model) => {
  if (!(typeof model.syncIndexes === "function")) {
    throw new Error("Invalid argument: Not a Mongoose Model");
  }

  const result = {};
  try {
    await ConnectDB(AppConfig.MONGO_URI);
    await model.syncIndexes();

    result["success"] = true;
    result["message"] = `Indexes synced for model: ${model.modelName}`;
  } catch (error) {
    result["success"] = false;
    result["message"] = `Error syncing indexes for model: ${model.modelName}`;
    result["error"] = error.message;
  } finally {
    result["memoryUsage"] = process.memoryUsage();
    mongoose.connection.close();
    return result;
  }
};

export { ConnectDB, syncIndexes };
