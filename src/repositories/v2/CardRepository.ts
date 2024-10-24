import { db } from '../../db/database.js'

export async function findCards() {
  return await db.selectFrom('cards')
    .selectAll()
    .execute()
}

export async function findCardById(uuid: string) {
  return await db.selectFrom('cards')
    .where('id', '=', uuid)
    .selectAll()
    .executeTakeFirst()
}

export async function createCard() {
   
}

export async function deleteCard(uuid: string) {
  return await db.deleteFrom('cards').where('id', '=', uuid)
    .returningAll()
    .executeTakeFirst()
}