import { db } from '../../db/database.js'

export async function findTransaction() {
  return await db.selectFrom('transactions')
    .selectAll()
    .execute()
}

export async function findTransactionById(uuid: string) {
  return await db.selectFrom('transactions')
    .where('id', '=', uuid)
    .selectAll()
    .executeTakeFirst()
}

export async function deleteTransaction(uuid: string) {
  return await db.deleteFrom('transactions').where('id', '=', uuid)
    .returningAll()
    .executeTakeFirst()
}
  