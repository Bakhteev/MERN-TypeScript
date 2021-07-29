import { Injectable, NotFoundException } from '@nestjs/common'
import { FilmsService } from 'src/films/films.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class ViewService {
  constructor(
    private filmsService: FilmsService,
    private userService: UserService
  ) {}

  async addView(filmId: string, userId?: string) {
    const film = await this.filmsService.getFilmById(filmId)

    if (!film) {
      throw new NotFoundException('')
    }

    film.viewers += 1
    film.save()
    if (userId) {
      await this.userService.addFilmToHistory(userId, filmId)
      return film
    }
    return film
  }
}
