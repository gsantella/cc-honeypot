import { db } from '../../db/database.js'

export async function findBirds() {
  return await db.selectFrom('birds')
    .selectAll()
    .execute()
}

export async function findBirdById(uuid: string) {
  return await db.selectFrom('birds')
    .where('id', '=', uuid)
    .selectAll()
    .executeTakeFirst()
}

export async function deleteBird(uuid: string) {
  return await db.deleteFrom('birds').where('id', '=', uuid)
    .returningAll()
    .executeTakeFirst()
}