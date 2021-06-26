import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FilmsService } from 'src/films/films.service'
import { UserDocument } from 'src/user/schema/user.schema'
import { Like, LikeDocument } from './schema/likes.shema'

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private Likemodel: Model<LikeDocument>) {}

  async createLikeTable(film_id) {
    const like = await this.Likemodel.create({ film_id })
    return like._id
  }

  async addLike(filmId: any, userId: any) {
    const like = await this.Likemodel.findOne({ film_id: filmId })

    if (!like) {
      throw new HttpException('', HttpStatus.BAD_REQUEST)
    }

    const checkLike = await this.checkLike(like._id, userId)

    if (!checkLike) {
      return false
    }

    like.number += 1
    like.users_id.push(userId)
    like.save()
    return like
  }

  async checkLike(likeId: string, userId: any) {
    const like = await this.Likemodel.findById(likeId)

    if (!like) {
      throw new HttpException('', HttpStatus.BAD_REQUEST)
    }

    const usersLike = like.users_id.filter((user) => user !== userId)

    if (usersLike.length > 0) {
      return false
    }

    return true
  }

  async removeLike(filmId: any, userId: any) {
    const like = await this.Likemodel.findOne({ film_id: filmId })
    if (!like) {
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    like.number -= 1
    like.users_id = like.users_id.filter((user) => user === userId)

    like.save()
    return like
  }
}
