import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FilmsModule } from './films/films.module'
import { UserModule } from './user/user.module'
import { GenreModule } from './genre/genre.module'
import { CategoryModule } from './category/category.module'
import { FilesModule } from './files/files.module'
import { ActerModule } from './acter/acter.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module'
import { ReviewModule } from './review/review.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { LikesModule } from './likes/likes.module'
import { DislikesModule } from './dislikes/dislikes.module'
import { IsFilmDislikedOrLikedModule } from './is-film-disliked-or-liked/is-film-disliked-or-liked.module'
import { ViewModule } from './view/view.module'
import { RatingModule } from './rating/rating.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://bogdan:323694m@cluster0.qtc9s.mongodb.net/MERN-TS?retryWrites=true&w=majority'
    ),
    FilmsModule,
    UserModule,
    GenreModule,
    CategoryModule,
    FilesModule,
    ActerModule,
    AuthModule,
    RolesModule,
    ReviewModule,
    LikesModule,
    DislikesModule,
    IsFilmDislikedOrLikedModule,
    ViewModule,
    RatingModule,
  ],
})
export class AppModule {}
