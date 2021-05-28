import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from 'src/user/user.module'
import { ReviewService } from './review.service'
import { Review, ReviewSchema } from './schema/review.schema'
import { FilmsModule } from 'src/films/films.module'

@Module({
  providers: [ReviewService],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    UserModule,
    forwardRef(() => FilmsModule),
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
