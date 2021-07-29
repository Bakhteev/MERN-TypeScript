import { Module } from '@nestjs/common'
import { RatingService } from './rating.service'
import { RatingController } from './rating.controller'
import { FilmsModule } from 'src/films/films.module'
import { UserModule } from 'src/user/user.module'

@Module({
  providers: [RatingService],
  controllers: [RatingController],
  imports: [FilmsModule, UserModule],
})
export class RatingModule {}
