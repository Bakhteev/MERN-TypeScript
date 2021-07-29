import { Module } from '@nestjs/common'
import { FilmsModule } from 'src/films/films.module'
import { UserModule } from 'src/user/user.module'
import { ViewController } from './view.controller'
import { ViewService } from './view.service'

@Module({
  controllers: [ViewController],
  providers: [ViewService],
  imports: [FilmsModule, UserModule],
})
export class ViewModule {}
