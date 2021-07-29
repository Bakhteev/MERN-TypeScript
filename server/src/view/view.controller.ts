import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UseGetUserIdDecorator } from 'src/decorators/getUser.decorator'
import { ViewService } from './view.service'

@Controller('view')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Post('/unAuthorized')
  addViewUnAuthorized(@Query('filmId') filmId: string) {
    return this.viewService.addView(filmId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/authorized')
  addViewAuthorized(
    @Query('filmId') filmId: string,
    @UseGetUserIdDecorator() userId: string
  ) {
    return this.viewService.addView(filmId, userId)
  }
}
