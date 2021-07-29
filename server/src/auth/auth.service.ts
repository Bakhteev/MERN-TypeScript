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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  private async validateUser(userDto: CreateUserDto | LogInUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
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

  async login(userDto: LogInUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким Email существует',
        HttpStatus.BAD_REQUEST
      )
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    })
    return this.generateToken(user)
  }
}
