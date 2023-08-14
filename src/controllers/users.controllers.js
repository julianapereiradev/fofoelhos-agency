import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { findUserByCpfDB, findUserByEmailDB, logoutDB, selectFromCpfDB, selectFromEmailDB, selectUserByIdDB, signinDB, signupDB, updateUserDB } from "../repositories/users.repositories.js";

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

      res.status(200).send({ token: token, userId: user.rows[0].id});
    } else {
      res.status(401).send({ message: "Senha incorreta!" });
    }
  } catch (err) {
    console.log('err de signin backend:', err)
    return res.status(500).send(err.message);
  }
}


export async function logout(req, res) {
  const token = res.locals.rows[0].token;

  try {
    
    await logoutDB(token)
    res.status(204).send("Token removido!")

  } catch (err) {
    console.log('err de logout backend:', err)
    return res.status(500).send(err.message);
  }
}


export async function getUser(req, res){
  const {id} = req.params;
  const session = res.locals;

  try {
      const idUserQuery = await selectUserByIdDB(id)
      if (idUserQuery.rows.length === 0) {
        return res.status(404).send("Este (id) não existe no banco de usuáriossss");
      }
      
      const userIdFromToken = session.rows[0].userId;
      const userIdFromUsers = idUserQuery.rows[0].id;
      
      if (userIdFromToken !== userIdFromUsers) {
        return res.status(401).send("Você não tem permissão para acessar este dado.");
      }

      res.status(201).send(idUserQuery.rows[0]);

  } catch (err) {
      console.log('err de updateUser backend:', err)
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

      const responsecpf = await selectFromCpfDB(cpf, id)
      if(responsecpf.rowCount > 0) return res.status(409).send("Esse CPF já pertence a outro usuário")

      const responseemail = await selectFromEmailDB(email, id)
      if(responseemail.rowCount > 0) return res.status(409).send("Esse email já pertence a outro usuário")


      await updateUserDB(name, email, cpf, phone, id)

      res.status(201).send('Usuário Atualizado');

  } catch (err) {
      console.log('err de updateUser backend:', err)
      return res.status(500).send(err.message);
  }
}
