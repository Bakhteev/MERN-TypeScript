import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDto } from './dto/create-category.dto'
import { CreateFilmDto } from './dto/create-film.dto'
import { Author, AuthorDocument } from './schema/author.schema'
import { Category, CategoryDocument } from './schema/category.schema'
import { Film, FilmDocument } from './schema/film.schema'

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
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

      const newFilm = await this.filmModel.create({
        ...dto,
        time: 0,
        rating: 0,
        viewers: 0,
        likes: 0,
        dislikes: 0,
      })

      console.log(author)

      if (author) {
        await this.authorModel.findByIdAndUpdate(author._id, {
          film_and_serials: newFilm._id,
        })
        newFilm.author = author._id
      }

      const newAuthor = await this.authorModel.create({
        name: dto.authorParam.name,
        picture: dto.authorParam.picture,
        film_and_serials: [newFilm._id],
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
    const categories = await this.categoryModel.find()
    return categories
  }

  async createCategory(dto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.findOne({
        name: { $regex: new RegExp(dto.name) },
      })
      if (category) {
        throw new HttpException(
          'Такая категория уже существует',
          HttpStatus.BAD_REQUEST
        )
      }
      const newCategory = await this.categoryModel.create({ ...dto })
      return newCategory
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
