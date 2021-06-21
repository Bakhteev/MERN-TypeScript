import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
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
import { Response, Request } from 'express'

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
    if (rating) {
      return this.filmsService.getFilms(page, limit, rating)
    }
    if (mostLiked) {
      return this.filmsService.getFilms(page, limit, null, mostLiked)
    }
    if (mostViewed) {
      return this.filmsService.getFilms(page, limit, '', '', mostViewed)
    }
    if (rating && mostLiked) {
      return this.filmsService.getFilms(page, limit, rating, mostLiked)
    }
    if (rating && mostViewed) {
      return this.filmsService.getFilms(page, limit, rating, '', mostViewed)
    }
    return this.filmsService.getFilms(page, limit)
  }

  @Get()
  getFilmById(@Param('id') id: string) {
    return this.filmsService.getFilmById(id)
  }

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

  @Post('/category')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.filmsService.createCategory(dto)
  }

  @Post('/genre')
  createGenre(@Body() dto: CreateGenreDto) {
    return this.filmsService.createGenre(dto)
  }

  @Get('/genre')
  getGenres() {
    return this.filmsService.getGenres()
  }

  @Post('/acters')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  createActers(@UploadedFiles() file, @Body() dto: CreateActerDto) {
    const { picture } = file
    return this.filmsService.createActer(dto, picture[0])
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/like')
  addLike(@Query('filmId') filmId: string, @Req() req: any) {
    return this.filmsService.addLike(filmId, req.user.id)
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/dislike')
  addDislike(@Query('filmId') filmId: string) {
    return this.filmsService.addDislike(filmId)
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/view')
  addView(@Query('filmId') filmId: string, @Req() req: any) {
    return this.filmsService.addView(filmId, req.user.id)
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/rating')
  addRating(@Body() dto: AddRatingDto) {
    return this.filmsService.addRating(dto)
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/review')
  addRewiew(@Body() dto: CreateRewiewDto) {
    return this.reviewService.addReview(dto)
  }
}
