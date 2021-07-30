import {
  Body,
  Controller,
  Get,
  NotFoundException,
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
import { CreateFilmDto } from './dto/create-film.dto'
import { FilmsService } from './films.service'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { Roles } from 'src/auth/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ApiQuery, ApiTags } from '@nestjs/swagger'

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, description: 'default 0' })
  @ApiQuery({ name: 'limit', required: false, description: 'default 10' })
  @ApiQuery({ name: 'rating', required: false })
  @ApiQuery({ name: 'mostLiked', required: false })
  @ApiQuery({ name: 'mostViewed', required: false })
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

  @Get(':filmId')
  async getFilmById(@Param('filmId') filmId: string, @Req() req: any) {
    const film = await this.filmsService.getFilmById(
      filmId,
      true,
      JSON.parse(req.cookies.userId)
    )
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
}
