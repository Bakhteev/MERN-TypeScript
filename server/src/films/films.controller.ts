import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CategoryService } from 'src/category/category.service'
import { CreateGenreDto } from 'src/genre/dto/create-genre.dto'
import { CreateCategoryDto } from '../category/dto/create-category.dto'
import { CreateFilmDto } from './dto/create-film.dto'
import { FilmsService } from './films.service'

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  getFilms() {
    return this.filmsService.getFilms()
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'poster', maxCount: 1 },
      { name: 'picture', maxCount: 1 },
    ])
  )
  createFilm(@UploadedFiles() files, @Body() dto: CreateFilmDto) {
    const { poster } = files

    // const { poster } = files
    console.log(dto)

    console.log(poster)
    return this.filmsService.createFilm(dto)
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
}
