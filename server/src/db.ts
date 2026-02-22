import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
console.log("MONGODB_URI loaded?", Boolean(uri)); // ✅ should print true

const client = new MongoClient(uri);

let cachedDb: any = null;

export async function getDb() {
  if (cachedDb) return cachedDb;
  await client.connect();
  const dbName = process.env.MONGODB_DB || "ecoforecast";
  cachedDb = client.db(dbName);
  console.log("✅ Connected DB name:", cachedDb.databaseName);
  return cachedDb;
}