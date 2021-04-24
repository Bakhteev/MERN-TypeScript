import { Controller, Get } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {

  constructor(private filmsService: FilmsService){}

  @Get()
  getFilms(){
    return this.filmsService.getFilms()
  }

}
