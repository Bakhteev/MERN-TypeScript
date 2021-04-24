import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FilmsModule } from './films/films.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bogdan:323694m@cluster0.qtc9s.mongodb.net/MERN-TS?retryWrites=true&w=majority'
    ),
    FilmsModule,
    UserModule,
  ],
})
export class AppModule {}
