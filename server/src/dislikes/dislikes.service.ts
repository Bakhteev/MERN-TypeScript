import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FilmsService } from 'src/films/films.service'
import { UserService } from 'src/user/user.service'
import { Dislike, DislikeDocument } from './schema/dislikes.shema'

@Injectable()
export class DislikesService {
  constructor(
    @InjectModel(Dislike.name) private dislikeModel: Model<DislikeDocument>,
    private filmsService: FilmsService,
    private userService: UserService
  ) {}

  async createDislikeTable(film_id, user_id) {
    const dislikeTable = await this.dislikeModel.create({
      film_id,
      users_id: [user_id],
    })
    return dislikeTable._id
  }

  async checkDislike(dislikeTableId, userId) {
    const dislikeTable = await this.dislikeModel.findById(dislikeTableId)

    const usersLike = dislikeTable.users_id.filter((id) => id !== userId)

    if (usersLike.length > 0) {
      return true
    }

    return false
  }

  async addDislike(filmId, userId) {
    const film = await this.filmsService.getFilmById(filmId)

    if (!film) {
      throw new BadRequestException('')
    }

    const dislikeTable = await this.dislikeModel.findOne({ film_id: filmId })

    if (!dislikeTable) {
      const dislikeTableId = await this.createDislikeTable(filmId, userId)

      film.dislikesShema = dislikeTableId
      film.dislikes += 1
      film.save()

      await this.userService.addToLikedMovies(userId, film)

      return film
    }

    const isFilmDisliked = await this.checkDislike(dislikeTable._id, userId)

    if (isFilmDisliked) {
      await this.removeDislike(filmId, userId)

      film.dislikes -= 1
      film.save()
      return film
    }

    film.dislikes += 1

    dislikeTable.number += 1
    dislikeTable.users_id.push(userId)

    film.save()
    dislikeTable.save()
    return film
  }

  async removeDislike(filmId, userId) {
    const dislikeTable = await this.dislikeModel.findOne({ film_id: filmId })

    if (!dislikeTable) {
      throw new NotFoundException('')
    }

    dislikeTable.number -= 1
    dislikeTable.users_id = dislikeTable.users_id.filter(
      (user) => user === userId
    )

    dislikeTable.save()
  }
}
