import mongoose from 'mongoose';

import { config } from '@/lib/config/config';

if (!config.mongoose.url) {
  throw new Error('Please define the MONGO_URI environment variable');
}

/**
 * Global is used to maintain a cached connection across hot reloads in development.
 * This prevents connections from being recreated excessively.
 */
// @ts-expect-error: un known error need to fix it in future
let cached = global.mongoose as {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

if (!cached) {
  // @ts-expect-error: un known error need to fix it in future
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options: mongoose.ConnectOptions = {};

    cached.promise = mongoose
      .connect(config.mongoose.url as string, options)
      .then((mongoose) => {
        return mongoose.connection;
      })
      .catch((err) => {
        // console.error('Database connection error:', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
