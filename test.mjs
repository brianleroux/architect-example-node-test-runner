import {describe, it, before, after} from 'node:test'
import {ok} from 'node:assert'
import sandbox from '@architect/sandbox'
import account from './index.mjs'

describe('tests account', async () => {
  
  before(async () => {
    return sandbox.start({quiet: true})
  })

  it('can list', async () => {
    let result = await account.list({})
    ok(result.Items.length === 0)
  })

  let person

  it('can create', async () => {
    person = await account.create({ 
      email: 'b@brian.io', 
      pswd:'password', 
      cats: ['sutr0']
    })
    ok(person.accountID)
  })

  it('can read', async () => {
    let result = await account.read({ 
      accountID: person.accountID 
    })
    ok(result.accountID === person.accountID)
    console.log({ result })
  })

  it('can update', async () => {
    let newemail = 'brian@brian.io'
    let result = await account.update({ 
      accountID: person.accountID, 
      email: newemail
    })
    ok(result.email === newemail)
    console.log({ result })
  })

  it('can destroy', async () => {
    let result = await account.destroy({ 
      accountID: person.accountID, 
    })
    console.log({ result })
  })

  after(async () => {
    return sandbox.end()
  })
})
