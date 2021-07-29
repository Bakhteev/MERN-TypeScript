import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FilmsModule } from '../films/films.module'
import { LikesService } from './likes.service'
import { Like, LikeSchema } from './schema/likes.shema'
import { LikesController } from './likes.controller'
import { UserModule } from 'src/user/user.module'
import { DislikesModule } from '../dislikes/dislikes.module'
import { IsFilmDislikedOrLikedModule } from '../is-film-disliked-or-liked/is-film-disliked-or-liked.module'

@Module({
  providers: [LikesService],
  exports: [LikesService],
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    FilmsModule,
    UserModule,
    IsFilmDislikedOrLikedModule,
  ],
  controllers: [LikesController],
})
export class LikesModule {}
