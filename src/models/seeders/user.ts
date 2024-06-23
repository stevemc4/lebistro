import { generateIdFromEntropySize } from 'lucia'
import { Argon2id } from 'oslo/password'
import { NewUser } from 'models/user'

const argon2Id = new Argon2id()

export async function runSeeder(): Promise<NewUser[]> {
  return [
    {
      id: generateIdFromEntropySize(10),
      username: 'admin',
      password: await argon2Id.hash('changeme'),
      name: 'Admin',
      role: 'admin',
    },
    {
      id: generateIdFromEntropySize(10),
      username: 'man_store',
      password: await argon2Id.hash('storemanager'),
      name: 'John Managero',
      role: 'manager',
    },
    {
      id: generateIdFromEntropySize(10),
      username: 'man_store',
      password: await argon2Id.hash('cashier'),
      name: 'John Cashiero',
      role: 'staff',
    },
  ]
}
