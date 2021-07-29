import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateFilmDto } from './dto/create-film.dto'
import { Author, AuthorDocument } from './schema/author.schema'
import { Film, FilmDocument } from './schema/film.schema'
import { FilesService, FileType } from 'src/files/files.service'
import { UserService } from 'src/user/user.service'
import { IsFilmDislikedOrLikedService } from '../is-film-disliked-or-liked/is-film-disliked-or-liked.service'

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    private filesService: FilesService,
    private userService: UserService,
    private isFilmDislikedOrLikedService: IsFilmDislikedOrLikedService
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

  async getFilmById(id: string, likedOrDisliked?: boolean, userId?: string) {
    const film = await this.filmModel
      .findById(id)
      .populate(['category', 'author', 'acters', 'genre', 'reviews'])

    if (likedOrDisliked) {
      const isLiked = await this.isFilmDislikedOrLikedService.checkLike(
        film.likesShema,
        userId
      )
      const isDisliked = await this.isFilmDislikedOrLikedService.checkDislike(
        film.dislikesShema,
        userId
      )

      film.liked = isLiked
      film.disliked = isDisliked

      return film
    }

    return film
  }

  // async getFilm(id: string, userId: string) {
  //   const film = await this.getFilmById(id)

  //   const isLiked = await this.isFilmDislikedOrLikedService.checkLike(
  //     film.likesShema,
  //     userId
  //   )
  //   const isDisliked = await this.isFilmDislikedOrLikedService.checkDislike(
  //     film.dislikesShema,
  //     userId
  //   )

  //   // const films = await this.filmModel
  //   //   .aggregate()
  //   //   .addFields({
  //   //     liked: isLiked,
  //   //     disliked: isDisliked,
  //   //   })
  //   //   .lookup({
  //   //     from: 'categories',
  //   //     localField: 'category',
  //   //     foreignField: '_id',
  //   //     as: 'category',
  //   //   })
  //   //   .lookup({
  //   //     from: 'reviews',
  //   //     localField: 'reviews',
  //   //     foreignField: '_id',
  //   //     as: 'reviews',
  //   //   })
  //   //   .lookup({
  //   //     from: 'acters',
  //   //     localField: 'acters',
  //   //     foreignField: '_id',
  //   //     as: 'acters',
  //   //   })

  //   // return films[0]
  // }

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
}
