import { openDB, IDBPDatabase } from 'idb';

export class CacheService {
  private db: Promise<IDBPDatabase>;

  constructor() {
    this.db = this.initDB();
  }

  private async initDB() {
    return openDB('dmp-cache', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
      },
    });
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    const entry = {
      key,
      value: JSON.stringify(value),
      expiresAt: Date.now() + ttl * 1000
    };

    const db = await this.db;
    await db.put('cache', entry);
  }

  async get(key: string): Promise<any | null> {
    const db = await this.db;
    const entry = await db.get('cache', key);

    if (!entry) {
      return null;
    }

    if (entry.expiresAt < Date.now()) {
      await this.delete(key);
      return null;
    }

    return JSON.parse(entry.value);
  }

  async delete(key: string): Promise<void> {
    const db = await this.db;
    await db.delete('cache', key);
  }

  async clear(): Promise<void> {
    const db = await this.db;
    await db.clear('cache');
  }
}