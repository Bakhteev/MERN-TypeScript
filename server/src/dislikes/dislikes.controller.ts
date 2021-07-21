import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UseGetUserIdDecorator } from 'src/decorators/getUser.decorator'
import { DislikesService } from './dislikes.service'

@Controller('dislikes')
export class DislikesController {
  constructor(private dislikesService: DislikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':filmId')
  addDislike(
    @Param('filmId') filmId: string,
    @UseGetUserIdDecorator() userId: string
  ) {
    return this.dislikesService.addDislike(filmId, userId)
  }
}
