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
// nginx: # Load Balancer
// image: nginx:latest
// volumes:
//   - ./nginx.conf:/etc/nginx/nginx.conf:ro
// depends_on:
//   - bun-hackathon_1
//   - bun-hackathon_2
// ports:
//   - "4000:4000"
// deploy:
//   resources:
//     limits:
//       cpus: "0.25"
//       memory: "0.5GB"
