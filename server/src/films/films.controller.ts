import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CreateGenreDto } from 'src/genre/dto/create-genre.dto'
import { CreateCategoryDto } from '../category/dto/create-category.dto'
import { CreateFilmDto } from './dto/create-film.dto'
import { FilmsService } from './films.service'
import { CreateActerDto } from 'src/acter/dto/create-acter.dto'
import { CreateRewiewDto } from '../review/dto/create-rewiew.dto'
import { ReviewService } from 'src/review/review.service'
import { AddRatingDto } from './dto/add-rating.dto'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UseGetUserIdDecorator } from 'src/decorators/getUser.decorator'

@Controller('films')
export class FilmsController {
  constructor(
    private filmsService: FilmsService,
  ) {}

  @Get()
  getFilms(
    @Query('page') page,
    @Query('limit') limit,
    @Query('rating') rating,
    @Query('mostLiked') mostLiked,
    @Query('mostViewed') mostViewed
  ) {
    return this.filmsService.getFilms(
      page,
      limit,
      rating,
      mostLiked,
      mostViewed
    )
  }

  @Get()
  getFilmById(@Query('filmId') filmId: string) {
    console.log(filmId)

    const film = this.filmsService.getFilmById(filmId)
    if (!film) {
      throw new NotFoundException('Данный фильм не найден')
    }
    return film
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'poster', maxCount: 1 },
      { name: 'film', maxCount: 1 },
      { name: 'authorPicture', maxCount: 1 },
    ])
  )
  createFilm(@UploadedFiles() files, @Body() dto: CreateFilmDto) {
    const { poster, film, authorPicture } = files
    return this.filmsService.createFilm(
      dto,
      poster[0],
      film[0],
      authorPicture[0]
    )
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/like')
  // addLike(
  //   @Query('filmId') filmId: string,
  //   @UseGetUserIdDecorator() userId: string
  // ) {
  //   return this.filmsService.addLike(filmId, userId)
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('/dislike')
  // addDislike(@Query('filmId') filmId: string) {
  //   return this.filmsService.addDislike(filmId)
  // }

  @UseGuards(JwtAuthGuard)
  @Post('/view')
  addView(
    @Query('filmId') filmId: string,
    @UseGetUserIdDecorator() userId: string
  ) {
    return this.filmsService.addView(filmId, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/rating')
  addRating(@Body() dto: AddRatingDto) {
    return this.filmsService.addRating(dto)
  }
}
