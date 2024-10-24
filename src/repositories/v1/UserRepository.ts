import { db } from '../../db/database.js'

export async function findUsers() {
  return await db.selectFrom('users')
    .selectAll()
    .execute()
}

export async function findUserById(id: string) {
  return await db.selectFrom('users')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findUserByName(user_name: string) {
    return await db.selectFrom('users')
      .where('user_name', '=', user_name)
      .selectAll()
      .executeTakeFirst()
  }

export async function deleteUser(id: string) {
  return await db.deleteFrom('birds').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}