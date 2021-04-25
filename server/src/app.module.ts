import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FilmsModule } from './films/films.module';
import { UserModule } from './user/user.module';
import { SerialModule } from './serial/serial.module';
import { GenreModule } from './genre/genre.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bogdan:323694m@cluster0.qtc9s.mongodb.net/MERN-TS?retryWrites=true&w=majority'
    ),
    FilmsModule,
    UserModule,
    SerialModule,
    GenreModule,
    CategoryModule,
    AuthorModule,
    FilesModule,
  ],
})
export class AppModule {}
