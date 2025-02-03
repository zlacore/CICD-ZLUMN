import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    if (!db) {
      throw new Error('fuck')
    }
    if (!models[modelName] || !models[modelName].db) {
      throw new Error(`The model is possibly undefined`);
    }

    // ? is optional chaining, if it IS underfined this `?` could cause issues
    const modelExists = await models[modelName]?.db?.db?.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists && modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
