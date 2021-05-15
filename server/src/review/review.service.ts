import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FilmsService } from 'src/films/films.service'
import { UserService } from 'src/user/user.service'
import { CreateRewiewDto } from './dto/create-rewiew.dto'
import { Review, ReviewDocument } from './schema/review.schema'

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewSchema: Model<ReviewDocument>,
    private userService: UserService,
    private filmsService: FilmsService
  ) {}

  async createReview(dto: CreateRewiewDto) {
    try {
      const film = await this.filmsService.getFilmById(dto.filmId)
      if (!film) {
        throw new HttpException('Данный фильм не найден', HttpStatus.NOT_FOUND)
      }
      const user = await this.userService.getUserById(dto.userId)

      const review = await this.reviewSchema.create({
        text: dto.text,
        user_id: user._id,
        film_id: film._id,
      })
      return review
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
