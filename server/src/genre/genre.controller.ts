import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { CreateGenreDto } from './dto/create-genre.dto'
import { GenreService } from './genre.service'

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  getGenres() {
    return this.genreService.getGenres()
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/create')
  createGenre(@Body() dto: CreateGenreDto) {
    return this.genreService.createGenre(dto)
  }
}
