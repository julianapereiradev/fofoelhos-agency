import { db } from "../database/database.connection.js";
import { getBunniesDB, postBunnyDB } from "../repositories/bunnies.repositories.js";

export async function getBunnies(req,res) {
    try {
        const data = await getBunniesDB(true)
        return res.send(data.rows);
    } catch (err) {
        console.log('err de getBunnies backend:', err)
    return res.status(500).send(err.message);
    }
}

export async function getBunny(req, res) {
    // const { id } = req.params
    // if (!id) return res.status(400).send("O id do produto é obrigatório!")

    try {
        // const product = await db.collection(collections.products).findOne({_id: new ObjectId(id)})
        // if (!product) return res.status(404).send('Produto não encontrado.')

        // res.send(product)
    } catch (err) {
        console.log('err de getBunny backend:', err)
        return res.status(500).send(err.message);
    }
}


export async function postBunny(req, res) {
const { name, description, age, breedId, skinColorId, sizeId, active, url } = req.body;
const session = res.locals;

    try {
       await postBunnyDB(
            name,
            session.rows[0].userId,
            age,
            description,
            breedId,
            skinColorId,
            sizeId,
            active,
            url
        );
    
    res.status(201).send({
        name: name,
        userId: session.rows[0].userId,
        age: age,
        description: description,
        breedId: breedId,
        skinColorId: skinColorId,
        sizeId: sizeId,
        active: active,
        url: url
      });

    } catch (err) {
        console.log('err de postBunny backend:', err)
        return res.status(500).send(err.message);
    }
}

export async function updateBunny(req, res){
    // const {id} = req.params;
    // const { name, phone, cpf, birthday } = req.body;
  
    try {
  
    //   const idExistQuery = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        
    //   if (idExistQuery.rows.length === 0) {
    //     return res.status(404).send("Este id não existe no banco de clientes");
    //   }
  
    //   // Verificar se o CPF já pertence a outro usuário
    //   const cpfExistQuery = await db.query(`SELECT * FROM customers WHERE cpf = $1 AND id <> $2;`, [cpf, id]);
  
    //   if (cpfExistQuery.rows.length > 0) {
    //     return res.status(409).send("O CPF que você está tentando atualizar já pertence a outro usuário");
    //   }
  
    //   await db.query( `
    //   UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`,
    //   [name, phone, cpf, birthday, id]);
  
    //   res.sendStatus(200);
    } catch (err) {
        console.log('err de postBunny backend:', err)
        return res.status(500).send(err.message);
    }
  }