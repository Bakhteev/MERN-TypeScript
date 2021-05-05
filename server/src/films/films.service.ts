import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDto } from '../category/dto/create-category.dto'
import { CreateFilmDto } from './dto/create-film.dto'
import { Author, AuthorDocument } from './schema/author.schema'
import { Category, CategoryDocument } from '../category/schema/category.schema'
import { Film, FilmDocument } from './schema/film.schema'
import { CategoryService } from 'src/category/category.service'
import { CreateGenreDto } from 'src/genre/dto/create-genre.dto'
import { GenreService } from 'src/genre/genre.service'

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    private categoryService: CategoryService,
    private genreService: GenreService
  ) {}

  async getFilms() {
    const films = await this.filmModel.find().populate(['category', 'author'])
    return films
  }

  async createFilm(dto: CreateFilmDto): Promise<Film> {
    try {
      console.log(dto)

      let film = await this.filmModel.find({
        name: { $regex: new RegExp(dto.name, 'i') },
      })

      if (film.length > 0) {
        throw new HttpException('такой фильм уже есть', HttpStatus.BAD_REQUEST)
      }

      const author = await this.authorModel.findOne({
        name: { $regex: new RegExp(dto.authorParam.name, 'i') },
      })

      const cast = JSON.parse(dto.cast)

      console.log(cast)

      const newFilm = await this.filmModel.create({
        ...dto,
        rating: 0,
        viewers: 0,
        likes: 0,
        dislikes: 0,
      })

      if (author) {
        await this.authorModel.findByIdAndUpdate(author._id, {
          film_and_serials: newFilm._id,
        })
        newFilm.author = author._id
        newFilm.save()
        return newFilm
      }

      const newAuthor = await this.authorModel.create({
        name: dto.authorParam.name,
        picture: dto.authorParam.picture,
        film_and_serials: newFilm._id,
      })

      newFilm.author = newAuthor._id

      newFilm.save()
      return newFilm
    } catch (e) {
      console.log(e)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getCategories() {
    return this.categoryService.getCategories()
  }

  async createCategory(dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto)
  }

  async getGenres() {
    return this.genreService.getGenres()
  }

  async createGenre(dto: CreateGenreDto) {
    return this.genreService.createGenre(dto)
  }
}
