import { forwardRef, Module } from '@nestjs/common'
import { FilmsService } from './films.service'
import { FilmsController } from './films.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Film, FilmSchema } from './schema/film.schema'
import { Author, AuthorSchema } from './schema/author.schema'
import { Category, CategorySchema } from '../category/schema/category.schema'
import { Genre, GenreSchema } from '../genre/schema/genre.schema'
import { CategoryService } from 'src/category/category.service'
import { GenreService } from 'src/genre/genre.service'
import { FilesService } from 'src/files/files.service'
import { ActerService } from 'src/acter/acter.service'
import { Acter, ActerSchema } from 'src/acter/schema/acter.schema'
import { ReviewModule } from 'src/review/review.module'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'

@Module({
  providers: [
    FilmsService,
    CategoryService,
    GenreService,
    FilesService,
    ActerService,
  ],
  controllers: [FilmsController],
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Acter.name, schema: ActerSchema }]),
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    forwardRef(() => ReviewModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    UserModule
  ],
  exports: [FilmsService, JwtModule],
})
export class FilmsModule {}
