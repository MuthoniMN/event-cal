import User from "../models/user.model";
import AppDataSource from "../config/db";
import responseInterceptor from "../config/responseInterceptor";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";


export default class AuthController {
  userRepository = AppDataSource.getRepository(User);

  async register(data: Partial<User>){
    try {
    const { phoneNumber, username } = data;

    const existingUser = await this.userRepository.findOneBy({ phoneNumber });
    const existingUsername = await this.userRepository.findOneBy({ username})
    if(existingUser) return responseInterceptor(400, "User already exists!", {});
    if(existingUsername) return responseInterceptor(400, "Username already in use!", {})

    const user = this.userRepository.create(data)

    await this.userRepository.save(user);

    return responseInterceptor(201, "Successfully created a new user!", { user });

    } catch(e) {
      console.log(`Error: ${e.message}`)
      return responseInterceptor(500, "Failed to create user", {})
    }
  }

  async login(data: Partial<User>) {
    const { username, password } = data;

    const user = await this.userRepository.findOneBy({ username })

    if(!user) return responseInterceptor(404, "Invalid credentials!", {})

    const passwordMatch = bcrypt.compare(password as string, user.password);

    if(!passwordMatch) return responseInterceptor(400, "Invalid credentials!", {});

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY);

    return responseInterceptor(200, "User successfully logged in!", { user, token }) 
  }
}
