import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GenreService } from './genre.service'
import { Genre, GenreSchema } from './schema/genre.schema'

@Module({
  providers: [GenreService],
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
})
export class GenreModule {}
