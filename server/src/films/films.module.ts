import { forwardRef, Module } from '@nestjs/common'
import { FilmsService } from './films.service'
import { FilmsController } from './films.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Film, FilmSchema } from './schema/film.schema'
import { Author, AuthorSchema } from './schema/author.schema'
import { FilesService } from 'src/files/files.service'
import { ReviewModule } from 'src/review/review.module'
import { UserModule } from 'src/user/user.module'
import { IsFilmDislikedOrLikedModule } from '../is-film-disliked-or-liked/is-film-disliked-or-liked.module'

@Module({
  providers: [FilmsService, FilesService],
  controllers: [FilmsController],
  imports: [
    MongooseModule.forFeature([
      { name: Film.name, schema: FilmSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
    forwardRef(() => ReviewModule),
    UserModule,
    ReviewModule,
    IsFilmDislikedOrLikedModule,
  ],
  exports: [FilmsService],
})
export class FilmsModule {}
