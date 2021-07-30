import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UseGetUserIdDecorator } from 'src/decorators/getUser.decorator'
import { CreateRewiewDto } from './dto/create-rewiew.dto'
import { ReviewService } from './review.service'

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  addRewiew(
    @Body() dto: CreateRewiewDto,
    @UseGetUserIdDecorator() userId: string
  ) {
    return this.reviewService.addReview(dto, userId)
  }
}
