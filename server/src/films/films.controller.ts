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
import { RolesGuard } from 'src/auth/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UseGetUserIdDecorator } from 'src/decorators/getUser.decorator'
import { NOTFOUND } from 'node:dns'

@Controller('films')
export class FilmsController {
  constructor(
    private filmsService: FilmsService,
    private reviewService: ReviewService
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
  getFilmById(@Query('id') id: string) {
    const film = this.filmsService.getFilmById(id)
    if (!film) {
      throw new NotFoundException('Данный фильм не найден')
    }
    return film
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
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

  @Get('/category')
  getCategories() {
    return this.filmsService.getCategories()
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/category')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.filmsService.createCategory(dto)
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/genre')
  createGenre(@Body() dto: CreateGenreDto) {
    return this.filmsService.createGenre(dto)
  }

  @Get('/genre')
  getGenres() {
    return this.filmsService.getGenres()
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/acters')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  createActers(@UploadedFiles() file, @Body() dto: CreateActerDto) {
    const { picture } = file
    return this.filmsService.createActer(dto, picture[0])
  }

  @UseGuards(JwtAuthGuard)
  @Post('/like')
  addLike(
    @Query('filmId') filmId: string,
    @UseGetUserIdDecorator() userId: string
  ) {
    return this.filmsService.addLike(filmId, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/dislike')
  addDislike(@Query('filmId') filmId: string) {
    return this.filmsService.addDislike(filmId)
  }

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

  @UseGuards(JwtAuthGuard)
  @Post('/review')
  addRewiew(
    @Body() dto: CreateRewiewDto,
    @UseGetUserIdDecorator() userId: string
  ) {
    return this.reviewService.addReview(dto, userId)
  }
}
