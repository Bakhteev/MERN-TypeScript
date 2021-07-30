import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UseGetUserIdDecorator } from 'src/decorators/getUser.decorator'
import { LikesService } from './likes.service'

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':filmId')
  addLike(
    @Param('filmId') filmId: string,
    @UseGetUserIdDecorator() userId: string
  ) {
    return this.likesService.addLike(filmId, userId)
  }
}
