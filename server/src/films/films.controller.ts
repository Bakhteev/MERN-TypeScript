import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
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
  createFilm(@Body() dto: CreateFilmDto) {
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
}
