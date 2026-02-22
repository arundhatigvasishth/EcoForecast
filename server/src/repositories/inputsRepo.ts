import { ObjectId } from "mongodb";
import { getDb } from "../db";
import type { QuarterlyInputs } from "../types";

export async function getQuarterlyInputsById(id: string): Promise<QuarterlyInputs | null> {
  const db = await getDb();
  const col = db.collection("inputs"); // <-- your collection name

  const doc = await col.findOne({ _id: new ObjectId(id) });

  if (!doc) return null;

  // adjust if your schema differs
  return doc.quarterlyInputs as QuarterlyInputs;
}