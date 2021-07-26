import { fakeDb } from '../db/fakeDb'
import { BadRequest } from '../utils/Errors'

class KnightsService {
  getAll() {
    return fakeDb.knights
  }

  getById(id) {
    const knight = fakeDb.knights.find(k => k.id.toString() === id)
    if (!knight) {
      throw new BadRequest('Invalid Knight ID')
    }
    return knight
  }

  create(body) {
    fakeDb.knights.push(body)
    return body
  }

  edit(body) {
    let old = this.getById(body.id)
    old = { ...old, ...body }
    this.delete(old.id)
    fakeDb.knights.push(old)
    return old
    // for (const key in body) {
    //   old[key] = body[key]
    // }
  }

  delete(id) {
    const index = fakeDb.knights.findIndex(k => k.id.toString() === id)
    if (index > -1) {
      throw new BadRequest('Invalid Id')
    }
    fakeDb.knights.splice(index, 1)
  }
}

export const knightsService = new KnightsService()
