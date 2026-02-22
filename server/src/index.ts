import dotenv from "dotenv";
import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

import * as calcSetup from "./calculations/calcSetup";
import * as calcOutputs from "./calculations/calcOutputs";

console.log("LOADED!!!")

const app = express();
app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT) || 5000;
const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error("MONGO_URI missing in server/.env");
}

const client = new MongoClient(uri);

async function start() {
  console.log("⏳ connecting to mongo...");
await Promise.race([
  client.connect(),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Mongo connect timeout (8s)")), 8000)
  ),
]);
  console.log("✅ connected to mongo");

  // Hardcode db name for clarity (matches what you're browsing in Atlas)
  const db = client.db("ecoforecast");

  const inputsCol = db.collection("inputs");
  const outputsCol = db.collection("outputs");

  console.log("✅ DB:", db.databaseName);
  console.log("✅ Inputs collection:", inputsCol.collectionName);
  console.log("✅ Outputs collection:", outputsCol.collectionName);

  // ---------------------------
  // Health
  // ---------------------------
  app.get("/", (_req: Request, res: Response) => {
    res.send("EcoForecast backend is running ✅");
  });

  app.get("/test", (_req: Request, res: Response) => {
    res.json({ ok: true, message: "Backend + MongoDB working" });
  });

  // ---------------------------
  // Save single-quarter inputs
  // POST /api/inputs
  // ---------------------------
  app.post("/api/inputs", async (req: Request, res: Response) => {
    try {
      const doc = { ...req.body, createdAt: new Date() };
      const result = await inputsCol.insertOne(doc);
      return res.status(201).json({ ok: true, id: result.insertedId.toString() });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ ok: false, error: "Failed to save inputs" });
    }
  });

  // ---------------------------
  // Save four-quarter inputs
  // POST /api/inputs/four-quarter
  // ---------------------------
  app.post("/api/inputs/four-quarter", async (req: Request, res: Response) => {
    try {
      console.log("🔥 HIT POST /api/inputs/four-quarter");
      console.log("BODY:", JSON.stringify(req.body, null, 2));

      const doc = { ...req.body, createdAt: new Date() };
      const result = await inputsCol.insertOne(doc);

      console.log("✅ Inserted into inputs:", result.insertedId.toString());

      return res.status(201).json({
        ok: true,
        id: result.insertedId.toString(),
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ ok: false, error: "Failed to save 4-quarter inputs" });
    }
  });

  // ---------------------------
  // Latest input doc (any type)
  // GET /api/inputs/latest
  // ---------------------------
  app.get("/api/inputs/latest", async (_req: Request, res: Response) => {
    try {
      const latest = await inputsCol.find().sort({ createdAt: -1 }).limit(1).toArray();
      return res.json({ ok: true, data: latest[0] ?? null });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ ok: false, error: "Failed to fetch latest inputs" });
    }
  });

  // ---------------------------
  // Latest four-quarter doc (optionally by company)
  // GET /api/inputs/four-quarter/latest?company=XYZ
  // ---------------------------
  app.get("/api/inputs/four-quarter/latest", async (req: Request, res: Response) => {
    try {
      const company = typeof req.query.company === "string" ? req.query.company : undefined;

      const query = company ? { period: "four-quarter", company } : { period: "four-quarter" };

      const latest = await inputsCol.find(query).sort({ createdAt: -1 }).limit(1).toArray();
      return res.json({ ok: true, data: latest[0] ?? null });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ ok: false, error: "Failed to fetch latest 4-quarter inputs" });
    }
  });

  // ---------------------------
  // Get input doc by id (raw)
  // GET /api/inputs/:id
  // ---------------------------
  app.get("/api/inputs/:id", async (req, res) => {
  const rawId = req.params.id; // <-- ALWAYS a string

  if (!ObjectId.isValid(rawId)) {
    return res.status(400).json({ ok: false, error: "Invalid id" });
  }

  const doc = await inputsCol.findOne({ _id: new ObjectId(rawId) });
  if (!doc) return res.status(404).json({ ok: false, error: "Not found" });

  return res.json({ ok: true, data: doc });
});

  // ---------------------------
  // Compute + save outputs for a four-quarter inputs doc
  // GET /api/outputs/:inputId
  // ---------------------------
  app.get("/api/outputs/:inputId", async (req: Request, res: Response) => {
  try {
    // Force to string to avoid: string | string[] | undefined
    const inputIdRaw = String(req.params.inputId ?? "");

    if (!ObjectId.isValid(inputIdRaw)) {
      return res.status(400).json({ ok: false, error: "Invalid inputId" });
    }

    const inputId = new ObjectId(inputIdRaw);

    // 1) Fetch inputs doc
    const doc: any = await inputsCol.findOne({ _id: inputId });
    if (!doc) {
      return res.status(404).json({ ok: false, error: "Inputs not found" });
    }

    // 2) Ensure four-quarter format
    const q = doc.quarters;
    if (!q?.q1 || !q?.q2 || !q?.q3 || !q?.q4) {
      return res.status(400).json({
        ok: false,
        error: "Inputs doc is not four-quarter format (missing quarters.q1-q4).",
      });
    }

    // 3) Map Mongo doc -> math input shape
    const inputs = {
      electricity: [
        { q: "Q1", usage: Number(q.q1.electricity.usage), cost: Number(q.q1.electricity.amountPaid) },
        { q: "Q2", usage: Number(q.q2.electricity.usage), cost: Number(q.q2.electricity.amountPaid) },
        { q: "Q3", usage: Number(q.q3.electricity.usage), cost: Number(q.q3.electricity.amountPaid) },
        { q: "Q4", usage: Number(q.q4.electricity.usage), cost: Number(q.q4.electricity.amountPaid) },
      ],
      water: [
        { q: "Q1", usage: Number(q.q1.water.usage), cost: Number(q.q1.water.amountPaid) },
        { q: "Q2", usage: Number(q.q2.water.usage), cost: Number(q.q2.water.amountPaid) },
        { q: "Q3", usage: Number(q.q3.water.usage), cost: Number(q.q3.water.amountPaid) },
        { q: "Q4", usage: Number(q.q4.water.usage), cost: Number(q.q4.water.amountPaid) },
      ],
      fuel: [
        { q: "Q1", usage: Number(q.q1.fuel.usage), cost: Number(q.q1.fuel.amountPaid) },
        { q: "Q2", usage: Number(q.q2.fuel.usage), cost: Number(q.q2.fuel.amountPaid) },
        { q: "Q3", usage: Number(q.q3.fuel.usage), cost: Number(q.q3.fuel.amountPaid) },
        { q: "Q4", usage: Number(q.q4.fuel.usage), cost: Number(q.q4.fuel.amountPaid) },
      ],
    } as const;

    // 4) Validate numbers (prevents NaN)
    const bad = [...inputs.electricity, ...inputs.water, ...inputs.fuel].some(
      (x) => !Number.isFinite(x.usage) || !Number.isFinite(x.cost) || x.usage < 0 || x.cost < 0
    );
    if (bad) {
      return res.status(400).json({ ok: false, error: "Invalid usage/amountPaid values" });
    }

    // 5) Compute
const setupAndMaint = calcSetup.calculateSetupAndMaintenance(inputs as any);
const outputs = calcOutputs.calcDeterministicOutputs(inputs as any, setupAndMaint as any, 20, 0.02);

    const computed = {
      setupAndMaint,
      breakEven: outputs.breakEvenYear,
      investmentVsYear: outputs.investmentVsYear,
      costComparisonYear1: {
        baseline: outputs.year1.baseline,
        sustainable: outputs.year1.sustainable,
      },
      carbonYear1: outputs.year1.emissions,
    };

    // 6) Save/Upsert outputs (optional)
    await outputsCol.updateOne(
      { inputId },
      {
        $set: {
          inputId,
          company: doc.company ?? null,
          year: doc.year ?? null,
          createdAt: new Date(),
          computed,
        },
      },
      { upsert: true }
    );

    const saved = await outputsCol.findOne({ inputId });

    return res.json({
      ok: true,
      inputId: inputId.toString(),
      outputId: saved?._id?.toString(),
      computed,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: "Failed to compute outputs",
      detail: err?.message,
    });
  }
});
  // ---------------------------
  // Debug: confirm what's in DB
  // GET /api/debug/latest
  // ---------------------------
  app.get("/api/debug/latest", async (_req: Request, res: Response) => {
    const docs = await inputsCol.find().sort({ createdAt: -1 }).limit(5).toArray();
    return res.json({
      ok: true,
      db: db.databaseName,
      inputsCollection: inputsCol.collectionName,
      outputsCollection: outputsCol.collectionName,
      inputsCount: docs.length,
      inputIds: docs.map((d) => d._id.toString()),
      latestInput: docs[0] ?? null,
    });
  });
// ✅ START LISTENING (THIS WAS MISSING)
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });
}

// ✅ CALL START() (THIS WAS MISSING)
start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});