import { db } from "../database/database.connection.js";
import {getBunniesDB, getBunnyDB, getMyBunniesDB, getTablesBreedsDB, getTablesSizesDB, getTablesSkinColorsDB, postBunnyDB, selectBunnyByIdDB, updateBunnyDB } from "../repositories/bunnies.repositories.js";

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
    const resultSizes = await getTablesSizesDB()
    const resultSkinColors = await getTablesSkinColorsDB()
    const resultBreeds = await getTablesBreedsDB()
    
    res.status(200).send({
        resultSizes: resultSizes.rows,
        resultSkinColors: resultSkinColors.rows,
        resultBreeds: resultBreeds.rows
    })

    } catch (err) {
        console.log('err de getTables backend:', err)
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
            id: null,
            name: null,
            age: null, 
            active: null,
            url: null
        });
      }
  
      res.status(200).send(result.rows.map(mapGetMyBunnies));
    } catch (err) {
        console.log('err de getMyBunnies backend:', err)
      return res.status(500).send(err.message);
    }
  }


export async function updateBunny(req, res){
    const {id} = req.params;
    const { name, description, age, breedId, skinColorId, sizeId, active, url } = req.body;
    const session = res.locals;
  
    try {
        const idBunnyQuery = await selectBunnyByIdDB(id)
        if (idBunnyQuery.rows.length === 0) {
          return res.status(404).send("Este (id) não existe no banco de ids");
        }
        
        const userIdFromToken = session.rows[0].userId;
        const userIdFromBunnies = idBunnyQuery.rows[0].userId;
        
        if (userIdFromToken !== userIdFromBunnies) {
          return res.status(401).send("Você não tem permissão para atualizar este coelho.");
        }

      await updateBunnyDB(name, description, age, breedId, skinColorId, sizeId, active, url, id)
  
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
        console.log('err de updateBunny backend:', err)
        return res.status(500).send(err.message);
    }
  }

//   export async function getBunniesBySize(req, res) {
//     const { sizeId } = req.params;

//     try {
//         const data = await getBunniesBySizeDB(true, sizeId);
//         return res.send(data.rows);
//     } catch (err) {
//         console.log('err de getBunniesBySize backend:', err);
//         return res.status(500).send(err.message);
//     }
// }