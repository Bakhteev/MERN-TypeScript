import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schema/user.schema'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}
  generateJWT = (id: string, email: string, role: string[]) => {
    return this.jwtService.sign(
      { id, email, role },
      { expiresIn: '24h', secret: 'secret' }
    )
  }

  async registration(dto: CreateUserDto) {
    try {
      const { email, password, name } = dto

      const user = await this.userModel.findOne({ email })
      if (user) {
        throw new HttpException(
          'Такой пользователь уже создан',
          HttpStatus.BAD_REQUEST
        )
      }

      // const hashedPassword = bcrypt.salt(password, 5, (err, encrypted) => {
      //   if (err) {
      //     new HttpException(
      //       'что пошло не так',
      //       HttpStatus.INTERNAL_SERVER_ERROR
      //     )
      //   }
      //   // return encrypted
      // })

      // console.log(hashedPassword)

      const hashedPassword = await bcrypt.hash(password, 6)

      const newUser = await this.userModel.create({
        email,
        password: hashedPassword,
        role: ['USER'],
        name,
      })
      const token = this.generateJWT(newUser._id, newUser.email, newUser.role)
      // await res.cookie('token', token, { httpOnly: true })
      return token
    } catch (e) {
      throw new HttpException(
        { message: 'Что-то пошло не так', error: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
