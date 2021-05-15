import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDto } from '../category/dto/create-category.dto'
import { CreateFilmDto } from './dto/create-film.dto'
import { Author, AuthorDocument } from './schema/author.schema'
import { Film, FilmDocument } from './schema/film.schema'
import { CategoryService } from 'src/category/category.service'
import { CreateGenreDto } from 'src/genre/dto/create-genre.dto'
import { GenreService } from 'src/genre/genre.service'
import { FilesService, FileType } from 'src/files/files.service'
import { CreateActerDto } from 'src/acter/dto/create-acter.dto'
import { ActerService } from 'src/acter/acter.service'
import { CreateRewiewDto } from '../review/dto/create-rewiew.dto'
import { ReviewService } from 'src/review/review.service'

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    private categoryService: CategoryService,
    private genreService: GenreService,
    private filesService: FilesService,
    private acterService: ActerService,
    private reviewService: ReviewService,
  ) {}

  async getFilms(
    page = 0,
    limit = 10,
    rating?: string,
    mostLiked?: string,
    mostViewed?: string
  ) {
    if (rating) {
      const films = await this.filmModel
        .find()
        .skip(+page * +limit)
        .limit(+limit)
        .populate(['category', 'author', 'acters', 'genre'])
      const filteredFilms = films.filter((film) => film.rating >= +rating)
      return filteredFilms
    }
    if (mostLiked) {
      const films = await this.filmModel
        .find()
        .skip(+page * +limit)
        .limit(+limit)
        .populate(['category', 'author', 'acters', 'genre'])
      const filteredFilms = films.sort((a, b) => b.likes - a.likes)

      return filteredFilms
    }
    if (rating && mostLiked) {
      const films = await this.filmModel
        .find()
        .skip(+page * +limit)
        .limit(+limit)
        .populate(['category', 'author', 'acters', 'genre'])
      const filteredFilms = films
        .filter((film) => film.rating >= +rating)
        .sort((a, b) => b.likes - a.likes)
      return filteredFilms
    }
    if (mostViewed) {
      const films = await this.filmModel
        .find()
        .skip(+page * +limit)
        .limit(+limit)
        .populate(['category', 'author', 'acters', 'genre'])
      const filteredFilms = films.sort((a, b) => b.viewers - a.viewers)
      return filteredFilms
    }
    if (rating && mostViewed) {
      const films = await this.filmModel
        .find()
        .skip(+page * +limit)
        .limit(+limit)
        .populate(['category', 'author', 'acters', 'genre'])
      const filteredFilms = films
        .filter((film) => film.rating >= +rating)
        .sort((a, b) => b.viewers - a.viewers)
      return filteredFilms
    }
    const films = await this.filmModel
      .find()
      .skip(+page * +limit)
      .limit(+limit)
      .populate(['category', 'author', 'acters', 'genre'])
    return films
  }

  async getFilmById(id: string) {
    const film = await this.filmModel
      .findById(id)
      .populate(['category', 'author', 'acters', 'genre', 'review'])
    if (!film) {
      throw new HttpException('Данный фильм не найден', HttpStatus.NOT_FOUND)
    }
    return film
  }

  async createFilm(
    dto: CreateFilmDto,
    poster: Express.Multer.File,
    filmFile: Express.Multer.File,
    authorPicture: Express.Multer.File
  ): Promise<Film> {
    try {
      const posterPath = this.filesService.createFile(FileType.POSTER, poster)
      const filmPath = this.filesService.createFile(FileType.VIDEO, filmFile)
      const authorPicturePath = this.filesService.createFile(
        FileType.POSTER,
        authorPicture
      )

      let film = await this.filmModel.find({
        name: { $regex: new RegExp(dto.name, 'i') },
      })

      if (film.length > 0) {
        throw new HttpException('такой фильм уже есть', HttpStatus.BAD_REQUEST)
      }

      const author = await this.authorModel.findOne({
        name: { $regex: new RegExp(dto.authorName, 'i') },
      })

      const tags = JSON.parse(dto.tags).map((tag) => tag.name)

      const newFilm = await this.filmModel.create({
        name: dto.name,
        language: dto.language,
        description: dto.description,
        publish_date: dto.publish_date,
        acters: JSON.parse(dto.cast),
        price: JSON.parse(dto.price),
        tags,
        category: JSON.parse(dto.category),
        genre: JSON.parse(dto.genre),
        time: dto.time,
        rating: 0,
        viewers: 0,
        likes: 0,
        dislikes: 0,
        poster: posterPath,
        film: filmPath,
      })

      if (author) {
        author.film_and_serials.push(newFilm._id)
        newFilm.author = author._id
        newFilm.save()
        author.save()
        return newFilm
      }

      const newAuthor = await this.authorModel.create({
        name: dto.authorName,
        picture: authorPicturePath,
        film_and_serials: [newFilm._id],
      })

      newFilm.author = newAuthor._id

      newFilm.save()
      return newFilm
    } catch (e) {
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

  async createActer(dto: CreateActerDto, file: Express.Multer.File) {
    return this.acterService.createActer(dto, file)
  }

  async addRewiew(dto: CreateRewiewDto) {
    return this.reviewService.createReview(dto)
  }
}
