import { Module } from '@nestjs/common'
import { FilmsService } from './films.service'
import { FilmsController } from './films.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Film, FilmSchema } from './schema/film.schema'
import { Serial, SerialSchema } from './schema/serial/serial.schema'
import { Author, AuthorSchema } from './schema/author.schema'
import { Category, CategorySchema } from './schema/category.schema'
import { Season, SeasonSchema } from './schema/serial/season.schema'
import { Seria, SeriaSchema } from './schema/serial/seria.shema'
import { Genre, GenreSchema } from './schema/genre.schema'

@Module({
  providers: [FilmsService],
  controllers: [FilmsController],
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Seria.name, schema: SeriaSchema }]),
    MongooseModule.forFeature([{ name: Season.name, schema: SeasonSchema }]),
    MongooseModule.forFeature([{ name: Serial.name, schema: SerialSchema }]),
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
})
export class FilmsModule {}
