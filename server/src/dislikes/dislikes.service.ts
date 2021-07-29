import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FilmsService } from 'src/films/films.service'
import { IsFilmDislikedOrLikedService } from 'src/is-film-disliked-or-liked/is-film-disliked-or-liked.service'
import { UserService } from 'src/user/user.service'
import { Dislike, DislikeDocument } from './schema/dislikes.shema'

@Injectable()
export class DislikesService {
  constructor(
    @InjectModel(Dislike.name) private dislikeModel: Model<DislikeDocument>,
    private filmsService: FilmsService,
    private userService: UserService,
    private isFilmdislikedorLikedService: IsFilmDislikedOrLikedService
  ) {}

  async createDislikeTable(film_id, user_id) {
    const dislikeTable = await this.dislikeModel.create({
      film_id,
      users_id: [user_id],
    })
    return dislikeTable._id
  }

  async addDislike(filmId, userId) {
    const film = await this.filmsService.getFilmById(filmId)

    if (!film) {
      throw new NotFoundException('')
    }

    const dislikeTable = await this.dislikeModel.findOne({ film_id: filmId })

    if (!dislikeTable) {
      const dislikeTableId = await this.createDislikeTable(filmId, userId)

      film.dislikesShema = dislikeTableId
      film.dislikes += 1
      film.save()

      return film
    }

    const isFilmDisliked = await this.isFilmdislikedorLikedService.checkDislike(
      dislikeTable._id,
      userId
    )

    const isFilmLiked = await this.isFilmdislikedorLikedService.checkLike(
      film.likesShema,
      userId
    )

    if (isFilmDisliked) {
      await this.isFilmdislikedorLikedService.removeDislike(filmId, userId)

      film.dislikes -= 1
      film.save()

      return film
    }

    if (isFilmLiked) {
      await this.isFilmdislikedorLikedService.removeLike(filmId, userId)

      film.likes -= 1
      film.dislikes += 1
      dislikeTable.number += 1
      dislikeTable.users_id.push(userId)

      film.save()
      dislikeTable.save()
      return film
    }

    film.dislikes += 1

    dislikeTable.number += 1
    dislikeTable.users_id.push(userId)

    film.save()
    dislikeTable.save()
    return film
  }
}
