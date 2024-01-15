import sqlite3 from "sqlite3";

export const DB_NAME = "sku-db.sqlite";

export function getDatabase(): sqlite3.Database {
  const db = new sqlite3.Database(DB_NAME);

  try {
    if (!db) {
      throw new Error("Could not create database");
    }

    db.serialize(() => {
      db.run(
        "CREATE TABLE IF NOT EXISTS products (quantity INTEGER NOT NULL, sku TEXT NOT NULL PRIMARY KEY, description TEXT, store TEXT NOT NULL)",
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
    db.close();
  } finally {
    return db;
  }
}
