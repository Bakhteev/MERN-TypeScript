import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateGenreDto } from './dto/create-genre.dto'
import { Genre, GenreDocument } from './schema/genre.schema'

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private genremodel: Model<GenreDocument>
  ) {}

  async createGenre(dto: CreateGenreDto) {
    const genre = await this.genremodel.findOne({
      name: { $regex: new RegExp(dto.name, 'i') },
    })

    if (genre) {
      throw new HttpException(
        'Такой жанр уже существует',
        HttpStatus.BAD_REQUEST
      )
    }

    const newGenre = await this.genremodel.create({
      ...dto,
    })

    return newGenre
  }

  async getGenres() {
    return await this.genremodel.find()
  }
}
