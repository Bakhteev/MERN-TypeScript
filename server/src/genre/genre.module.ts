import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GenreService } from './genre.service'
import { Genre, GenreSchema } from './schema/genre.schema'
import { GenreController } from './genre.controller';

@Module({
  providers: [GenreService],
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  controllers: [GenreController],
})
export class GenreModule {}
