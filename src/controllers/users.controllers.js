import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { findUserByEmailDB, signinDB, signupDB } from "../repositories/users.repositories.js";


//Functions:

export async function signup(req, res) {
  const { name, email, cpf, phone, password, confirmPassword } = req.body;

  try {

    if(password !== confirmPassword) {
      return res.status(422).send("As senhas estão diferentes!")
    }

    const existingUser = await findUserByEmailDB(email);
    if (existingUser.rowCount > 0) {
      return res.status(409).send({ message: "Este email já existe no banco" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    signupDB(name, email, cpf, phone, encryptedPassword)

    res.status(201).send({ message: "Usuário Cadastrado" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmailDB(email);
    if (user.rowCount === 0) {
      return res.status(401).send({ message: "Este email não existe, crie uma conta" });
    }

    const hashedPassword = user.rows[0].password;

    if (bcrypt.compareSync(password, hashedPassword)) {
      const token = uuid();

      await signinDB(user.rows[0].id, token)

      res.status(200).send({ token: token });
    } else {
      res.status(401).send({ message: "Senha incorreta!" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

//colocar no repositories depois 
export async function logout(req, res) {
  const token = res.locals.rows[0].token;

  try {
    await db.query(`DELETE FROM sessions WHERE token =$1`, [token]);
    res.status(204).send("Token removido!")

  } catch (err) {
    res.status(500).send(err.message)
  }
}