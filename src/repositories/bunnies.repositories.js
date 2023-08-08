import { db } from "../database/database.connection.js";

export async function postBunnyDB(name, userId, age, description, breedId, skinColorId, sizeId, active, url) {
    return await db.query(`
        INSERT INTO bunnies ("name", "userId", "age", "description", "breedId", "skinColorId", "sizeId", "active", "url") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `, [name, userId, age, description, breedId, skinColorId, sizeId, active, url]);
}

export async function getBunniesDB(active) {
    return await db.query(`SELECT * FROM bunnies WHERE active=$1`, [active])
}