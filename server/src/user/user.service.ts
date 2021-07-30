import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schema/user.schema'
import { RolesService } from 'src/roles/roles.service'
import { FilmDocument } from 'src/films/schema/film.schema'
import { AddRoleDto } from './dto/add-role.dto'

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

  async addRole(dto: AddRoleDto) {
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
    const role = await this.rolesService.getRoleByValue('USER')
    user.roles = [role.value]

    role.users.push(user._id)
    user.save()
    role.save()
    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new BadRequestException('Пользователь с таким Email существует')
    }
    return user
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id)
    return user
  }

  async addToLikedMovies(userId: string, filmId: FilmDocument) {
    const user = await this.getUserById(userId)

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    user.liked.push(filmId)
    user.save()
    return user
  }

  async removeFromLikedMovies(userId: string, filmId: FilmDocument) {
    const user = await this.getUserById(userId)
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
    user.liked = user.liked.filter((film) => film === filmId)
    user.save()

    return user
  }

  async addFilmToHistory(userId: string, filmId: any) {
    const user = await this.getUserById(userId)

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    const filmInHistory = user.history.filter((film) => film !== filmId)
    if (filmInHistory.length > 0) {
      const filteredHistory = [
        filmInHistory[0],
        ...user.history.filter((film) => film !== filmInHistory[0]),
      ]
      user.history = filteredHistory
      user.save()
      return user
    }

    user.history.push(filmId)
    user.save()
    return user
  }
}
