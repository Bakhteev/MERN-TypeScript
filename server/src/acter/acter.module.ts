import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FilesService } from 'src/files/files.service'
import { ActerService } from './acter.service'
import { Acter, ActerSchema } from './schema/acter.schema'

@Module({
  providers: [ActerService, FilesService],
  imports: [
    MongooseModule.forFeature([{ name: Acter.name, schema: ActerSchema }]),
  ],
})
export class ActerModule {}
