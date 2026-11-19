import { openDB, IDBPDatabase } from 'idb';
import { z } from 'zod';

export const savedConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  geometryId: z.string(),
  params: z.record(z.number()),
  createdAt: z.number(),
});
export type SavedConfig = z.infer<typeof savedConfigSchema>;

const DB_NAME = 'geometry-explorer';
const STORE = 'configurations';
let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}

export async function saveConfig(config: SavedConfig) {
  savedConfigSchema.parse(config);
  const db = await getDB();
  await db.put(STORE, config);
}

export async function getAllConfigs(): Promise<SavedConfig[]> {
  const db = await getDB();
  const raw = await db.getAll(STORE);
  return raw.filter((c) => savedConfigSchema.safeParse(c).success);
}

export async function deleteConfig(id: string) {
  const db = await getDB();
  await db.delete(STORE, id);
}
