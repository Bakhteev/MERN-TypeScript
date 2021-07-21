import { Module } from '@nestjs/common'
import { DislikesService } from './dislikes.service'
import { DislikesController } from './dislikes.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Dislike, DislikeSchema } from './schema/dislikes.shema'
import { FilmsModule } from 'src/films/films.module'
import { UserModule } from 'src/user/user.module'

@Module({
  providers: [DislikesService],
  exports: [DislikesService],
  controllers: [DislikesController],
  imports: [
    MongooseModule.forFeature([{ name: Dislike.name, schema: DislikeSchema }]),
    FilmsModule,
    UserModule,
  ],
})
export class DislikesModule {}
