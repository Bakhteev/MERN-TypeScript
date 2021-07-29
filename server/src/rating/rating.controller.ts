import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AddRatingDto } from 'src/rating/dto/add-rating.dto'
import { RatingService } from './rating.service'

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addRating(@Body() dto: AddRatingDto) {
    return this.ratingService.addRating(dto)
  }
}
