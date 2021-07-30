import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LogInUserDto } from 'src/user/dto/login-user.dto'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'
import { UserDocument } from 'src/user/schema/user.schema'
import { Response } from 'express'
import { ChangePasswordDto } from './dto/change-password.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  private async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email)
    const passwordEquals = await bcrypt.compare(password, user.password)
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({
      message: 'Некорректные email или пароль',
    })
  }

  private async generateToken(user: UserDocument) {
    const payload = { email: user.email, id: user._id, roles: user.roles }
    return {
      token: this.jwtService.sign(payload),
      user,
    }
  }

  async login({ email, password }: LogInUserDto) {
    const user = await this.validateUser(email, password)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    })
    return this.generateToken(user)
  }

  async changePassword({ email, oldPassword, newPassword }: ChangePasswordDto) {
    console.log(email)
    const user = await this.validateUser(email, oldPassword)

    const hashPassword = await bcrypt.hash(newPassword, 5)

    user.password = hashPassword
    user.save()
    return 'Пароль успешно изменен'
  }

  async forgotPassword(){
    
  }
}
