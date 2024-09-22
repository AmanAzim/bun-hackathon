import { MongoClient } from "mongodb";

const dbName = Bun.env.MONGO_DB_NAME || "hackathon_db_24";
let client: MongoClient;

async function connectClient(url: string) {
  if (client) {
    return client;
  }

  client = new MongoClient(url);

  await client.connect();

  return client;
}

export default {
  connect: async (url: string) => await connectClient(url),
  // MongoClient must be connected before using the database
  getDb: () => client.db(dbName),
};
