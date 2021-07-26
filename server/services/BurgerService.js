import { fakeDb } from '../db/fakeDb'
import { BadRequest } from '../utils/Errors'

class BurgerService {
  getAll() {
    return fakeDb.burger
  }

  getById(id) {
    const burger = fakeDb.burger.find(b => b.id.toString() === id)
    if (!burger) {
      throw new BadRequest('Invalid burger ID')
    }
    return burger
  }

  create(body) {
    fakeDb.burger.push(body)
    return body
  }

  edit(body) {
    let old = this.getById(body.id)
    old = { ...old, ...body }
    this.delete(old.id)
    fakeDb.burger.push(old)
    return old
    // for (const key in body) {
    //   old[key] = body[key]
    // }
  }

  delete(id) {
    const index = fakeDb.burger.findIndex(b => b.id === id)
    if (index > -1) {
      throw new BadRequest('Invalid Id')
    }
    fakeDb.burger.splice(index, 1)
  }
}

export const burgerService = new BurgerService()
