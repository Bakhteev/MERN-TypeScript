import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express'
import { CategoryService } from 'src/category/category.service'
import { CreateGenreDto } from 'src/genre/dto/create-genre.dto'
import { CreateCategoryDto } from '../category/dto/create-category.dto'
import { CreateFilmDto } from './dto/create-film.dto'
import { FilmsService } from './films.service'
import { Express } from 'express'
import { CreateActerDto } from 'src/acter/dto/create-acter.dto'

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

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
    console.log(dto)

    const { picture } = file
    return this.filmsService.createActer(dto, picture[0])
  }
}
