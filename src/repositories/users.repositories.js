import {db} from "../database/database.connection.js"

export async function findUserByEmailDB(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

export async function findUserByCpfDB(cpf) {
  return db.query(`SELECT * FROM users WHERE cpf=$1`, [cpf]);
}


export async function signupDB(name, email, cpf, phone, encryptedPassword) {
    return await db.query(
      `INSERT INTO users (name, email, cpf, phone, password) VALUES ($1, $2, $3, $4, $5);`,
      [name, email, cpf, phone, encryptedPassword]
    );
}

export async function signinDB(user, token) {
    return await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [user, token]);
}

export async function selectUserByIdDB(id) {
  return await db.query(`SELECT users.id, users.name, users.email, users.cpf, users.phone, users."createdAt" FROM users WHERE id=$1`, [id]);
}

export async function logoutDB(token) {

    return await db.query(`DELETE FROM sessions WHERE token =$1`, [token]);
}


export async function selectFromCpfDB(cpf, id) {
  return await db.query(`SELECT * FROM users WHERE cpf= $1 AND id <> $2`, [cpf, id])
}

export async function selectFromEmailDB(email, id) {
  return await db.query(`SELECT * FROM users WHERE email= $1 AND id <> $2`, [email, id])
}


export async function updateUserDB(name, email, cpf, phone, id){
 
      return await db.query(`
      UPDATE users SET name=$1, 
      email=$2, 
      cpf=$3, 
      phone=$4, 
      "createdAt" = NOW()
      WHERE id=$5`, 
      [name, email, cpf, phone, id])
}