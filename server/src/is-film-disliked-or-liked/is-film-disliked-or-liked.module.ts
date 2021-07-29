import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Dislike,  DislikeSchema } from 'src/dislikes/schema/dislikes.shema'
import { Like, LikeSchema } from 'src/likes/schema/likes.shema'
import { IsFilmDislikedOrLikedService } from './is-film-disliked-or-liked.service'

@Module({
  providers: [IsFilmDislikedOrLikedService],
  exports: [IsFilmDislikedOrLikedService],
  imports: [
    MongooseModule.forFeature([
      { name: Dislike.name, schema: DislikeSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
  ],
})
export class IsFilmDislikedOrLikedModule {}
