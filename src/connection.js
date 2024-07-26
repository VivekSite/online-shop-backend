import mongoose from 'mongoose';
let connection = null;

const connectToMongoDatabase = async (MONGO_URI) => {
  if (connection == null) {
    connection = await mongoose.connect(MONGO_URI, {
      bufferCommands: false, // Disable mongoose buffering,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    }).catch(err => {
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

export default connectToMongoDatabase;