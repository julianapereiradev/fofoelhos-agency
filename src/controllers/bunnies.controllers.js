import { db } from "../database/database.connection.js";
import { getBunniesDB, getBunnyDB, getMyBunniesDB, postBunnyDB } from "../repositories/bunnies.repositories.js";

//To render ROUTE /myBunnies
function mapGetMyBunnies(user_me) {
    return {
      dono: user_me.dono,
      id: user_me.id,
      name: user_me.name,
      age: user_me.age, 
      active: user_me.active,
      url: user_me.url
    };
  }

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
    const { id } = req.params
    if (!id) return res.status(400).send("O id é obrigatório!")

    try {
        const bunnyIdQuery = await getBunnyDB(id)

        if (bunnyIdQuery.rows.length === 0) {
          return res.status(404).send("Este id não existe no banco de coelhos");
        }
    
        const formattedBunnyId = bunnyIdQuery.rows[0];
        res.send(formattedBunnyId);

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

export async function getTables(req, res){
    try {
  
    const resultSizes = await db.query(`SELECT * FROM sizes`)
    const resultSkinColors = await db.query(`SELECT * FROM "skinColors"`)
    const resultBreeds = await db.query(`SELECT * FROM "breeds"`)
    
    res.status(200).send({
        resultSizes: resultSizes.rows,
        resultSkinColors: resultSkinColors.rows,
        resultBreeds: resultBreeds.rows
    })

    } catch (err) {
        console.log('err de postBunny backend:', err)
        return res.status(500).send(err.message);
    }
}

export async function getMyBunnies(req, res) {
    const user = res.locals.rows[0].userId
  
    try {
      const result = await getMyBunniesDB(user);

      if (result.rows.length === 0) {
        // Usuário não tem nenhum coelho registrado
        return res.status(200).send({
            dono: null,
            id: null,
            name: null,
            age: null, 
            active: null,
            url: null
        });
      }
  
      res.status(200).send({
        resultMyBunnies: result.rows.map(mapGetMyBunnies)
      });
    } catch (err) {
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