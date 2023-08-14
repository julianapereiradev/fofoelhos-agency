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
	bunnies."breedId",
    breeds."name" AS "breed",
	bunnies."skinColorId",
    "skinColors"."name" AS "skinColor",
	bunnies."sizeId",
    sizes."name" AS "size",
    bunnies."active",
    bunnies."url",
    users."phone"
    FROM bunnies
    JOIN "breeds" ON "breeds"."id" = bunnies."breedId"
    JOIN "sizes" ON "sizes"."id" = bunnies."sizeId"
    JOIN "skinColors" ON "skinColors"."id" = bunnies."skinColorId"
    JOIN "users" ON "users"."id" = bunnies."userId"
    WHERE bunnies."id" = $1
    `, [id])
}

export async function getMyBunniesDB(userId) {
    return await db.query(`
    SELECT bunnies.*,
    users."name" AS "dono"
    FROM bunnies
    JOIN users ON users."id" = bunnies."userId"
    WHERE bunnies."userId" = $1
     `, [userId]);
 }
 
 export async function selectBunnyByIdDB(id) {
    return await db.query(`SELECT * FROM bunnies WHERE id=$1`, [id]);
}


export async function getTablesSizesDB(){
    return await db.query(`SELECT * FROM sizes ORDER BY id ASC`)
}

export async function getTablesSkinColorsDB(){
    return await db.query(`SELECT * FROM "skinColors" ORDER BY id ASC`)
}

export async function getTablesBreedsDB(){
    return await db.query(`SELECT * FROM "breeds" ORDER BY id ASC`)
}

export async function updateBunnyDB(name, description, age, breedId, skinColorId, sizeId, active, url, id) {
  return await db.query( `
      UPDATE bunnies SET name=$1, 
      description=$2,
      age=$3,
      "breedId"=$4, 
      "skinColorId"=$5, 
      "sizeId"=$6, 
      active=$7, 
      url=$8
      WHERE id=$9`,
      [name, description, age, breedId, skinColorId, sizeId, active, url, id]);
  }




// export async function getBunniesBySizeDB(active, sizeId) {
//     return await db.query(`
//         SELECT bunnies.*, sizes.name AS size
//         FROM bunnies
//         JOIN sizes ON sizes.id = bunnies."sizeId"
//         WHERE bunnies.active = $1 AND sizes.id = $2
//     `, [active, sizeId]);
// }