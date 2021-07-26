import { burgerService } from '../services/BurgerService'
import BaseController from '../utils/BaseController'

export class BurgerController extends BaseController {
  constructor() {
    super('api/burger')
    this.router
      .get('', this.getAll)
      // NOTE by adding a ':' before a word, that word becomes a variable, whatever value is in that position in the URL becomes the value of that variable
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  // all express route handlers get req, res, next
  getAll(req, res, next) {
    try {
      const burger = burgerService.getAll()
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  getById(req, res, next) {
    try {
      const burger = burgerService.getById(req.params.id)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  create(req, res, next) {
    try {
      req.body.id = req.params.id
      // NOTE data sent to the server on posts and puts is added to the body (req.body)
      const burger = burgerService.create(req.body)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const burger = burgerService.edit(req.body)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  delete(req, res, next) {
    try {
      burgerService.delete(req.params.id)
      res.send('delorted')
    } catch (error) {
      next(error)
    }
  }
}
