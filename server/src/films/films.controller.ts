import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CreateFilmDto } from './dto/create-film.dto'
import { FilmsService } from './films.service'
import { AddRatingDto } from './dto/add-rating.dto'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  getFilms(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('rating') rating: string,
    @Query('mostLiked') mostLiked: string,
    @Query('mostViewed') mostViewed: string
  ) {
    return this.filmsService.getFilms(
      +page,
      +limit,
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

  @UseGuards(JwtAuthGuard)
  @Post('/rating')
  addRating(@Body() dto: AddRatingDto) {
    return this.filmsService.addRating(dto)
  }
}
