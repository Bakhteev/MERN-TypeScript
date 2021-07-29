import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Dislike, DislikeDocument } from 'src/dislikes/schema/dislikes.shema'
import { Like, LikeDocument } from 'src/likes/schema/likes.shema'

@Injectable()
export class IsFilmDislikedOrLikedService {
  constructor(
    @InjectModel(Like.name) private Likemodel: Model<LikeDocument>,
    @InjectModel(Dislike.name) private dislikeModel: Model<DislikeDocument>
  ) {}

  async checkLike(likeTableId, userId) {
    if (!likeTableId) {
      return false
    }
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
  }

  async checkDislike(dislikeTableId, userId) {
    if (!dislikeTableId) {
      return false
    }
    const dislikeTable = await this.dislikeModel.findById(dislikeTableId)

    const usersLike = dislikeTable.users_id.filter((id) => id !== userId)

    if (usersLike.length > 0) {
      return true
    }

    return false
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
