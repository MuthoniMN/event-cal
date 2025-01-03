import User from "../models/user.model";
import AppDataSource from "../config/db";
import responseInterceptor from "../config/responseInterceptor";

export default class UserController {
  userRepository = AppDataSource.getRepository(User);

  async getUser(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if(!user) return responseInterceptor(404, "User not found!", {})

    return responseInterceptor(200, "User found successfully!", { user })
  }
}
