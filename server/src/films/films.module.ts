import { Module } from '@nestjs/common'
import { FilmsService } from './films.service'
import { FilmsController } from './films.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Film, FilmSchema } from './schema/film.schema'
import { Author, AuthorSchema } from './schema/author.schema'
import { Category, CategorySchema } from '../category/schema/category.schema'
import { Season, SeasonSchema } from '../serial/schema/season.schema'
import { Genre, GenreSchema } from '../genre/schema/genre.schema'
import { CategoryService } from 'src/category/category.service'
import { GenreService } from 'src/genre/genre.service'

@Module({
  providers: [FilmsService, CategoryService, GenreService],
  controllers: [FilmsController],
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    // MongooseModule.forFeature([{ name: Seria.name, schema: SeriaSchema }]),
    // MongooseModule.forFeature([{ name: Season.name, schema: SeasonSchema }]),
    // MongooseModule.forFeature([{ name: Serial.name, schema: SerialSchema }]),
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
})
export class FilmsModule {}
