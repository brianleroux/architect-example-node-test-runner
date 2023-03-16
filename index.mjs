import arc from '@architect/functions'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

async function create (params) {
  let data = await arc.tables()
  params.accountID = nanoid(7)
  params.pswd = bcrypt.hashSync(params.pswd, bcrypt.genSaltSync(10))
  return data.accounts.put(params)
}

async function read (params) {
  let data = await arc.tables()
  return data.accounts.get(params)
}

async function update ({ accountID, email }) {
  let data = await arc.tables()
  await data.accounts.update({
    Key: { accountID },
    UpdateExpression: 'set email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  })
  return data.accounts.get({ accountID })
}

async function destroy (params) {
  let data = await arc.tables()
  return data.accounts.delete(params)
}

async function list () {
  let data = await arc.tables()
  return data.accounts.scan({})
}

export default { create, read, update, destroy, list }
