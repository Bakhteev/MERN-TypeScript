import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FilmsService } from '../films/films.service'
import { Like, LikeDocument } from './schema/likes.shema'
import { UserService } from 'src/user/user.service'
import { IsFilmDislikedOrLikedService } from 'src/is-film-disliked-or-liked/is-film-disliked-or-liked.service'
@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private Likemodel: Model<LikeDocument>,
    private filmsService: FilmsService,
    private userService: UserService,
    private isFilmdislikedorLikedService: IsFilmDislikedOrLikedService
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
      throw new NotFoundException('')
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

    const isFilmLiked = await this.isFilmdislikedorLikedService.checkLike(
      likeTable._id,
      userId
    )

    const isFilmDisliked = await this.isFilmdislikedorLikedService.checkDislike(
      film.dislikesShema,
      userId
    )
    if (isFilmLiked) {
      await this.isFilmdislikedorLikedService.removeLike(filmId, userId)

      film.likes -= 1
      film.save()

      await this.userService.removeFromLikedMovies(userId, film._id)

      return film
    }

    if (isFilmDisliked) {
      await this.isFilmdislikedorLikedService.removeDislike(filmId, userId)

      film.likes += 1
      film.dislikes -= 1

      likeTable.number += 1
      likeTable.users_id.push(userId)

      await this.userService.addToLikedMovies(userId, filmId)

      film.save()
      likeTable.save()

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
}
