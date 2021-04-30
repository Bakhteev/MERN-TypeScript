import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schema/user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registration(dto: CreateUserDto) {
    try {
      const { email, password, name } = dto

      const user = await this.userModel.find({ email })
      if (user) {
        throw new HttpException(
          'Такой пользователь уже создан',
          HttpStatus.BAD_REQUEST
        )
      }

      

    } catch (e) {
      throw new HttpException(
        { message: 'Что-то пошло не так', error: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
