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

export async function getBunnyDB(id) {
    return await db.query(`SELECT bunnies."id",
    bunnies."name",
    users."name" AS "dono",
    bunnies."age",
    bunnies."description",
    breeds."name" AS "breed",
    "skinColors"."name" AS "skinColor",
    sizes."name" AS "size",
    bunnies."active",
    bunnies."url",
    users."phone"
    FROM bunnies
    JOIN "breeds" ON "breeds"."id" = bunnies."breedId"
    JOIN "sizes" ON "sizes"."id" = bunnies."sizeId"
    JOIN "skinColors" ON "skinColors"."id" = bunnies."skinColorId"
    JOIN "users" ON "users"."id" = bunnies."breedId"
    WHERE bunnies."id" = $1
    `, [id])
}
