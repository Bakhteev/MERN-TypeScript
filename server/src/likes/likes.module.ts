import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FilmsModule } from 'src/films/films.module'
import { LikesService } from './likes.service'
import { Like, LikeSchema } from './schema/likes.shema'

@Module({
  providers: [LikesService],
  exports: [LikesService],
  imports: [

    MongooseModule.forFeature([
     { name: Like.name, schema: LikeSchema}
    ]),
    forwardRef(() => FilmsModule)
  ]
})
export class LikesModule {}
