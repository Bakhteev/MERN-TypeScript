import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schema/user.schema'
import { JwtService } from '@nestjs/jwt'
import { RolesService } from 'src/roles/roles.service'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private rolesService: RolesService
  ) {}

  async getAllUsers() {
    const users = await this.userModel.find()
    return users
  }

  async addRole(dto: any) {
    const user = await this.userModel.findById(dto.userId)
    const role = await this.rolesService.getRoleByValue(dto.value)
    if (role && user) {
      user.roles = [role.value]
      user.save()
      return user
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND
    )
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.create(dto)
    const role = await this.rolesService.getRoleByValue('ADMIN')
    user.roles = [role.value]
    role.users.push(user._id)
    user.save()
    role.save()
    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email })
    return user
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id)
    return user
  }
}
