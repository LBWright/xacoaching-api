import { Router } from 'express'
import { userControllers } from './user.controllers'

const userRouter = Router()

userRouter
  .route('/')
  .get(userControllers.getMany)
  .post(userControllers.createOne)

userRouter
  .route('/:id')
  .get(userControllers.getOne)
  .put(userControllers.updateOne)
  .delete(userControllers.deleteOne)

userRouter.route('/register').post(userControllers.register)

userRouter
  .route('/me')
  .get(userControllers.me)
  .put(userControllers.updateMe)

export default userRouter
