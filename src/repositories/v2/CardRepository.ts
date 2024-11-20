import { randomUUID } from 'crypto'
import { db } from '../../db/database.js'



// gets all cards

export async function findCards() {
  return await db.selectFrom('cards')
    .selectAll()
    .execute()
}

// gets a single card by id

export async function findCardById(cardId: string) {
  return await db.selectFrom('cards')
    .where('id', '=', cardId)
    .selectAll()
    .executeTakeFirst()
}

// creates a single card
export async function createCard(uuid: string, card: any) {
  return await db.insertInto('cards')
    .values({id: randomUUID(),
      'card_num': card.card_num,
      'card_issuer': card.card_issuer,
      'card_expiration': card.card_expiration,
      'card_cvv': card.card_cvv,
      'user_id': uuid
      })
    .returningAll()
    .executeTakeFirstOrThrow()
}

// deletes a single card by id

export async function deleteCard(cardId: string) {
  const deletedCard = await db.deleteFrom('cards')
    .where('id', '=', cardId)
    .returningAll()
    .executeTakeFirst()
  return deletedCard
}