import { db } from '../../db/database.js';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library to generate unique IDs

export async function findCards() {
  return await db.selectFrom('cards')
    .selectAll()
    .execute();
}

export async function findCardById(id: string) {
  return await db.selectFrom('cards')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function deleteCard(id: string) {
  return await db.deleteFrom('cards')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export async function createCard(userUuid: string) {
  const newCard = generateCard(userUuid);
  return await db.insertInto('cards')
    .values(newCard)
    .returningAll()
    .executeTakeFirst();
}

export function generateCard(userUuid: string) {
  const id = uuidv4(); // Generate a unique ID for the card
  const card_num = Math.floor(Math.random() * 10000000000000000);
  const card_issuer = "Visa";
  const card_expiration = "12/25";
  const card_cvv = Math.floor(Math.random() * 1000);
  const user_id = userUuid;

  return {
    id,
    card_num,
    card_issuer,
    card_expiration,
    card_cvv,
    user_id
  };
}