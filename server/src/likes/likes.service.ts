import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FilmsService } from '../films/films.service'
import { UserDocument } from 'src/user/schema/user.schema'
import { Like, LikeDocument } from './schema/likes.shema'
import { UserService } from 'src/user/user.service'

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private Likemodel: Model<LikeDocument>,
    private filmsService: FilmsService,
    private userService: UserService
  ) {}

  async createLikeTable(film_id, user_id) {
    const likeTable = await this.Likemodel.create({
      film_id,
      users_id: [user_id],
    })
    return likeTable._id
  }

  async addLike(filmId: any, userId: any) {
    const film = await this.filmsService.getFilmById(filmId)

    if (!film) {
      throw new BadRequestException('')
    }

    const likeTable = await this.Likemodel.findOne({ film_id: filmId })

    if (!likeTable) {
      const likeTableId = await this.createLikeTable(filmId, userId)

      film.likesShema = likeTableId
      film.likes += 1
      film.save()

      await this.userService.addToLikedMovies(userId, film)

      return film
    }

    const isFilmLiked = await this.checkLike(likeTable._id, userId)

    if (isFilmLiked) {
      await this.removeLike(filmId, userId)

      film.likes -= 1
      film.save()

      await this.userService.removeFromLikedMovies(userId, film._id)

      return film
    }

    film.likes += 1
    await this.userService.addToLikedMovies(userId, film)

    likeTable.number += 1
    likeTable.users_id.push(userId)

    film.save()
    likeTable.save()
    return film
  }

  async checkLike(likeTableId: string, userId: any) {
    const likeTable = await this.Likemodel.findById(likeTableId)

    const usersLike = likeTable.users_id.filter((id) => id !== userId)

    if (usersLike.length > 0) {
      return true
    }

    return false
  }

  async removeLike(filmId: any, userId: any) {
    const likeTable = await this.Likemodel.findOne({ film_id: filmId })

    if (!likeTable) {
      throw new NotFoundException('')
    }

    likeTable.number -= 1
    likeTable.users_id = likeTable.users_id.filter((user) => user === userId)

    likeTable.save()
    // return likeTable
  }
}
