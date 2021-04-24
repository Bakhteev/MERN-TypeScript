import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Film, FilmDocument } from './schema/film.schema'

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async getFilms() {
    const films = await this.filmModel.find()
    return films
  }

  async createFilm(){
    
  }
}
