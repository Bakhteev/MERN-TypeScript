import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FilesService } from 'src/files/files.service'
import { ActerService } from './acter.service'
import { Acter, ActerSchema } from './schema/acter.schema'
import { ActerController } from './acter.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
  providers: [ActerService, FilesService],
  imports: [
    MongooseModule.forFeature([{ name: Acter.name, schema: ActerSchema }]),
  ],
  controllers: [ActerController],
})
export class ActerModule {}
