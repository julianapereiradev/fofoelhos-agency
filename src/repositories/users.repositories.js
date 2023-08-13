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

