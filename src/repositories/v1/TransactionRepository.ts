import { db } from '../../db/database.js';

interface Transaction {
  id?: string; 
  card_id: string;
  transaction_data: string;
  createdAt?: Date; 
}

export async function findTransaction() {
    return await db.selectFrom('transactions').selectAll().execute();
}

export async function findTransactionById(uuid: string) {
    return await db.selectFrom('transactions')
        .where('id', '=', uuid)
        .selectAll()
        .executeTakeFirst();
}

export async function deleteTransaction(uuid: string) {
    return await db.deleteFrom('transactions')
        .where('id', '=', uuid)
        .returningAll()
        .executeTakeFirst();
}

export async function createTransaction(transactionData: Transaction) {
  const values: any = {
      card_id: transactionData.card_id,
      transaction_data: transactionData.transaction_data,
  };

  if (transactionData.id) {
      values.id = transactionData.id;
  }
  if (transactionData.createdAt) {
      values.createdAt = transactionData.createdAt;
  }

  return await db.insertInto('transactions')
      .values(values)
      .returningAll()
      .executeTakeFirst();
}
