import { Injectable, NotFoundException } from '@nestjs/common'
import { FilmsService } from 'src/films/films.service'
import { AddRatingDto } from './dto/add-rating.dto'

@Injectable()
export class RatingService {
  constructor(private filmsService: FilmsService) {}

  async addRating({ film_id, rating }: AddRatingDto) {
    const film = await this.filmsService.getFilmById(film_id)

    if (!film) {
      throw new NotFoundException('Фильм не найден')
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
}
