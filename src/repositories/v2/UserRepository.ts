import { randomUUID } from 'crypto'
import { db } from '../../db/database.js'
import { sql, UpdateResult } from 'kysely'
export async function findUsers() {
  return await db.selectFrom('users')
    .selectAll()
    .execute()
}

export async function findUserById(uuid: string) {
  const user:any = await db.selectFrom('users')
    .where('id', '=', uuid)
    .selectAll()
    .executeTakeFirst()
    if(user){
      console.log("hi")
      return user
    } else {
      console.log("bye")
      throw new Error("ID Not Found")
    }
}

interface NewUser {
  user_name: string;
}
export async function createUser(newUser:NewUser) {
  if (typeof newUser !== 'object' || newUser === null) {
    throw new Error("Invalid argument: newUser must be an object.")
  } // enforce object 
  if (typeof newUser.user_name !== 'string' || newUser.user_name.trim() === '') {
    throw new Error("Invalid argument: user_name")
  } // enforce string values for names
  try{
    const newUUID = randomUUID() // new UUID)
    await db.insertInto('users')
    .values({
      id: newUUID,
      user_name: newUser.user_name.trim()
    })
    .executeTakeFirst()
    return await findUserById(newUUID) // returns the whole user
  } catch(error:any){
      throw new Error(error)
  }
}

export async function deleteUser(uuid: string) {
  if (typeof uuid !== 'string' || uuid.trim() === '') {
    throw new Error("Invalid argument: user_name")
  } // enforce string values for names
      const user:any = await findUserById(uuid)
      if(user){
        await db
          .deleteFrom('users')
          .where('id', '=', uuid)
          .returningAll()
          .executeTakeFirst()
        return user
      } else {
          throw new Error("ID Not Found")
      }
}
export async function changeUser(uuid:string, changes:object ){
  const user:any = await findUserById(uuid)
  if(user){ 
    const result:UpdateResult = await db
      .updateTable('users')
      .set(changes)
      .where('id', '=', uuid)
      .executeTakeFirst()
      return result
  } else {
      throw new Error("ID Not Found")
  }
  // Iterate through DB to get all possible fields
  // check fields against inputted fields
  //  
}