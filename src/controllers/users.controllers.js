import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { findUserByCpfDB, findUserByEmailDB, selectUserByIdDB, signinDB, signupDB } from "../repositories/users.repositories.js";

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

    const existingUserByCpf = await findUserByCpfDB(cpf);
    if (existingUserByCpf.rowCount > 0) {
      return res.status(409).send({ message: "Este CPF já existe no banco" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    signupDB(name, email, cpf, phone, encryptedPassword)

    res.status(201).send({ message: "Usuário Cadastrado" });
  } catch (err) {
    console.log('err de signup backend:', err)
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
    console.log('err de signin backend:', err)
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
    console.log('err de logout backend:', err)
    return res.status(500).send(err.message);
  }
}

export async function updateUser(req, res){
  const {id} = req.params;
  const { name, email, cpf, phone} = req.body;
  const session = res.locals;

  try {
      const idUserQuery = await selectUserByIdDB(id)
      if (idUserQuery.rows.length === 0) {
        return res.status(404).send("Este (id) não existe no banco de usuários");
      }
      
      const userIdFromToken = session.rows[0].userId;
      const userIdFromUsers = idUserQuery.rows[0].id;
      
      if (userIdFromToken !== userIdFromUsers) {
        return res.status(401).send("Você não tem permissão para atualizar este dado.");
      }

      const responsecpf = await db.query(`SELECT * FROM users WHERE cpf= $1 AND id <> $2`, [cpf, id])
      if(responsecpf.rowCount > 0) return res.status(409).send("Esse CPF já pertence a outro usuário")

      const responseemail = await db.query(`SELECT * FROM users WHERE email= $1 AND id <> $2`, [email, id])
      if(responseemail.rowCount > 0) return res.status(409).send("Esse email já pertence a outro usuário")


      await db.query(`
      UPDATE users SET name=$1, 
      email=$2, 
      cpf=$3, 
      phone=$4, 
      "createdAt" = NOW()
      WHERE id=$5`, 
      [name, email, cpf, phone, id])

      res.status(201).send('Usuário Atualizado');

  } catch (err) {
      console.log('err de updateUser backend:', err)
      return res.status(500).send(err.message);
  }
}
