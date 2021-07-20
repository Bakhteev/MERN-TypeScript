import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
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
import { AddRatingDto } from './dto/add-rating.dto'
import { UserService } from 'src/user/user.service'
import { LikesService } from 'src/likes/likes.service'
import { UserDocument } from 'src/user/schema/user.schema'

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    private categoryService: CategoryService,
    private genreService: GenreService,
    private filesService: FilesService,
    private acterService: ActerService,
    private userService: UserService,
    private reviewService: ReviewService,
    private likesService: LikesService
  ) {}

  async getFilms(
    page = 0,
    limit = 10,
    rating?: string,
    mostLiked?: string,
    mostViewed?: string
  ) {
    const films = await this.filmModel
      .find()
      .skip(+page * +limit)
      .limit(+limit)
      .populate(['category', 'genre'])

    if (rating) {
      return films.filter((film) => film.rating >= +rating)
    }
    if (mostLiked) {
      return films.sort((a, b) => b.likes - a.likes)
    }
    if (rating && mostLiked) {
      return films
        .filter((film) => film.rating >= +rating)
        .sort((a, b) => b.likes - a.likes)
    }
    if (mostViewed) {
      return films.sort((a, b) => b.viewers - a.viewers)
    }
    if (rating && mostViewed) {
      return films
        .filter((film) => film.rating >= +rating)
        .sort((a, b) => b.viewers - a.viewers)
    }
    return films
  }

  async getFilmById(id: string) {
    return await this.filmModel
      .findById(id)
      .populate(['category', 'author', 'acters', 'genre', 'reviews'])
  }

  async checkIfFilmLiked(filmId: string, userId: string) {
    const user = await this.userService.getUserById(userId)
    console.log(user)

    const liked = user.liked.filter((id: any) => filmId !== id)

    console.log(liked)

    if (liked.length > 0) {
      return true
    }
    return false
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
        throw new BadRequestException('такой фильм уже есть')
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

      const likeId = await this.likesService.createLikeTable(newFilm._id)
      newFilm.likesShema = likeId

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

  async addLike(filmId: string, userId: string) {
    const film = await this.filmModel.findById(filmId)
    if (!film) {
      throw new HttpException('Фильм не найден', HttpStatus.BAD_REQUEST)
    }

    const liked = await this.likesService.addLike(filmId, userId)

    if (!liked) {
      await this.likesService.removeLike(filmId, userId)

      film.likes -= 1
      film.save()
      await this.userService.removeFromLikedMovies(userId, film._id)
      return film
    }

    film.likes += 1
    film.save()
    await this.userService.addToLikedMovies(userId, film)
    return film
  }

  async addDislike(filmId: string) {
    const film = await this.filmModel.findById(filmId)
    if (!film) {
      throw new HttpException('Фильм не найден', HttpStatus.BAD_REQUEST)
    }

    film.dislikes += 1
    film.save()
    return film
  }

  async addView(filmId: string, userId: string) {
    const film = await this.filmModel.findById(filmId)
    if (!film) {
      throw new HttpException('Фильм не найден', HttpStatus.BAD_REQUEST)
    }

    film.viewers += 1
    film.save()
    await this.userService.addFilmToHistory(userId, film._id)
    return film
  }

  async addRating(dto: AddRatingDto) {
    const { film_id, rating } = dto
    const film = await this.filmModel.findById(film_id)
    if (!film) {
      throw new HttpException('Фильм не найден', HttpStatus.BAD_REQUEST)
    }

    if (film.numberOfVoters === 0 && film.rating === 0) {
      film.numberOfVoters += 1
      film.rating = Number(rating)

      film.save()
      return film
    }

    film.numberOfVoters += 1
    film.rating =
      (film.rating * (film.numberOfVoters - 1) + Number(rating)) /
      film.numberOfVoters

    film.rating = Number(film.rating.toFixed(1))
    film.save()
    return film
  }

  async addRewiew(dto: CreateRewiewDto, userId: string) {
    return this.reviewService.addReview(dto, userId)
  }
}
