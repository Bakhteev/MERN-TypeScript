import { forwardRef, Module } from '@nestjs/common'
import { DislikesService } from './dislikes.service'
import { DislikesController } from './dislikes.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Dislike, DislikeSchema } from './schema/dislikes.shema'
import { FilmsModule } from 'src/films/films.module'
import { UserModule } from 'src/user/user.module'
import { LikesModule } from '../likes/likes.module'
import { IsFilmDislikedOrLikedModule } from 'src/is-film-disliked-or-liked/is-film-disliked-or-liked.module'

@Module({
  providers: [DislikesService],
  exports: [DislikesService],
  controllers: [DislikesController],
  imports: [
    MongooseModule.forFeature([{ name: Dislike.name, schema: DislikeSchema }]),
    FilmsModule,
    UserModule,
    IsFilmDislikedOrLikedModule,
  ],
})
export class DislikesModule {}
