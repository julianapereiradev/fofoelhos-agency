import { db } from "../database/database.connection.js";

export async function getBunnies(req,res) {
    try {
        // const data = await db.collection(collections.products).find().toArray()
        // return res.send(data);
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
    // const newProduct = {
    //     ...req.body, 
    //     price: Number(req.body.price), 
    //     year: Number(req.body.year),
    //     quantityInStock: Number(req.body.quantityInStock)
    // }

    try {
        // await db.collection(collections.products).insertOne(newProduct)
        // res.send('Produto adicionado ao banco de dados.')
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