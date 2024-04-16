
import mongoose, { Mongoose } from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  mongoose.set('strictQuery', true);

  try {
    if (global.mongoose && global.mongoose.conn) {
      return global.mongoose.conn;
    } else {

      const connectionString = process.env.MONGO_DB_URI;
      mongoose.connect(connectionString, {
        dbName: 'online-store',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const promise = mongoose.connection;

      global.mongoose = {
        conn: await promise,
        promise,
      };

      console.log("Connected to the database");
      return promise;
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};
