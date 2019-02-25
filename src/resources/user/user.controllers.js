import { User } from './user.model'
import BaseController from '../../utils/BaseController'

class UserControllers extends BaseController {
  constructor(mongooseModel) {
    super(mongooseModel)
    this.mongooseModel = mongooseModel
  }
  register = async () => {}
  me = async () => {}
  updateMe = async () => {}
}

const userControllers = UserControllers(User)

export { userControllers }
